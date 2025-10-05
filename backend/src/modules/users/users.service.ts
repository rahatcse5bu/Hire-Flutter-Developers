import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password');
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    await user.save();
    return user.toObject({ transform: (doc, ret) => {
      delete ret.password;
      return ret;
    }});
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateSubscription(id: string, subscriptionData: any): Promise<User> {
    return this.update(id, subscriptionData);
  }

  async incrementJobPosts(id: string, count: number = 1): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $inc: { jobPostsRemaining: count } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async decrementJobPosts(id: string, count: number = 1): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $inc: { jobPostsRemaining: -count } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  async getAnalytics() {
    const totalUsers = await this.userModel.countDocuments();
    const developers = await this.userModel.countDocuments({ role: 'developer' });
    const recruiters = await this.userModel.countDocuments({ role: 'recruiter' });
    const verifiedUsers = await this.userModel.countDocuments({ isVerified: true });
    
    return {
      totalUsers,
      developers,
      recruiters,
      verifiedUsers,
      unverifiedUsers: totalUsers - verifiedUsers,
    };
  }
}