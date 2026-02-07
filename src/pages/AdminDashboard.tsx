import { useState } from 'react'
import { Users, BookOpen, Activity, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const AdminDashboard: React.FC = () => {
  const [stats] = useState({
    totalStudents: 1245,
    totalClasses: 42,
    activeUsers: 87,
    systemHealth: 98.5,
  })

  const attendanceData = [
    { day: 'Mon', attendance: 85 },
    { day: 'Tue', attendance: 88 },
    { day: 'Wed', attendance: 82 },
    { day: 'Thu', attendance: 90 },
    { day: 'Fri', attendance: 87 },
  ]

  const performanceData = [
    { time: '00:00', fps: 15.2 },
    { time: '04:00', fps: 15.5 },
    { time: '08:00', fps: 15.1 },
    { time: '12:00', fps: 14.8 },
    { time: '16:00', fps: 15.3 },
    { time: '20:00', fps: 15.4 },
  ]

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Classes',
      value: stats.totalClasses,
      change: '+5%',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      change: '-3%',
      trend: 'down',
      icon: Activity,
      color: 'bg-purple-500',
    },
    {
      title: 'System Health',
      value: `${stats.systemHealth}%`,
      change: '+0.5%',
      trend: 'up',
      icon: Activity,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">System overview and analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Performance (FPS)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[14, 16]} />
              <Tooltip />
              <Line type="monotone" dataKey="fps" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Alerts */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h2>
        <div className="space-y-3">
          {[
            { type: 'warning', message: 'Camera 3 experiencing low light conditions', time: '2 hours ago' },
            { type: 'info', message: 'Scheduled maintenance completed successfully', time: '5 hours ago' },
            { type: 'success', message: 'All systems operating normally', time: '1 day ago' },
          ].map((alert, idx) => (
            <div key={idx} className={`flex items-start p-4 rounded-lg ${
              alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
              alert.type === 'info' ? 'bg-blue-50 border border-blue-200' :
              'bg-green-50 border border-green-200'
            }`}>
              <AlertTriangle className={`h-5 w-5 mr-3 flex-shrink-0 ${
                alert.type === 'warning' ? 'text-yellow-600' :
                alert.type === 'info' ? 'text-blue-600' :
                'text-green-600'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
