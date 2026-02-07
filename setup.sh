#!/bin/bash

# Face Recognition Attendance Web App - Setup Script
# This script automates the setup process

set -e

echo "=================================="
echo "Face Recognition Attendance System"
echo "Web Application Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js version 18 or higher is required${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm -v) detected${NC}"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠ Please update VITE_API_BASE_URL in .env file${NC}"
else
    echo -e "${YELLOW}⚠ .env file already exists, skipping...${NC}"
fi

echo ""

# Ask if user wants to start dev server
read -p "Do you want to start the development server now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Starting development server..."
    echo "Access the application at: http://localhost:3000"
    echo ""
    echo "Demo Credentials:"
    echo "  Faculty: faculty1 / password123"
    echo "  Admin:   admin1 / password123"
    echo ""
    npm run dev
else
    echo ""
    echo -e "${GREEN}Setup complete!${NC}"
    echo ""
    echo "To start the development server, run:"
    echo "  npm run dev"
    echo ""
    echo "To build for production, run:"
    echo "  npm run build"
    echo ""
    echo "Demo Credentials:"
    echo "  Faculty: faculty1 / password123"
    echo "  Admin:   admin1 / password123"
    echo ""
fi
