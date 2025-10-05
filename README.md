# FlutterHire - Flutter Developer Hiring Platform

A comprehensive platform connecting Flutter developers with recruiters globally, featuring job postings, developer profiles, recruitment tests, and a robust business model for sustainable profitability.

## 🚀 Project Overview

FlutterHire is a specialized hiring platform designed exclusively for Flutter developers and companies looking to hire Flutter talent. The platform offers a complete recruitment ecosystem with multiple revenue streams and advanced features.

## 📁 Project Structure

```
Hire_Flutter_Developers/
├── backend/          # NestJS + MongoDB API
├── frontend/         # Next.js User-facing Platform  
├── admin/           # Next.js Admin Dashboard
└── README.md        # This file
```

## 💰 Business Model

### Revenue Streams

#### 1. **Subscription Plans** (Primary Revenue)
- **Free Tier**: 1 job post/month, basic features
- **Basic Plan ($29.99/month)**: 5 job posts, analytics, priority support
- **Premium Plan ($49.99/month)**: 15 job posts, featured listings, branding
- **Enterprise Plan ($99.99/month)**: Unlimited posts, API access, team features

#### 2. **Transaction Fees** (5% per successful hire)
- Commission on successful job placements
- Automated through platform's escrow system

#### 3. **Premium Features**
- Job post boosting ($5-20 per boost)
- Featured job listings ($15 per week)
- Priority candidate access ($10 per search)

#### 4. **Recruitment Testing Suite**
- Pre-built Flutter skill assessments
- Custom test creation tools
- Coding challenges and technical interviews

#### 5. **Additional Services**
- Background verification services
- Video interview platform integration
- Custom recruitment workflows

### Target Market
- **Primary**: Companies needing Flutter developers (Startups to Enterprise)
- **Secondary**: Flutter freelancers and contractors
- **Geographic**: Global focus with initial emphasis on US, EU, and Asia-Pacific

### Revenue Projections (Year 1)
- Subscription Revenue: $500K-1M
- Transaction Fees: $200K-400K
- Premium Features: $100K-200K
- **Total Projected**: $800K-1.6M

## 🛠 Tech Stack

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport
- **Payments**: Stripe integration
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Documentation**: Swagger/OpenAPI

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: React Query + Context API
- **Authentication**: NextAuth.js
- **Payments**: Stripe Elements
- **Forms**: React Hook Form with Zod validation

### Admin Dashboard (Next.js)
- **Framework**: Next.js 14 with App Router
- **UI Components**: Custom admin components
- **Charts**: Recharts for analytics
- **Tables**: TanStack Table
- **Real-time**: Socket.io for live updates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Stripe account for payments
- Cloudinary account for file uploads

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Hire_Flutter_Developers
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file in backend/src/:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/flutter-hiring

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# App
NODE_ENV=development
PORT=3333

# URLs
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

Start backend:
```bash
npm run start:dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-public-key
```

Start frontend:
```bash
npm run dev
```

4. **Admin Dashboard Setup**
```bash
cd ../admin
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1
```

Start admin:
```bash
npm run dev
```

## 📋 Features

### For Developers
- **Profile Creation**: Comprehensive profiles with portfolios
- **Job Search**: Advanced filtering and search capabilities  
- **Applications**: Easy job application process
- **Skill Assessment**: Optional technical tests
- **Communication**: Direct messaging with recruiters
- **Analytics**: Application tracking and insights

### For Recruiters
- **Job Posting**: Rich job posting interface
- **Candidate Search**: AI-powered candidate matching
- **Application Management**: Complete ATS functionality
- **Team Collaboration**: Multi-user account management
- **Analytics Dashboard**: Hiring insights and metrics
- **Custom Branding**: Company profile customization

### For Admins
- **User Management**: Complete user administration
- **Content Moderation**: Job post and profile review
- **Analytics**: Platform-wide insights and reporting
- **Payment Management**: Subscription and billing oversight
- **System Monitoring**: Performance and health metrics

## 🔗 API Documentation

Once the backend is running, visit:
- Swagger Documentation: `http://localhost:3333/api/docs`
- API Base URL: `http://localhost:3333/api/v1`

### Key Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /jobs` - List jobs with filters
- `POST /jobs` - Create job posting
- `GET /users/analytics` - User analytics
- `POST /subscriptions/create` - Create subscription

## 🎯 Platform URLs

- **Main Platform**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001  
- **API Documentation**: http://localhost:3333/api/docs
- **Backend API**: http://localhost:3333/api/v1

## 🧪 Testing Strategy

### Backend Testing
```bash
cd backend
npm run test        # Unit tests
npm run test:e2e    # Integration tests
npm run test:cov    # Coverage report
```

### Frontend Testing  
```bash
cd frontend
npm run test        # Jest + React Testing Library
npm run test:e2e    # Playwright E2E tests
```

## 📈 Scalability Considerations

### Performance Optimizations
- Database indexing for search queries
- Redis caching for frequently accessed data
- CDN integration for static assets
- Image optimization and lazy loading

### Infrastructure Scaling
- Containerization with Docker
- Kubernetes orchestration
- Load balancing with NGINX
- Database sharding strategies

## 🔒 Security Features

- JWT authentication with refresh tokens
- Rate limiting and request throttling
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- File upload restrictions
- SQL injection prevention

## 🌍 Deployment

### Production Environment Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://your-domain.com
ADMIN_URL=https://admin.your-domain.com
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Vercel/Netlify Deployment
- Frontend and Admin can be deployed to Vercel
- Backend can be deployed to Railway, Render, or AWS

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@flutterhire.com
- Documentation: https://docs.flutterhire.com
- Discord Community: https://discord.gg/flutterhire

## 🚧 Roadmap

### Phase 1 (MVP) ✅
- User authentication system
- Job posting and search
- Basic subscription tiers
- Admin dashboard

### Phase 2 (Q2 2024)
- Advanced skill assessments
- Video interview integration
- Mobile app (React Native)
- API marketplace

### Phase 3 (Q3 2024)  
- AI-powered matching
- Blockchain verification
- Enterprise SSO integration
- International expansion

---

## 🎉 Quick Start Commands

```bash
# Start all services
npm run dev:all

# Backend only
cd backend && npm run start:dev

# Frontend only  
cd frontend && npm run dev

# Admin only
cd admin && npm run dev

# Install all dependencies
npm run install:all
```

Built with ❤️ for the Flutter community worldwide.