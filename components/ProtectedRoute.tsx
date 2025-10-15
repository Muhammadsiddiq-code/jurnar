"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAttendance } from "@/context/AttendanceContext"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole: "admin" | "student"
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { currentUser } = useAttendance()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push(requiredRole === "admin" ? "/admin/login" : "/student/login")
    } else if (currentUser.role !== requiredRole) {
      router.push(currentUser.role === "admin" ? "/admin/dashboard" : "/student/dashboard")
    }
  }, [currentUser, requiredRole, router])

  if (!currentUser || currentUser.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
