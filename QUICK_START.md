# Quick Start Guide

Get the Face Recognition Attendance web app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn installed
- Backend API running (optional for demo)

## Installation

### 1. Navigate to the web app directory
```bash
cd attendance/web-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cp .env.example .env
```

### 4. Start the development server
```bash
npm run dev
```

### 5. Open your browser
Navigate to: `http://localhost:3000`

## Demo Login

### Faculty Account
- **Username**: `faculty1`
- **Password**: `password123`

### Administrator Account
- **Username**: `admin1`
- **Password**: `password123`
- **MFA Code**: Will be displayed after initial login

## What You'll See

### Faculty Users
- Dashboard with class statistics
- Attendance records viewer
- Export functionality
- Class management

### Administrator Users
- All faculty features PLUS:
- Student management
- User management
- System monitoring
- Biometric enrollment
- Advanced analytics

## Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run type-check
```

## Docker Quick Start

### Build and run with Docker
```bash
docker build -t attendance-web .
docker run -p 3000:80 attendance-web
```

### Or use Docker Compose
```bash
docker-compose up -d
```

## Troubleshooting

### Port already in use
Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to any available port
}
```

### API connection issues
1. Check if backend is running
2. Verify `VITE_API_BASE_URL` in `.env`
3. Check browser console for errors

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

## Next Steps

1. **Explore the interface** - Try all features with demo accounts
2. **Connect to backend** - Update API URL in `.env`
3. **Customize styling** - Edit `tailwind.config.js` and `src/index.css`
4. **Add features** - Extend components in `src/pages/`
5. **Deploy** - See `DEPLOYMENT.md` for deployment options

## Project Structure

```
src/
├── components/     # Reusable components
├── contexts/       # React contexts (Auth, etc.)
├── layouts/        # Layout components
├── pages/          # Page components
├── services/       # API services
├── App.tsx         # Main app
└── main.tsx        # Entry point
```

## Key Features

✅ Modern React with TypeScript
✅ Tailwind CSS for styling
✅ JWT authentication
✅ Role-based access control
✅ Responsive design
✅ Real-time data updates
✅ Export functionality
✅ Charts and analytics
✅ Docker support

## Support

- **Documentation**: See `README.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Issues**: Check browser console
- **API**: Verify backend connectivity

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Ready to go!** 🚀

Start exploring the application and customize it for your needs.
