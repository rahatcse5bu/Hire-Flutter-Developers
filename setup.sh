#!/bin/bash

# FlutterHire Platform Setup Script

echo "🚀 Setting up FlutterHire Platform..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "🔧 Setting up Backend (NestJS)..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Install frontend dependencies  
echo "🎨 Setting up Frontend (Next.js)..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

# Install admin dependencies
echo "👑 Setting up Admin Dashboard (Next.js)..."
cd ../admin
npm install
echo "✅ Admin dependencies installed"

cd ..

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start MongoDB: mongod (or use Docker)"
echo "2. Configure environment variables in each service"
echo "3. Run the development servers:"
echo ""
echo "   # Start all services"
echo "   npm run start:all"
echo ""
echo "   # Or start individually:"
echo "   npm run dev:backend   # Backend API (Port 3333)"
echo "   npm run dev:frontend  # Main Platform (Port 3000)" 
echo "   npm run dev:admin     # Admin Dashboard (Port 3001)"
echo ""
echo "🌐 Platform URLs:"
echo "   Frontend:  http://localhost:3000"
echo "   Admin:     http://localhost:3001" 
echo "   API Docs:  http://localhost:3333/api/docs"
echo ""
echo "📚 See README.md for detailed setup instructions"