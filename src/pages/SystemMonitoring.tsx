import { Activity, Camera, Database, Server } from 'lucide-react'

const SystemMonitoring: React.FC = () => {
  const services = [
    { name: 'Face Detection Service', status: 'healthy', uptime: '99.9%', icon: Camera },
    { name: 'Face Recognition Service', status: 'healthy', uptime: '99.8%', icon: Activity },
    { name: 'Attendance Service', status: 'healthy', uptime: '99.9%', icon: Database },
    { name: 'Authentication Service', status: 'healthy', uptime: '100%', icon: Server },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
        <p className="text-gray-600 mt-2">Monitor system health and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <div key={service.name} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {service.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SystemMonitoring
