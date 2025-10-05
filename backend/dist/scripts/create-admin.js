"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const users_service_1 = require("../src/modules/users/users.service");
const user_schema_1 = require("../src/modules/users/schemas/user.schema");
async function createAdminUser() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    try {
        const existingAdmin = await usersService.findByEmail('admin@flutterhire.com');
        if (existingAdmin) {
            console.log('✅ Admin user already exists: admin@flutterhire.com');
            return;
        }
        const adminUser = await usersService.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@flutterhire.com',
            password: 'admin123',
            role: user_schema_1.UserRole.ADMIN,
        });
        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@flutterhire.com');
        console.log('🔑 Password: admin123');
    }
    catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
    finally {
        await app.close();
    }
}
createAdminUser();
//# sourceMappingURL=create-admin.js.map