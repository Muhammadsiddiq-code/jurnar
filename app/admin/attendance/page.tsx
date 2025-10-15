"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAttendance } from "@/context/AttendanceContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import AdminLayout from "@/components/AdminLayout"
import AttendanceRow from "@/components/AttendanceRow"

export default function AttendancePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <AttendanceContent />
      </AdminLayout>
    </ProtectedRoute>
  )
}

function AttendanceContent() {
  const { students, attendance, markAllPresent, getAttendanceStats } = useAttendance()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const stats = getAttendanceStats(selectedDate)

  const getStudentStatus = (studentId: string) => {
    const record = attendance.find((a) => a.studentId === studentId && a.date === selectedDate)
    return record?.status
  }

  const handleMarkAllPresent = () => {
    markAllPresent(selectedDate)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mark Attendance</h1>
        <p className="text-muted">Track student attendance</p>
      </div>

      {/* Date Picker */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
          Select Date
        </label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-input bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-xs text-muted mt-1">Total</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <p className="text-2xl font-bold text-success">{stats.present}</p>
          <p className="text-xs text-muted mt-1">Present</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <p className="text-2xl font-bold text-error">{stats.absent}</p>
          <p className="text-xs text-muted mt-1">Absent</p>
        </div>
      </div>

      {/* Mark All Present Button */}
      {students.length > 0 && (
        <button
          onClick={handleMarkAllPresent}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Mark All Present
        </button>
      )}

      {/* Attendance List */}
      <div className="space-y-3">
        <AnimatePresence>
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
            >
              <AttendanceRow student={student} date={selectedDate} status={getStudentStatus(student.id)} />
            </motion.div>
          ))}
        </AnimatePresence>

        {students.length === 0 && (
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Students</h3>
            <p className="text-muted">Add students first to mark attendance</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
