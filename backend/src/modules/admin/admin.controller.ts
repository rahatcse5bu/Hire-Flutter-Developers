import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Patch,
  Body, 
  Param, 
  Query, 
  UseGuards 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Dashboard Statistics
  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // User Management
  @Get('users')
  @ApiOperation({ summary: 'Get all users with pagination and filters' })
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('search') search?: string,
    @Query('role') role?: string,
  ) {
    return this.adminService.getUsers({ page, limit, search, role });
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Update user' })
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    return this.adminService.updateUser(id, updateData);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Patch('users/:id/toggle-status')
  @ApiOperation({ summary: 'Toggle user active status' })
  async toggleUserStatus(@Param('id') id: string) {
    return this.adminService.toggleUserStatus(id);
  }

  // Job Management
  @Get('jobs')
  @ApiOperation({ summary: 'Get all jobs with pagination and filters' })
  async getJobs(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getJobs({ page, limit, search, status });
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get job by ID' })
  async getJobById(@Param('id') id: string) {
    return this.adminService.getJobById(id);
  }

  @Patch('jobs/:id/status')
  @ApiOperation({ summary: 'Update job status' })
  async updateJobStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.adminService.updateJobStatus(id, status);
  }

  @Delete('jobs/:id')
  @ApiOperation({ summary: 'Delete job' })
  async deleteJob(@Param('id') id: string) {
    return this.adminService.deleteJob(id);
  }

  // Payment Management
  @Get('payments')
  @ApiOperation({ summary: 'Get all payments with pagination and filters' })
  async getPayments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getPayments({ page, limit, search, status });
  }

  @Get('payments/:id')
  @ApiOperation({ summary: 'Get payment by ID' })
  async getPaymentById(@Param('id') id: string) {
    return this.adminService.getPaymentById(id);
  }

  @Post('payments/:id/refund')
  @ApiOperation({ summary: 'Refund payment' })
  async refundPayment(@Param('id') id: string) {
    return this.adminService.refundPayment(id);
  }

  // Subscription Management
  @Get('subscriptions')
  @ApiOperation({ summary: 'Get all subscriptions with pagination and filters' })
  async getSubscriptions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getSubscriptions({ page, limit, search, status });
  }

  @Get('subscriptions/:id')
  @ApiOperation({ summary: 'Get subscription by ID' })
  async getSubscriptionById(@Param('id') id: string) {
    return this.adminService.getSubscriptionById(id);
  }

  @Post('subscriptions/:id/cancel')
  @ApiOperation({ summary: 'Cancel subscription' })
  async cancelSubscription(@Param('id') id: string) {
    return this.adminService.cancelSubscription(id);
  }

  @Post('subscriptions/:id/renew')
  @ApiOperation({ summary: 'Renew subscription' })
  async renewSubscription(@Param('id') id: string) {
    return this.adminService.renewSubscription(id);
  }

  // Analytics
  @Get('analytics')
  @ApiOperation({ summary: 'Get analytics data' })
  async getAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: string,
  ) {
    return this.adminService.getAnalytics({ startDate, endDate, type });
  }

  // Reports
  @Post('reports/generate')
  @ApiOperation({ summary: 'Generate report' })
  async generateReport(@Body() reportData: any) {
    return this.adminService.generateReport(reportData);
  }

  @Get('reports')
  @ApiOperation({ summary: 'Get all reports' })
  async getReports(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('type') type?: string,
  ) {
    return this.adminService.getReports({ page, limit, type });
  }

  // Settings
  @Get('settings')
  @ApiOperation({ summary: 'Get admin settings' })
  async getSettings() {
    return this.adminService.getSettings();
  }

  @Put('settings')
  @ApiOperation({ summary: 'Update admin settings' })
  async updateSettings(@Body() settings: any) {
    return this.adminService.updateSettings(settings);
  }

  // Notifications
  @Get('notifications')
  @ApiOperation({ summary: 'Get admin notifications' })
  async getNotifications(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('read') read?: boolean,
  ) {
    return this.adminService.getNotifications({ page, limit, read });
  }

  @Patch('notifications/:id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markNotificationAsRead(@Param('id') id: string) {
    return this.adminService.markNotificationAsRead(id);
  }

  @Post('notifications/send')
  @ApiOperation({ summary: 'Send notification' })
  async sendNotification(@Body() notificationData: any) {
    return this.adminService.sendNotification(notificationData);
  }
}