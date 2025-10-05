import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JobStatus } from './schemas/job.schema';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createJobDto: CreateJobDto, @Request() req) {
    // Check if user is recruiter
    if (req.user.role !== 'recruiter') {
      throw new BadRequestException('Only recruiters can create job postings');
    }
    
    return this.jobsService.create(createJobDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active job postings with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiQuery({ name: 'remoteType', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'experienceLevel', required: false, type: String })
  @ApiQuery({ name: 'skills', required: false, type: String })
  @ApiQuery({ name: 'salaryMin', required: false, type: Number })
  @ApiQuery({ name: 'salaryMax', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Jobs retrieved successfully' })
  async findAll(@Query() query: any) {
    const {
      page = 1,
      limit = 20,
      location,
      remoteType,
      type,
      experienceLevel,
      skills,
      salaryMin,
      salaryMax,
      search,
    } = query;

    const filters = {
      location,
      remoteType,
      type,
      experienceLevel,
      skills: skills ? skills.split(',') : undefined,
      salaryMin: salaryMin ? parseInt(salaryMin) : undefined,
      salaryMax: salaryMax ? parseInt(salaryMax) : undefined,
      search,
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    return this.jobsService.findAll(filters, parseInt(page), parseInt(limit));
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured job postings' })
  @ApiResponse({ status: 200, description: 'Featured jobs retrieved successfully' })
  async getFeatured() {
    return this.jobsService.getFeaturedJobs();
  }

  @Get('my-jobs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get jobs posted by current recruiter' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Recruiter jobs retrieved successfully' })
  async getMyJobs(@Request() req, @Query() query: any) {
    if (req.user.role !== 'recruiter') {
      throw new BadRequestException('Only recruiters can access this endpoint');
    }

    const { page = 1, limit = 20 } = query;
    return this.jobsService.findByRecruiter(req.user.id, parseInt(page), parseInt(limit));
  }

  @Get('analytics')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get job analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  async getAnalytics(@Request() req) {
    const recruiterId = req.user.role === 'recruiter' ? req.user.id : undefined;
    return this.jobsService.getAnalytics(recruiterId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiResponse({ status: 200, description: 'Job retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update job posting' })
  @ApiResponse({ status: 200, description: 'Job updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your job' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: Partial<CreateJobDto>,
    @Request() req,
  ) {
    if (req.user.role !== 'recruiter') {
      throw new BadRequestException('Only recruiters can update job postings');
    }

    return this.jobsService.update(id, updateJobDto, req.user.id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update job status' })
  @ApiResponse({ status: 200, description: 'Job status updated successfully' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: JobStatus },
    @Request() req,
  ) {
    if (req.user.role !== 'recruiter') {
      throw new BadRequestException('Only recruiters can update job status');
    }

    return this.jobsService.updateStatus(id, body.status, req.user.id);
  }

  @Patch(':id/boost')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Boost job visibility (Premium feature)' })
  @ApiResponse({ status: 200, description: 'Job boosted successfully' })
  async boostJob(
    @Param('id') id: string,
    @Body() body: { boostLevel: number },
    @Request() req,
  ) {
    if (req.user.role !== 'recruiter') {
      throw new BadRequestException('Only recruiters can boost jobs');
    }

    if (body.boostLevel < 0 || body.boostLevel > 3) {
      throw new BadRequestException('Boost level must be between 0 and 3');
    }

    return this.jobsService.boostJob(id, body.boostLevel, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete job posting' })
  @ApiResponse({ status: 200, description: 'Job deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your job' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'recruiter') {
      throw new BadRequestException('Only recruiters can delete job postings');
    }

    await this.jobsService.remove(id, req.user.id);
    return { message: 'Job deleted successfully' };
  }
}