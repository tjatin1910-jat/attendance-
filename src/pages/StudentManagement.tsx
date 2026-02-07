import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

interface Student {
  student_id: string
  name: string
  email: string
  enrollment_date: string
  biometric_enrolled: boolean
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStudents()
  }, [])

  useEffect(() => {
    filterStudents()
  }, [students, searchTerm])

  const loadStudents = async () => {
    try {
      // const data = await apiService.get<Student[]>('/api/v1/students')
      
      // Mock data
      const mockData: Student[] = [
        {
          student_id: 'STU001',
          name: 'John Doe',
          email: 'john.doe@college.edu',
          enrollment_date: '2023-09-01',
          biometric_enrolled: true,
        },
        {
          student_id: 'STU002',
          name: 'Jane Smith',
          email: 'jane.smith@college.edu',
          enrollment_date: '2023-09-01',
          biometric_enrolled: true,
        },
        {
          student_id: 'STU003',
          name: 'Bob Johnson',
          email: 'bob.johnson@college.edu',
          enrollment_date: '2023-09-01',
          biometric_enrolled: false,
        },
      ]
      
      setStudents(mockData)
    } catch (error) {
      console.error('Failed to load students:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterStudents = () => {
    if (!searchTerm) {
      setFilteredStudents(students)
      return
    }

    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredStudents(filtered)
  }

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      // await apiService.delete(`/api/v1/students/${studentId}`)
      setStudents(students.filter((s: Student) => s.student_id !== studentId))
    } catch (error) {
      console.error('Failed to delete student:', error)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-2">Manage student profiles and biometric enrollment</p>
        </div>
        <button onClick={() => console.log('Add student')} className="btn btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Add Student
        </button>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="input pl-10"
            placeholder="Search by name, ID, or email"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Biometric Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student: Student) => (
                  <tr key={student.student_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.student_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(student.enrollment_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        student.biometric_enrolled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.biometric_enrolled ? 'Enrolled' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.student_id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No students found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentManagement
