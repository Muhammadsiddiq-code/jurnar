"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useAttendance } from "@/context/AttendanceContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import StudentLayout from "@/components/StudentLayout"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <DashboardContent />
      </StudentLayout>
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { students, currentUser, getStudentAttendance } = useAttendance()
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">("week")

  const student = useMemo(() => {
    return students.find((s) => s.id === currentUser?.studentId)
  }, [students, currentUser])

  const todayDate = new Date().toISOString().split("T")[0]

  const todayAttendance = useMemo(() => {
    if (!student) return null
    const records = getStudentAttendance(student.id)
    return records.find((r) => r.date === todayDate)
  }, [student, getStudentAttendance, todayDate])

  const weeklyStats = useMemo(() => {
    if (!student) return { present: 0, total: 0, percentage: 0 }

    const today = new Date()
    const weekAgo = new Date(today)
    weekAgo.setDate(today.getDate() - 7)

    const weekStart = weekAgo.toISOString().split("T")[0]
    const weekEnd = today.toISOString().split("T")[0]

    const records = getStudentAttendance(student.id, weekStart, weekEnd)
    const present = records.filter((r) => r.status === "present").length
    const percentage = records.length > 0 ? Math.round((present / records.length) * 100) : 0

    return { present, total: records.length, percentage }
  }, [student, getStudentAttendance])

  const monthlyStats = useMemo(() => {
    if (!student) return { present: 0, total: 0, percentage: 0 }

    const today = new Date()
    const monthAgo = new Date(today)
    monthAgo.setDate(today.getDate() - 30)

    const monthStart = monthAgo.toISOString().split("T")[0]
    const monthEnd = today.toISOString().split("T")[0]

    const records = getStudentAttendance(student.id, monthStart, monthEnd)
    const present = records.filter((r) => r.status === "present").length
    const percentage = records.length > 0 ? Math.round((present / records.length) * 100) : 0

    return { present, total: records.length, percentage }
  }, [student, getStudentAttendance])

  const chartData = useMemo(() => {
    if (!student) return []

    const today = new Date()
    const daysToShow = selectedPeriod === "week" ? 7 : 30
    const data = []

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const records = getStudentAttendance(student.id)
      const record = records.find((r) => r.date === dateStr)

      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      const dayNum = date.getDate()

      data.push({
        date: dateStr,
        label: selectedPeriod === "week" ? dayName : `${dayNum}`,
        status: record ? (record.status === "present" ? 1 : 0) : -1,
      })
    }

    return data
  }, [student, getStudentAttendance, selectedPeriod])

  const currentStats = selectedPeriod === "week" ? weeklyStats : monthlyStats

  const motivationalMessage = useMemo(() => {
    const percentage = currentStats.percentage

    if (percentage >= 90) return "Excellent attendance! Keep up the great work!"
    if (percentage >= 75) return "Good job! You're doing well!"
    if (percentage >= 50) return "Keep pushing! You can do better!"
    return "Let's improve your attendance together!"
  }, [currentStats])

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Student not found</p>
      </div>
    )
  }

  return (
    <div className="px-5 py-4">
      <div className="space-y-6 pb-24">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
              {student.photo ? (
                <img
                  src={student.photo || "/placeholder.svg"}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                student.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{student.name}</h2>
              <p className="text-white/90">Class: {student.class}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-white/90 font-medium">Today's Status</span>
              {todayAttendance ? (
                <span
                  className={`px-4 py-2 rounded-xl font-semibold ${
                    todayAttendance.status === "present" ? "bg-green-500/30 text-white" : "bg-red-500/30 text-white"
                  }`}
                >
                  {todayAttendance.status === "present" ? "Present" : "Absent"}
                </span>
              ) : (
                <span className="px-4 py-2 rounded-xl font-semibold bg-white/10 text-white/80">Not Marked</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-2 border border-gray-200 dark:border-gray-700 shadow-sm flex gap-2"
        >
          <button
            onClick={() => setSelectedPeriod("week")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              selectedPeriod === "week"
                ? "bg-indigo-500 text-white shadow-md"
                : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            1 Week
          </button>
          <button
            onClick={() => setSelectedPeriod("month")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              selectedPeriod === "month"
                ? "bg-indigo-500 text-white shadow-md"
                : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            1 Month
          </button>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {selectedPeriod === "week" ? "This Week" : "This Month"}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Classes Attended</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentStats.present}/{currentStats.total}
              </span>
            </div>

            {currentStats.total > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {currentStats.percentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentStats.percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full rounded-full ${
                      currentStats.percentage >= 75
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : currentStats.percentage >= 50
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                          : "bg-gradient-to-r from-red-500 to-rose-500"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendance History</h3>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="label"
                  tick={{ fill: "rgb(107, 114, 128)", fontSize: 12 }}
                  axisLine={{ stroke: "rgb(229, 231, 235)" }}
                />
                <YAxis hide domain={[-1, 1]} />
                <Bar dataKey="status" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.status === 1
                          ? "rgb(99, 102, 241)"
                          : entry.status === 0
                            ? "rgb(239, 68, 68)"
                            : "rgb(229, 231, 235)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Not Marked</span>
            </div>
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50">
              <svg
                className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Keep Going!</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{motivationalMessage}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
