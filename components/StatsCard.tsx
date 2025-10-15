import type React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-xl ${color} text-white`}>{icon}</div>
      </div>
      <div>
        <p className="text-sm text-muted mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}
