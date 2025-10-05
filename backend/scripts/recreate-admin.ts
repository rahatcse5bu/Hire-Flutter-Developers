import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from '../src/modules/users/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

async function recreateAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<UserDocument>>('UserModel');

  try {
    // Delete existing admin user if exists
    await userModel.deleteOne({ email: 'admin@flutterhire.com' });
    console.log('🗑️ Existing admin user deleted (if existed)');

    // Create admin user with properly hashed password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = new userModel({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@flutterhire.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    await adminUser.save();

    console.log('✅ Admin user recreated successfully with hashed password!');
    console.log('📧 Email: admin@flutterhire.com');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error recreating admin user:', error);
  } finally {
    await app.close();
  }
}

recreateAdminUser();