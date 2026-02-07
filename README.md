# Face Recognition Attendance System - Web Application

A modern, production-ready web interface for the Face Recognition Attendance System built with React, TypeScript, and Tailwind CSS.

## Features

### Faculty Interface
- **Dashboard**: Overview of classes and attendance statistics
- **Attendance View**: Real-time attendance records with filtering and export capabilities
- **Class Management**: View and manage assigned classes
- **Reports**: Generate and export attendance reports in CSV/PDF formats

### Administrator Interface
- **Admin Dashboard**: System-wide analytics and performance metrics
- **Student Management**: Add, edit, and manage student profiles
- **Class Management**: Create and manage classes and schedules
- **User Management**: Manage system users with role-based access control
- **Biometric Enrollment**: Enroll student biometric data for face recognition
- **System Monitoring**: Real-time system health and performance monitoring

### Security Features
- JWT-based authentication
- Multi-factor authentication (MFA) for administrators
- Role-based access control (RBAC)
- Secure API communication
- Session management

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Prerequisites

- Node.js 18+ and npm/yarn
- Backend API services running (see main project README)

## Installation

1. **Install dependencies**:
```bash
cd attendance/web-app
npm install
```

2. **Configure environment variables**:
Create a `.env` file in the `web-app` directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

3. **Start development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
web-app/
├── src/
│   ├── components/          # Reusable components
│   │   └── ProtectedRoute.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── layouts/             # Layout components
│   │   └── DashboardLayout.tsx
│   ├── pages/               # Page components
│   │   ├── LoginPage.tsx
│   │   ├── FacultyDashboard.tsx
│   │   ├── AttendanceView.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── StudentManagement.tsx
│   │   ├── ClassManagement.tsx
│   │   ├── UserManagement.tsx
│   │   ├── BiometricEnrollment.tsx
│   │   └── SystemMonitoring.tsx
│   ├── services/            # API services
│   │   ├── api.ts
│   │   └── authService.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── tailwind.config.js       # Tailwind config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Demo Credentials

### Faculty Account
- Username: `faculty1`
- Password: `password123`

### Administrator Account
- Username: `admin1`
- Password: `password123`
- MFA Code: Will be displayed after initial login

## Features by Role

### Faculty
- View dashboard with class statistics
- View and filter attendance records
- Export attendance data (CSV/PDF)
- Manage assigned classes
- Generate reports

### Administrator
All faculty features plus:
- Manage students (add, edit, delete)
- Manage classes and schedules
- Manage system users
- Enroll biometric data
- Monitor system health
- View system analytics
- Configure system settings

## API Integration

The web app communicates with the backend API services:

- **Authentication Service**: `/api/v1/auth/*`
- **User Management Service**: `/api/v1/users/*`
- **Student Management**: `/api/v1/students/*`
- **Attendance Service**: `/api/v1/attendance/*`
- **Class Management**: `/api/v1/classes/*`

## Deployment

### Option 1: Static Hosting (Netlify, Vercel, etc.)

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` directory to your hosting provider

3. Configure environment variables on the hosting platform

### Option 2: Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Build and run:
```bash
docker build -t attendance-web .
docker run -p 3000:80 attendance-web
```

### Option 3: Node.js Server

Use a simple Express server to serve the built files:

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Lazy loading for routes
- Memoization for expensive computations
- Debounced search inputs
- Virtualized lists for large datasets

## Security Best Practices

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- CSRF protection
- XSS prevention through React's built-in escaping
- Content Security Policy headers
- HTTPS only in production
- Regular dependency updates

## Troubleshooting

### API Connection Issues
- Verify backend services are running
- Check `VITE_API_BASE_URL` environment variable
- Ensure CORS is configured on backend

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check JWT token expiration
- Verify backend authentication service is running

## Contributing

1. Follow the existing code style
2. Write TypeScript with proper types
3. Use Tailwind CSS for styling
4. Test on multiple browsers
5. Ensure responsive design works on mobile

## License

This project is part of the Face Recognition Attendance System.

## Support

For issues and questions, please refer to the main project documentation or contact the development team.
