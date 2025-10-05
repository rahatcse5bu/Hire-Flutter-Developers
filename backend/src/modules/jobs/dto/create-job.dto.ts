import { IsNotEmpty, IsString, IsArray, IsEnum, IsNumber, IsDate, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { JobType, ExperienceLevel, RemoteType } from '../schemas/job.schema';

export class CreateJobDto {
  @ApiProperty({ example: 'Senior Flutter Developer' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'We are looking for an experienced Flutter developer...' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'TechCorp Inc.' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ example: 'San Francisco, CA' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ enum: RemoteType, example: RemoteType.REMOTE })
  @IsEnum(RemoteType)
  remoteType: RemoteType;

  @ApiProperty({ enum: JobType, example: JobType.FULL_TIME })
  @IsEnum(JobType)
  type: JobType;

  @ApiProperty({ enum: ExperienceLevel, example: ExperienceLevel.SENIOR })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({ example: ['Flutter', 'Dart', 'REST APIs', 'Firebase'] })
  @IsArray()
  @IsString({ each: true })
  requiredSkills: string[];

  @ApiProperty({ example: ['GraphQL', 'CI/CD', 'Testing'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredSkills?: string[];

  @ApiProperty({ example: 80000, description: 'Minimum salary' })
  @IsNumber()
  @Min(0)
  salaryMin: number;

  @ApiProperty({ example: 120000, description: 'Maximum salary' })
  @IsNumber()
  @Min(0)
  salaryMax: number;

  @ApiProperty({ example: 'USD' })
  @IsString()
  currency: string;

  @ApiProperty({ example: ['Health Insurance', 'Remote Work', '401k'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  benefits?: string[];

  @ApiProperty({ example: '2024-12-31T23:59:59.000Z' })
  @IsDate()
  @Type(() => Date)
  applicationDeadline: Date;

  @ApiProperty({ example: 'https://company-logo.png', required: false })
  @IsOptional()
  @IsString()
  companyLogo?: string;

  @ApiProperty({ example: 'https://company.com', required: false })
  @IsOptional()
  @IsString()
  companyWebsite?: string;

  @ApiProperty({ example: '50-200 employees', required: false })
  @IsOptional()
  @IsString()
  companySize?: string;

  @ApiProperty({ example: 'Technology', required: false })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiProperty({ example: 'Please send your resume and portfolio...', required: false })
  @IsOptional()
  @IsString()
  applicationInstructions?: string;

  @ApiProperty({ example: ['flutter', 'mobile', 'startup'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}