// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import { useAttendance } from "@/context/AttendanceContext"

// export default function AdminLoginPage() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()
//   const { login } = useAttendance()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     setTimeout(() => {
//       const success = login(username, password, "admin")
//       if (success) {
//         router.push("/admin/dashboard")
//       }
//       setIsLoading(false)
//     }, 500)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <div className="bg-card dark:bg-card rounded-3xl shadow-2xl p-8">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
//               <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                 />
//               </svg>
//             </div>
//             <h1 className="text-3xl font-bold text-card-foreground mb-2">Admin Login</h1>
//             <p className="text-muted-foreground">Manage attendance and students</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-card-foreground mb-2">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-5 py-4 rounded-xl border-2 border-input bg-surface text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
//                 placeholder="Enter your username"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-5 py-4 rounded-xl border-2 border-input bg-surface text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-4 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold text-base hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <button
//               onClick={() => router.push("/student/login")}
//               className="text-sm text-muted-foreground hover:text-primary transition-colors"
//             >
//               Student Login
//             </button>
//           </div>

//           <div className="mt-6 p-4 bg-surface rounded-xl border border-border">
//             <p className="text-xs text-muted-foreground text-center">
//               Demo credentials: <br />
//               <span className="font-semibold text-card-foreground">admin / admin123</span>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }
























"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAttendance } from "@/context/AttendanceContext"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAttendance()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      const success = login(username, password, "admin")
      if (success) {
        router.push("/admin/dashboard")
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-border/50">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
              <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">Admin Login</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage attendance and students</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-card-foreground mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-input bg-surface text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-card-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-input bg-surface text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-4 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold text-base hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/student/login")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Student Login →
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <p className="text-xs text-muted-foreground text-center">
              Demo credentials: <br />
              <span className="font-semibold text-card-foreground">admin / admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
