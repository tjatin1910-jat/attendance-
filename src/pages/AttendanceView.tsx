import { useState, useEffect } from 'react'
import { Search, Download, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface AttendanceRecord {
  record_id: string
  student_id: string
  student_name: string
  class_name: string
  timestamp: string
  status: 'PRESENT' | 'LATE' | 'ABSENT'
  confidence_score: number
}

const AttendanceView: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAttendanceRecords()
  }, [selectedDate])

  useEffect(() => {
    filterRecords()
  }, [records, searchTerm, selectedClass])

  const loadAttendanceRecords = async () => {
    try {
      // In production, fetch from API
      // const data = await apiService.get<AttendanceRecord[]>('/api/v1/attendance/records', {
      //   date: selectedDate
      // })
      
      // Mock data
      const mockData: AttendanceRecord[] = [
        {
          record_id: '1',
          student_id: 'STU001',
          student_name: 'John Doe',
          class_name: 'Computer Science 101',
          timestamp: new Date().toISOString(),
          status: 'PRESENT',
          confidence_score: 0.98,
        },
        {
          record_id: '2',
          student_id: 'STU002',
          student_name: 'Jane Smith',
          class_name: 'Data Structures',
          timestamp: new Date().toISOString(),
          status: 'PRESENT',
          confidence_score: 0.95,
        },
        {
          record_id: '3',
          student_id: 'STU003',
          student_name: 'Bob Johnson',
          class_name: 'Computer Science 101',
          timestamp: new Date().toISOString(),
          status: 'LATE',
          confidence_score: 0.92,
        },
      ]
      
      setRecords(mockData)
    } catch (error) {
      console.error('Failed to load attendance records:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterRecords = () => {
    let filtered = records

    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.student_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedClass !== 'all') {
      filtered = filtered.filter((record) => record.class_name === selectedClass)
    }

    setFilteredRecords(filtered)
  }

  const exportToCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Class', 'Timestamp', 'Status', 'Confidence']
    const rows = filteredRecords.map((record) => [
      record.student_id,
      record.student_name,
      record.class_name,
      format(new Date(record.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      record.status,
      (record.confidence_score * 100).toFixed(1) + '%',
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance_${selectedDate}.csv`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-green-100 text-green-800'
      case 'LATE':
        return 'bg-yellow-100 text-yellow-800'
      case 'ABSENT':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Attendance Records</h1>
        <p className="text-gray-600 mt-2">View and manage student attendance</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="label">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
                placeholder="Search by name or ID"
              />
            </div>
          </div>

          <div>
            <label className="label">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input"
            >
              <option value="all">All Classes</option>
              <option value="Computer Science 101">Computer Science 101</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Algorithms">Algorithms</option>
            </select>
          </div>

          <div>
            <label className="label">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button onClick={exportToCSV} className="btn btn-secondary w-full">
              <Download className="h-5 w-5 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Records Table */}
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
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.record_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.student_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.student_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.class_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {format(new Date(record.timestamp), 'MMM dd, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {(record.confidence_score * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No attendance records found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendanceView
