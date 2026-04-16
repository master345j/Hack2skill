#!/bin/bash

# Start development environment

echo "🌍 Starting Smart City Platform..."
echo ""

# Check if running in background
if [ "$1" == "daemon" ]; then
  echo "📦 Starting Backend (background)..."
  cd backend && npm run dev > backend.log 2>&1 &
  BACKEND_PID=$!
  echo "   Backend PID: $BACKEND_PID"
  
  sleep 3
  
  echo "📦 Starting Frontend (background)..."
  cd ../frontend && npm start > frontend.log 2>&1 &
  FRONTEND_PID=$!
  echo "   Frontend PID: $FRONTEND_PID"
  
  echo ""
  echo "✅ Services started in background"
  echo "   Backend Log:  tail -f backend.log"
  echo "   Frontend Log: tail -f frontend.log"
else
  echo "Run with 'daemon' flag to start services in background"
  echo "Otherwise, open two terminals:"
  echo "  Terminal 1: cd backend && npm run dev"
  echo "  Terminal 2: cd frontend && npm start"
fi
