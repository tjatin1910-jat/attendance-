import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'

const ClassManagement: React.FC = () => {
  const [classes] = useState([
    { class_id: 'CS101', name: 'Computer Science 101', instructor: 'Dr. Smith', students: 50 },
    { class_id: 'DS201', name: 'Data Structures', instructor: 'Dr. Johnson', students: 42 },
    { class_id: 'ALG301', name: 'Algorithms', instructor: 'Dr. Williams', students: 38 },
  ])

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600 mt-2">Manage classes and schedules</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Add Class
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.map((cls) => (
                <tr key={cls.class_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cls.class_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cls.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cls.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cls.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ClassManagement
