import type { Student, AttendanceRecord } from "@/context/AttendanceContext"
import toast from "react-hot-toast"

export function exportToCSV(students: Student[], attendance: AttendanceRecord[]) {
  try {
    // Create CSV header
    let csv = "Student Name,Username,Class,Date,Status\n"

    // Add data rows
    attendance.forEach((record) => {
      const student = students.find((s) => s.id === record.studentId)
      if (student) {
        csv += `${student.name},${student.username},${student.class},${record.date},${record.status}\n`
      }
    })

    // Create blob and download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `attendance_report_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("CSV exported successfully!")
  } catch (error) {
    toast.error("Failed to export CSV")
    console.error(error)
  }
}

export function exportToPDF(
  students: Student[],
  attendance: AttendanceRecord[],
  weeklyData: Array<{ date: string; day: string; present: number; absent: number; total: number }>,
) {
  try {
    // Create a simple HTML report
    const reportDate = new Date().toLocaleDateString()

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Attendance Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 {
            color: #4f46e5;
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 10px;
          }
          h2 {
            color: #0891b2;
            margin-top: 30px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #4f46e5;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          .stats {
            display: flex;
            gap: 20px;
            margin: 20px 0;
          }
          .stat-card {
            flex: 1;
            padding: 20px;
            background: #f1f5f9;
            border-radius: 8px;
            text-align: center;
          }
          .stat-value {
            font-size: 32px;
            font-weight: bold;
            color: #4f46e5;
          }
          .stat-label {
            color: #64748b;
            margin-top: 5px;
          }
        </style>
      </head>
      <body>
        <h1>Attendance Report</h1>
        <p><strong>Generated on:</strong> ${reportDate}</p>
        
        <h2>Weekly Overview</h2>
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">${students.length}</div>
            <div class="stat-label">Total Students</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${attendance.filter((a) => a.status === "present").length}</div>
            <div class="stat-label">Total Present</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${attendance.filter((a) => a.status === "absent").length}</div>
            <div class="stat-label">Total Absent</div>
          </div>
        </div>

        <h2>Weekly Attendance Chart</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Total Students</th>
            </tr>
          </thead>
          <tbody>
            ${weeklyData
              .map(
                (day) => `
              <tr>
                <td>${day.day}</td>
                <td>${day.date}</td>
                <td style="color: #10b981; font-weight: bold;">${day.present}</td>
                <td style="color: #ef4444; font-weight: bold;">${day.absent}</td>
                <td>${day.total}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>

        <h2>Detailed Attendance Records</h2>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${attendance
              .map((record) => {
                const student = students.find((s) => s.id === record.studentId)
                if (!student) return ""
                return `
                <tr>
                  <td>${student.name}</td>
                  <td>${student.class}</td>
                  <td>${record.date}</td>
                  <td style="color: ${record.status === "present" ? "#10b981" : "#ef4444"}; font-weight: bold;">
                    ${record.status.toUpperCase()}
                  </td>
                </tr>
              `
              })
              .join("")}
          </tbody>
        </table>
      </body>
      </html>
    `

    // Open in new window for printing
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(html)
      printWindow.document.close()
      printWindow.focus()

      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print()
        toast.success("PDF export ready! Use Print dialog to save as PDF")
      }, 500)
    }
  } catch (error) {
    toast.error("Failed to export PDF")
    console.error(error)
  }
}
