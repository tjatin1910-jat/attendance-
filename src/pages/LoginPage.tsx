import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Fingerprint, AlertCircle } from 'lucide-react'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mfaCode, setMfaCode] = useState('')
  const [showMfa, setShowMfa] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(username, password, showMfa ? mfaCode : undefined)
      
      if (result.success) {
        navigate('/faculty/dashboard')
      } else if (result.mfaRequired) {
        setShowMfa(true)
        setError('MFA code required. Please check your registered device.')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Fingerprint className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Face Recognition</h1>
          <p className="text-gray-600 mt-2">Attendance Management System</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            {showMfa && (
              <div>
                <label htmlFor="mfaCode" className="label">
                  MFA Code
                </label>
                <input
                  id="mfaCode"
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="input"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Demo Credentials:</p>
            <p className="mt-1">Faculty: <code className="bg-gray-100 px-2 py-1 rounded">faculty1 / password123</code></p>
            <p className="mt-1">Admin: <code className="bg-gray-100 px-2 py-1 rounded">admin1 / password123</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
