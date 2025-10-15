"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAttendance } from "@/context/AttendanceContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import AdminLayout from "@/components/AdminLayout"
import StudentForm from "@/components/StudentForm"
import StudentCard from "@/components/StudentCard"

export default function StudentsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <StudentsContent />
      </AdminLayout>
    </ProtectedRoute>
  )
}

function StudentsContent() {
  const { students } = useAttendance()
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (studentId: string) => {
    setEditingStudent(studentId)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingStudent(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Students</h1>
          <p className="text-muted">Manage student information</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:opacity-90 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search students..."
          className="w-full px-4 py-3 pl-12 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        <svg
          className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Student List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
            >
              <StudentCard student={student} onEdit={handleEdit} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl p-8 text-center border border-border"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
              <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Students Found</h3>
            <p className="text-muted">
              {searchQuery ? "Try a different search term" : "Add your first student to get started"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Student Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={handleCloseForm}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <StudentForm studentId={editingStudent} onClose={handleCloseForm} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
