"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_schema_1 = require("./schemas/job.schema");
let JobsService = class JobsService {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }
    async create(createJobDto, recruiterId) {
        const job = new this.jobModel({
            ...createJobDto,
            recruiterId: new mongoose_2.Types.ObjectId(recruiterId),
        });
        return job.save();
    }
    async findAll(filters = {}, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const query = { status: job_schema_1.JobStatus.ACTIVE };
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
        const sort = {
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
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Job not found');
        }
        const job = await this.jobModel
            .findById(id)
            .populate('recruiterId', 'firstName lastName email company')
            .exec();
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        await this.jobModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
        return job;
    }
    async findByRecruiter(recruiterId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [jobs, total] = await Promise.all([
            this.jobModel
                .find({ recruiterId: new mongoose_2.Types.ObjectId(recruiterId) })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.jobModel.countDocuments({ recruiterId: new mongoose_2.Types.ObjectId(recruiterId) }),
        ]);
        return { jobs, total };
    }
    async update(id, updateJobDto, recruiterId) {
        const job = await this.jobModel.findById(id);
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.recruiterId.toString() !== recruiterId) {
            throw new common_1.ForbiddenException('You can only update your own job posts');
        }
        const updatedJob = await this.jobModel
            .findByIdAndUpdate(id, updateJobDto, { new: true })
            .populate('recruiterId', 'firstName lastName email')
            .exec();
        return updatedJob;
    }
    async updateStatus(id, status, recruiterId) {
        const job = await this.jobModel.findById(id);
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.recruiterId.toString() !== recruiterId) {
            throw new common_1.ForbiddenException('You can only update your own job posts');
        }
        return this.jobModel
            .findByIdAndUpdate(id, { status }, { new: true })
            .populate('recruiterId', 'firstName lastName email')
            .exec();
    }
    async remove(id, recruiterId) {
        const job = await this.jobModel.findById(id);
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.recruiterId.toString() !== recruiterId) {
            throw new common_1.ForbiddenException('You can only delete your own job posts');
        }
        await this.jobModel.findByIdAndDelete(id);
    }
    async boostJob(id, boostLevel, recruiterId) {
        const job = await this.jobModel.findById(id);
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.recruiterId.toString() !== recruiterId) {
            throw new common_1.ForbiddenException('You can only boost your own job posts');
        }
        const promotedUntil = new Date();
        promotedUntil.setDate(promotedUntil.getDate() + (boostLevel * 7));
        return this.jobModel
            .findByIdAndUpdate(id, {
            boostLevel,
            promotedUntil,
            isPremium: boostLevel > 0
        }, { new: true })
            .exec();
    }
    async getAnalytics(recruiterId) {
        const match = recruiterId ? { recruiterId: new mongoose_2.Types.ObjectId(recruiterId) } : {};
        const [totalJobs, activeJobs, totalApplications, jobsByType, jobsByExperience, recentJobs,] = await Promise.all([
            this.jobModel.countDocuments(match),
            this.jobModel.countDocuments({ ...match, status: job_schema_1.JobStatus.ACTIVE }),
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
    async getFeaturedJobs() {
        return this.jobModel
            .find({
            status: job_schema_1.JobStatus.ACTIVE,
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
    async incrementApplicationCount(id) {
        return this.jobModel
            .findByIdAndUpdate(id, { $inc: { applicationCount: 1 } }, { new: true })
            .exec();
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JobsService);
//# sourceMappingURL=jobs.service.js.map