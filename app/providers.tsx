"use client"

import type React from "react"

import { AttendanceProvider } from "@/context/AttendanceContext"
import { ToastProvider } from "@/components/Toast"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AttendanceProvider>{children}</AttendanceProvider>
    </ToastProvider>
  )
}
