"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useAttendance } from "@/context/AttendanceContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import AdminLayout from "@/components/AdminLayout"
import AttendanceChart from "@/components/AttendanceChart"
import { exportToCSV, exportToPDF } from "@/lib/exportUtils"

export default function ReportsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <ReportsContent />
      </AdminLayout>
    </ProtectedRoute>
  )
}

function ReportsContent() {
  const { students, attendance } = useAttendance()

  const weeklyData = useMemo(() => {
    const today = new Date()
    const data = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const dayRecords = attendance.filter((a) => a.date === dateStr)
      const present = dayRecords.filter((a) => a.status === "present").length
      const absent = dayRecords.filter((a) => a.status === "absent").length

      data.push({
        date: dateStr,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        present,
        absent,
        total: students.length,
      })
    }

    return data
  }, [students, attendance])

  const handleExportCSV = () => {
    exportToCSV(students, attendance)
  }

  const handleExportPDF = () => {
    exportToPDF(students, attendance, weeklyData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted">View attendance analytics</p>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleExportCSV}
          className="py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Export CSV
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleExportPDF}
          className="py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Export PDF
        </motion.button>
      </div>

      {/* Weekly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-sm"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Attendance</h3>
        <AttendanceChart data={weeklyData} />
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-sm"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted">Total Students</span>
            <span className="font-semibold text-foreground">{students.length}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-muted">Total Records</span>
            <span className="font-semibold text-foreground">{attendance.length}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-muted">Average Attendance</span>
            <span className="font-semibold text-foreground">
              {attendance.length > 0
                ? Math.round((attendance.filter((a) => a.status === "present").length / attendance.length) * 100)
                : 0}
              %
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
