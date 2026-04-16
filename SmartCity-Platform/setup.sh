#!/bin/bash

# Smart City Platform - Setup Script
# This script sets up the complete development environment

echo "🌍 Smart City Resource Allocation Platform - Setup"
echo "=================================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Please install Node.js v14+"
    exit 1
fi

echo "✓ Node.js $(node -v)"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
if [ -f .env ]; then
  echo "✓ .env already exists"
else
  cp .env.example .env
  echo "⚠️ .env created from template. Please update Firebase credentials."
fi
cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🚀 To start development:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd frontend && npm start"
echo ""
echo "📱 Or use Docker:"
echo "   docker-compose up -d"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:5001/api"
