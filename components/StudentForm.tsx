"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAttendance } from "@/context/AttendanceContext"

interface StudentFormProps {
  studentId?: string | null
  onClose: () => void
}

export default function StudentForm({ studentId, onClose }: StudentFormProps) {
  const { students, addStudent, updateStudent } = useAttendance()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    class: "",
    photo: "",
  })

  useEffect(() => {
    if (studentId) {
      const student = students.find((s) => s.id === studentId)
      if (student) {
        setFormData({
          name: student.name,
          username: student.username,
          password: student.password,
          class: student.class,
          photo: student.photo,
        })
      }
    }
  }, [studentId, students])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (studentId) {
      updateStudent(studentId, formData)
    } else {
      addStudent(formData)
    }

    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-card rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{studentId ? "Edit Student" : "Add Student"}</h2>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface transition-colors">
          <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-input bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-input bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-input bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Enter password"
            required
          />
        </div>

        <div>
          <label htmlFor="class" className="block text-sm font-medium text-foreground mb-2">
            Class
          </label>
          <input
            id="class"
            name="class"
            type="text"
            value={formData.class}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-input bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="e.g., 10-A"
            required
          />
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-foreground mb-2">
            Photo URL (Optional)
          </label>
          <input
            id="photo"
            name="photo"
            type="url"
            value={formData.photo}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-input bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-surface text-foreground rounded-xl font-semibold hover:bg-muted/20 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            {studentId ? "Update" : "Add"} Student
          </button>
        </div>
      </form>
    </div>
  )
}
