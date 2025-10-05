"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const user_schema_1 = require("../src/modules/users/schemas/user.schema");
const bcrypt = require("bcryptjs");
async function recreateAdminUser() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get('UserModel');
    try {
        await userModel.deleteOne({ email: 'admin@flutterhire.com' });
        console.log('🗑️ Existing admin user deleted (if existed)');
        const hashedPassword = await bcrypt.hash('admin123', 12);
        const adminUser = new userModel({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@flutterhire.com',
            password: hashedPassword,
            role: user_schema_1.UserRole.ADMIN,
        });
        await adminUser.save();
        console.log('✅ Admin user recreated successfully with hashed password!');
        console.log('📧 Email: admin@flutterhire.com');
        console.log('🔑 Password: admin123');
    }
    catch (error) {
        console.error('❌ Error recreating admin user:', error);
    }
    finally {
        await app.close();
    }
}
recreateAdminUser();
//# sourceMappingURL=recreate-admin.js.map