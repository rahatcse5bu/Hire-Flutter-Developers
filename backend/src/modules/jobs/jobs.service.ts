import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Job, JobDocument, JobStatus } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto, recruiterId: string): Promise<Job> {
    const job = new this.jobModel({
      ...createJobDto,
      recruiterId: new Types.ObjectId(recruiterId),
    });
    return job.save();
  }

  async findAll(filters: any = {}, page = 1, limit = 20): Promise<{ jobs: Job[], total: number, totalPages: number }> {
    const skip = (page - 1) * limit;
    
    // Build query
    const query: any = { status: JobStatus.ACTIVE };
    
    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }
    
    if (filters.remoteType) {
      query.remoteType = filters.remoteType;
    }
    
    if (filters.type) {
      query.type = filters.type;
    }
    
    if (filters.experienceLevel) {
      query.experienceLevel = filters.experienceLevel;
    }
    
    if (filters.skills && filters.skills.length > 0) {
      query.requiredSkills = { $in: filters.skills };
    }
    
    if (filters.salaryMin) {
      query.salaryMin = { $gte: filters.salaryMin };
    }
    
    if (filters.salaryMax) {
      query.salaryMax = { $lte: filters.salaryMax };
    }

    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { company: { $regex: filters.search, $options: 'i' } },
      ];
    }

    // Sort: Featured first, then promoted, then by creation date
    const sort: any = {
      isFeatured: -1,
      boostLevel: -1,
      createdAt: -1,
    };

    const [jobs, total] = await Promise.all([
      this.jobModel
        .find(query)
        .populate('recruiterId', 'firstName lastName email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.jobModel.countDocuments(query),
    ]);

    return {
      jobs,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Job> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Job not found');
    }

    const job = await this.jobModel
      .findById(id)
      .populate('recruiterId', 'firstName lastName email company')
      .exec();
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Increment view count
    await this.jobModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

    return job;
  }

  async findByRecruiter(recruiterId: string, page = 1, limit = 20): Promise<{ jobs: Job[], total: number }> {
    const skip = (page - 1) * limit;
    
    const [jobs, total] = await Promise.all([
      this.jobModel
        .find({ recruiterId: new Types.ObjectId(recruiterId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.jobModel.countDocuments({ recruiterId: new Types.ObjectId(recruiterId) }),
    ]);

    return { jobs, total };
  }

  async update(id: string, updateJobDto: Partial<CreateJobDto>, recruiterId: string): Promise<Job> {
    const job = await this.jobModel.findById(id);
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.recruiterId.toString() !== recruiterId) {
      throw new ForbiddenException('You can only update your own job posts');
    }

    const updatedJob = await this.jobModel
      .findByIdAndUpdate(id, updateJobDto, { new: true })
      .populate('recruiterId', 'firstName lastName email')
      .exec();

    return updatedJob;
  }

  async updateStatus(id: string, status: JobStatus, recruiterId: string): Promise<Job> {
    const job = await this.jobModel.findById(id);
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.recruiterId.toString() !== recruiterId) {
      throw new ForbiddenException('You can only update your own job posts');
    }

    return this.jobModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('recruiterId', 'firstName lastName email')
      .exec();
  }

  async remove(id: string, recruiterId: string): Promise<void> {
    const job = await this.jobModel.findById(id);
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.recruiterId.toString() !== recruiterId) {
      throw new ForbiddenException('You can only delete your own job posts');
    }

    await this.jobModel.findByIdAndDelete(id);
  }

  async boostJob(id: string, boostLevel: number, recruiterId: string): Promise<Job> {
    const job = await this.jobModel.findById(id);
    
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.recruiterId.toString() !== recruiterId) {
      throw new ForbiddenException('You can only boost your own job posts');
    }

    const promotedUntil = new Date();
    promotedUntil.setDate(promotedUntil.getDate() + (boostLevel * 7)); // 1 week per boost level

    return this.jobModel
      .findByIdAndUpdate(
        id,
        { 
          boostLevel,
          promotedUntil,
          isPremium: boostLevel > 0 
        },
        { new: true }
      )
      .exec();
  }

  async getAnalytics(recruiterId?: string) {
    const match = recruiterId ? { recruiterId: new Types.ObjectId(recruiterId) } : {};
    
    const [
      totalJobs,
      activeJobs,
      totalApplications,
      jobsByType,
      jobsByExperience,
      recentJobs,
    ] = await Promise.all([
      this.jobModel.countDocuments(match),
      this.jobModel.countDocuments({ ...match, status: JobStatus.ACTIVE }),
      this.jobModel.aggregate([
        { $match: match },
        { $group: { _id: null, total: { $sum: '$applicationCount' } } }
      ]),
      this.jobModel.aggregate([
        { $match: match },
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]),
      this.jobModel.aggregate([
        { $match: match },
        { $group: { _id: '$experienceLevel', count: { $sum: 1 } } }
      ]),
      this.jobModel
        .find(match)
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title company createdAt applicationCount viewCount')
    ]);

    return {
      totalJobs,
      activeJobs,
      totalApplications: totalApplications[0]?.total || 0,
      jobsByType,
      jobsByExperience,
      recentJobs,
    };
  }

  async getFeaturedJobs(): Promise<Job[]> {
    return this.jobModel
      .find({ 
        status: JobStatus.ACTIVE,
        $or: [
          { isFeatured: true },
          { boostLevel: { $gt: 0 } }
        ]
      })
      .populate('recruiterId', 'firstName lastName company')
      .sort({ isFeatured: -1, boostLevel: -1, createdAt: -1 })
      .limit(10)
      .exec();
  }

  async incrementApplicationCount(id: string): Promise<Job> {
    return this.jobModel
      .findByIdAndUpdate(
        id,
        { $inc: { applicationCount: 1 } },
        { new: true }
      )
      .exec();
  }
}