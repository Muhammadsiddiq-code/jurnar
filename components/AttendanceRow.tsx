// "use client"

// import { motion } from "framer-motion"
// import { useAttendance } from "@/context/AttendanceContext"
// import type { Student } from "@/context/AttendanceContext"

// interface AttendanceRowProps {
//   student: Student
//   date: string
//   status?: "present" | "absent"
// }

// export default function AttendanceRow({ student, date, status }: AttendanceRowProps) {
//   const { markAttendance } = useAttendance()

//   const handleMarkPresent = () => {
//     markAttendance(student.id, date, "present")
//   }

//   const handleMarkAbsent = () => {
//     markAttendance(student.id, date, "absent")
//   }

//   return (
//     <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
//       <div className="flex items-center gap-4">
//         <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
//           {student.photo ? (
//             <img src={student.photo || "/placeholder.svg"} alt={student.name} className="w-full h-full object-cover" />
//           ) : (
//             student.name.charAt(0).toUpperCase()
//           )}
//         </div>

//         <div className="flex-1 min-w-0">
//           <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
//           <p className="text-sm text-muted truncate">Class: {student.class}</p>
//         </div>

//         <div className="flex gap-2">
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={handleMarkPresent}
//             className={`p-3 rounded-xl transition-all ${
//               status === "present"
//                 ? "bg-green-500 text-white shadow-lg"
//                 : "bg-surface text-muted hover:bg-green-500/10 hover:text-green-500"
//             }`}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </motion.button>

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={handleMarkAbsent}
//             className={`p-3 rounded-xl transition-all ${
//               status === "absent"
//                 ? "bg-red-500 text-white shadow-lg"
//                 : "bg-surface text-muted hover:bg-red-500/10 hover:text-red-500"
//             }`}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   )
// }
























"use client"

import { motion } from "framer-motion"
import { useAttendance } from "@/context/AttendanceContext"
import type { Student } from "@/context/AttendanceContext"

interface AttendanceRowProps {
  student: Student
  date: string
  status?: "present" | "absent"
}

export default function AttendanceRow({ student, date, status }: AttendanceRowProps) {
  const { markAttendance } = useAttendance()

  const handleMarkPresent = () => {
    markAttendance(student.id, date, "present")
  }

  const handleMarkAbsent = () => {
    markAttendance(student.id, date, "absent")
  }

  return (
    <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0 overflow-hidden">
          {student.photo ? (
            <img src={student.photo || "/placeholder.svg"} alt={student.name} className="w-full h-full object-cover" />
          ) : (
            student.name.charAt(0).toUpperCase()
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate text-sm sm:text-base">{student.name}</h3>
          <p className="text-xs sm:text-sm text-muted truncate">Class: {student.class}</p>
        </div>

        <div className="flex gap-1.5 sm:gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleMarkPresent}
            className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl transition-all ${
              status === "present"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-surface text-muted hover:bg-green-500/10 hover:text-green-500"
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleMarkAbsent}
            className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl transition-all ${
              status === "absent"
                ? "bg-red-500 text-white shadow-lg"
                : "bg-surface text-muted hover:bg-red-500/10 hover:text-red-500"
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
