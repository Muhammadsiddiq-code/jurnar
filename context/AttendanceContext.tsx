"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/Toast"
import {
  addStudentToFirestore,
  updateStudentInFirestore,
  deleteStudentFromFirestore,
  subscribeToStudents,
  markAttendanceInFirestore,
  markAllPresentInFirestore,
  subscribeToAttendance,
  cleanupOldAttendanceInFirestore,
} from "@/lib/firestoreUtils"

export interface Student {
  id: string
  name: string
  username: string
  password: string
  class: string
  photo: string
  createdAt: string
}

export interface AttendanceRecord {
  studentId: string
  date: string
  status: "present" | "absent"
  timestamp: number
}

interface User {
  role: "admin" | "student"
  username: string
  studentId?: string
}

interface AttendanceContextType {
  students: Student[]
  attendance: AttendanceRecord[]
  currentUser: User | null
  theme: "light" | "dark"
  addStudent: (student: Omit<Student, "id" | "createdAt">) => Promise<void>
  updateStudent: (id: string, student: Partial<Student>) => Promise<void>
  deleteStudent: (id: string) => Promise<void>
  markAttendance: (studentId: string, date: string, status: "present" | "absent") => Promise<void>
  markAllPresent: (date: string) => Promise<void>
  login: (username: string, password: string, role: "admin" | "student") => boolean
  logout: () => void
  toggleTheme: () => void
  getStudentAttendance: (studentId: string, startDate?: string, endDate?: string) => AttendanceRecord[]
  getAttendanceStats: (date?: string) => { total: number; present: number; absent: number; percentage: number }
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined)

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123"

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    // Load session data from localStorage (theme and currentUser are session-specific)
    const savedUser = localStorage.getItem("currentUser")
    const savedTheme = localStorage.getItem("theme")

    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    if (savedTheme) setTheme(savedTheme as "light" | "dark")

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    }

    // Subscribe to Firestore collections for real-time updates
    const unsubscribeStudents = subscribeToStudents((studentsData) => {
      setStudents(studentsData)
      setIsLoading(false)
    })

    const unsubscribeAttendance = subscribeToAttendance((attendanceData) => {
      setAttendance(attendanceData)
    })

    // Cleanup old attendance records on mount
    cleanupOldAttendanceInFirestore()

    // Set up interval to cleanup old records every hour
    const cleanupInterval = setInterval(
      () => {
        cleanupOldAttendanceInFirestore()
      },
      60 * 60 * 1000,
    )

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeStudents()
      unsubscribeAttendance()
      clearInterval(cleanupInterval)
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  const addStudent = async (student: Omit<Student, "id" | "createdAt">) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    const success = await addStudentToFirestore(newStudent)
    if (success) {
      showToast("Student added successfully!", "success")
    } else {
      showToast("Failed to add student!", "error")
    }
  }

  const updateStudent = async (id: string, updatedData: Partial<Student>) => {
    const success = await updateStudentInFirestore(id, updatedData)
    if (success) {
      showToast("Student updated successfully!", "success")
    } else {
      showToast("Failed to update student!", "error")
    }
  }

  const deleteStudent = async (id: string) => {
    const success = await deleteStudentFromFirestore(id)
    if (success) {
      showToast("Student deleted successfully!", "success")
    } else {
      showToast("Failed to delete student!", "error")
    }
  }

  const markAttendance = async (studentId: string, date: string, status: "present" | "absent") => {
    const record: AttendanceRecord = {
      studentId,
      date,
      status,
      timestamp: Date.now(),
    }

    const success = await markAttendanceInFirestore(record)
    if (success) {
      showToast(`Marked as ${status}`, "success")
    } else {
      showToast("Failed to mark attendance!", "error")
    }
  }

  const markAllPresent = async (date: string) => {
    const success = await markAllPresentInFirestore(students, date)
    if (success) {
      showToast("All students marked present!", "success")
    } else {
      showToast("Failed to mark all present!", "error")
    }
  }

  const login = (username: string, password: string, role: "admin" | "student"): boolean => {
    if (role === "admin") {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setCurrentUser({ role: "admin", username })
        showToast("Welcome, Admin!", "success")
        return true
      }
    } else {
      const student = students.find((s) => s.username === username && s.password === password)
      if (student) {
        setCurrentUser({ role: "student", username, studentId: student.id })
        showToast(`Welcome, ${student.name}!`, "success")
        return true
      }
    }
    showToast("Invalid credentials!", "error")
    return false
  }

  const logout = () => {
    setCurrentUser(null)
    showToast("Logged out successfully!", "success")
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const getStudentAttendance = (studentId: string, startDate?: string, endDate?: string) => {
    return attendance.filter((a) => {
      if (a.studentId !== studentId) return false
      if (startDate && a.date < startDate) return false
      if (endDate && a.date > endDate) return false
      return true
    })
  }

  const getAttendanceStats = (date?: string) => {
    const targetDate = date || new Date().toISOString().split("T")[0]
    const todayRecords = attendance.filter((a) => a.date === targetDate)

    const total = students.length
    const present = todayRecords.filter((a) => a.status === "present").length
    const absent = todayRecords.filter((a) => a.status === "absent").length
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0

    return { total, present, absent, percentage }
  }

  return (
    <AttendanceContext.Provider
      value={{
        students,
        attendance,
        currentUser,
        theme,
        addStudent,
        updateStudent,
        deleteStudent,
        markAttendance,
        markAllPresent,
        login,
        logout,
        toggleTheme,
        getStudentAttendance,
        getAttendanceStats,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  )
}

export function useAttendance() {
  const context = useContext(AttendanceContext)
  if (context === undefined) {
    throw new Error("useAttendance must be used within an AttendanceProvider")
  }
  return context
}
