"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartData {
  date: string
  day: string
  present: number
  absent: number
  total: number
}

interface AttendanceChartProps {
  data: ChartData[]
}

export default function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="day" stroke="var(--color-muted)" style={{ fontSize: "12px" }} />
          <YAxis stroke="var(--color-muted)" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              color: "var(--color-foreground)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", color: "var(--color-foreground)" }} />
          <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} name="Present" />
          <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} name="Absent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
