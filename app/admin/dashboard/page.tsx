// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { useAttendance } from "@/context/AttendanceContext"
// import ProtectedRoute from "@/components/ProtectedRoute"
// import AdminLayout from "@/components/AdminLayout"
// import StatsCard from "@/components/StatsCard"
// import PageTransition from "@/components/PageTransition"

// export default function AdminDashboardPage() {
//   return (
//     <ProtectedRoute requiredRole="admin">
//       <AdminLayout>
//         <PageTransition>
//           <DashboardContent />
//         </PageTransition>
//       </AdminLayout>
//     </ProtectedRoute>
//   )
// }

// function DashboardContent() {
//   const { students, getAttendanceStats } = useAttendance()
//   const [selectedDate] = useState(new Date().toISOString().split("T")[0])

//   const stats = getAttendanceStats(selectedDate)

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
//         <p className="text-muted">Overview of today's attendance</p>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
//         >
//           <StatsCard
//             title="Total Students"
//             value={stats.total}
//             icon={
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                 />
//               </svg>
//             }
//             color="bg-gradient-to-br from-blue-500 to-blue-600"
//           />
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//         >
//           <StatsCard
//             title="Present"
//             value={stats.present}
//             icon={
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             }
//             color="bg-gradient-to-br from-green-500 to-green-600"
//           />
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//         >
//           <StatsCard
//             title="Absent"
//             value={stats.absent}
//             icon={
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             }
//             color="bg-gradient-to-br from-red-500 to-red-600"
//           />
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
//         >
//           <StatsCard
//             title="Attendance"
//             value={`${stats.percentage}%`}
//             icon={
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                 />
//               </svg>
//             }
//             color="bg-gradient-to-br from-purple-500 to-purple-600"
//           />
//         </motion.div>
//       </div>

//       {students.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="bg-card rounded-2xl p-8 text-center border border-border"
//         >
//           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
//             <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//               />
//             </svg>
//           </div>
//           <h3 className="text-xl font-semibold text-foreground mb-2">No Students Yet</h3>
//           <p className="text-muted mb-4">Add your first student to get started</p>
//         </motion.div>
//       )}
//     </div>
//   )
// }























"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAttendance } from "@/context/AttendanceContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import AdminLayout from "@/components/AdminLayout"
import StatsCard from "@/components/StatsCard"
import PageTransition from "@/components/PageTransition"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <PageTransition>
          <DashboardContent />
        </PageTransition>
      </AdminLayout>
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { students, getAttendanceStats } = useAttendance()
  const [selectedDate] = useState(new Date().toISOString().split("T")[0])

  const stats = getAttendanceStats(selectedDate)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 sm:py-6">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Overview of today's attendance</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <StatsCard
              title="Total Students"
              value={stats.total}
              icon={
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
              color="bg-gradient-to-br from-green-500 to-green-600"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <StatsCard
              title="Present"
              value={stats.present}
              icon={
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              }
              color="bg-gradient-to-br from-emerald-500 to-emerald-600"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <StatsCard
              title="Absent"
              value={stats.absent}
              icon={
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
              color="bg-gradient-to-br from-red-500 to-red-600"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <StatsCard
              title="Attendance"
              value={`${stats.percentage}%`}
              icon={
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
              color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            />
          </motion.div>
        </div>

        {students.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-border shadow-sm"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No Students Yet</h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-4">Add your first student to get started</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
