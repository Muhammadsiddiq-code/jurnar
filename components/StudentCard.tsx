"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAttendance } from "@/context/AttendanceContext"
import type { Student } from "@/context/AttendanceContext"

interface StudentCardProps {
  student: Student
  onEdit: (studentId: string) => void
}

export default function StudentCard({ student, onEdit }: StudentCardProps) {
  const { deleteStudent } = useAttendance()
  const [showMenu, setShowMenu] = useState(false)

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      deleteStudent(student.id)
    }
  }

  return (
    <div className="bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl flex-shrink-0 overflow-hidden">
          {student.photo ? (
            <img src={student.photo || "/placeholder.svg"} alt={student.name} className="w-full h-full object-cover" />
          ) : (
            student.name.charAt(0).toUpperCase()
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
          <p className="text-sm text-muted truncate">@{student.username}</p>
          <p className="text-xs text-muted mt-1">Class: {student.class}</p>
        </div>

        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-xl hover:bg-surface transition-colors">
            <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-full mt-2 w-40 bg-card rounded-xl shadow-lg border border-border overflow-hidden z-20"
              >
                <button
                  onClick={() => {
                    onEdit(student.id)
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-surface transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete()
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
