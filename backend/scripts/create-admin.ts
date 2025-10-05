import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/modules/users/users.service';
import { UserRole } from '../src/modules/users/schemas/user.schema';

async function createAdminUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Check if admin already exists
    const existingAdmin = await usersService.findByEmail('admin@flutterhire.com');
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists: admin@flutterhire.com');
      return;
    }

    // Create admin user
    const adminUser = await usersService.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@flutterhire.com',
      password: 'admin123',
      role: UserRole.ADMIN,
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@flutterhire.com');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await app.close();
  }
}

createAdminUser();