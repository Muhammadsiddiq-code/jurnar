// import type React from "react"

// interface StatsCardProps {
//   title: string
//   value: string | number
//   icon: React.ReactNode
//   color: string
// }

// export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
//   return (
//     <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
//       <div className="flex items-start justify-between mb-3">
//         <div className={`p-3 rounded-xl ${color} text-white`}>{icon}</div>
//       </div>
//       <div>
//         <p className="text-sm text-muted mb-1">{title}</p>
//         <p className="text-3xl font-bold text-foreground">{value}</p>
//       </div>
//     </div>
//   )
// }










import type React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl sm:rounded-2xl p-3.5 sm:p-4 lg:p-5 border border-border shadow-sm">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl ${color} text-white`}>{icon}</div>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">{title}</p>
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}
