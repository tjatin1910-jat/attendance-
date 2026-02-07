import { useEffect, useState } from 'react'
import { Users, BookOpen, CheckCircle, Clock } from 'lucide-react'

interface DashboardStats {
  totalStudents: number
  totalClasses: number
  todayAttendance: number
  averageAttendance: number
}

const FacultyDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalClasses: 0,
    todayAttendance: 0,
    averageAttendance: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // In production, fetch real data from API
      // const data = await apiService.get<DashboardStats>('/api/v1/dashboard/stats')
      
      // Mock data for demonstration
      setStats({
        totalStudents: 245,
        totalClasses: 8,
        todayAttendance: 187,
        averageAttendance: 85.3,
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Classes',
      value: stats.totalClasses,
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Today\'s Attendance',
      value: stats.todayAttendance,
      icon: CheckCircle,
      color: 'bg-purple-500',
    },
    {
      title: 'Average Attendance',
      value: `${stats.averageAttendance}%`,
      icon: Clock,
      color: 'bg-orange-500',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your classes and attendance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Classes</h2>
          <div className="space-y-3">
            {[
              { name: 'Computer Science 101', time: '9:00 AM', attendance: '45/50' },
              { name: 'Data Structures', time: '11:00 AM', attendance: '38/42' },
              { name: 'Algorithms', time: '2:00 PM', attendance: '52/55' },
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{cls.name}</p>
                  <p className="text-sm text-gray-600">{cls.time}</p>
                </div>
                <span className="text-sm font-medium text-primary-600">{cls.attendance}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn btn-primary text-left">
              View Today's Attendance
            </button>
            <button className="w-full btn btn-secondary text-left">
              Generate Report
            </button>
            <button className="w-full btn btn-secondary text-left">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyDashboard