import { useState } from 'react'
import { Upload, Camera, CheckCircle } from 'lucide-react'

const BiometricEnrollment: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState('')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Biometric Enrollment</h1>
        <p className="text-gray-600 mt-2">Enroll student biometric data for face recognition</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Selection</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Select Student</label>
              <select
                value={selectedStudent}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)}
                className="input"
              >
                <option value="">Choose a student...</option>
                <option value="STU001">John Doe (STU001)</option>
                <option value="STU002">Jane Smith (STU002)</option>
                <option value="STU003">Bob Johnson (STU003)</option>
              </select>
            </div>

            <div>
              <label className="label">Upload Face Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Upload 3-5 images for best results
                </p>
              </div>
            </div>

            <button className="btn btn-primary w-full" disabled={!selectedStudent}>
              <Camera className="h-5 w-5 mr-2" />
              Start Enrollment
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Status</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Ready for enrollment</p>
                <p className="text-xs text-gray-600">Select a student to begin</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 3-5 clear face images</li>
                <li>• Good lighting conditions</li>
                <li>• Front-facing photos</li>
                <li>• No obstructions (glasses, masks)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BiometricEnrollment
