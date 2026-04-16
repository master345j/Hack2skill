#!/bin/bash

# Build and prepare for production

echo "🏗️ Building Smart City Platform for Production..."
echo ""

# Build Backend
echo "📦 Building Backend..."
cd backend
# Backend already contains all logic in server.js, no build needed
echo "✓ Backend ready"
cd ..

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm run build
if [ $? -eq 0 ]; then
  echo "✓ Frontend build complete"
  echo "   Build directory: frontend/build"
else
  echo "❌ Frontend build failed"
  exit 1
fi
cd ..

echo ""
echo "✅ Build Complete!"
echo ""
echo "📦 Production Deployment:"
echo "   Backend:  Deploy backend/ folder"
echo "   Frontend: Deploy frontend/build/ folder"
echo ""
echo "🚀 Deployment Targets:"
echo "   Backend:  Render, Railway, or Heroku"
echo "   Frontend: Netlify, Vercel, or GitHub Pages"
