import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'
import FacultyDashboard from './pages/FacultyDashboard'
import AttendanceView from './pages/AttendanceView'
import AdminDashboard from './pages/AdminDashboard'
import StudentManagement from './pages/StudentManagement'
import ClassManagement from './pages/ClassManagement'
import UserManagement from './pages/UserManagement'
import SystemMonitoring from './pages/SystemMonitoring'
import BiometricEnrollment from './pages/BiometricEnrollment'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            {/* Faculty Routes */}
            <Route index element={<Navigate to="/faculty/dashboard" replace />} />
            <Route path="faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="faculty/attendance" element={<AttendanceView />} />
            
            {/* Admin Routes */}
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/students" element={<StudentManagement />} />
            <Route path="admin/classes" element={<ClassManagement />} />
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="admin/monitoring" element={<SystemMonitoring />} />
            <Route path="admin/biometric-enrollment" element={<BiometricEnrollment />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App