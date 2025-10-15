# Attendance Management System

A modern, mobile-first attendance management web application built with Next.js, React, and Tailwind CSS.

## Features

### Admin Panel
- Secure login with username/password
- Dashboard with real-time statistics
- Add, edit, and delete students
- Mark attendance (Present/Absent)
- "Mark All Present" quick action
- Weekly attendance charts
- Export data to CSV and PDF
- Dark mode support

### Student Portal
- Secure student login
- Personal dashboard with profile
- Today's attendance status
- Weekly attendance statistics
- Progress bar visualization
- Motivational messages
- Dark mode support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Storage**: localStorage
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Notifications**: react-hot-toast

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

### Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

**Student Login:**
- Add students through the admin panel first
- Use the username and password you set for each student

## Project Structure

\`\`\`
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── attendance/
│   │   └── reports/
│   ├── student/
│   │   ├── login/
│   │   └── dashboard/
│   └── layout.tsx
├── components/
│   ├── AdminLayout.tsx
│   ├── StudentLayout.tsx
│   ├── ProtectedRoute.tsx
│   ├── StatsCard.tsx
│   ├── StudentCard.tsx
│   ├── StudentForm.tsx
│   ├── AttendanceRow.tsx
│   ├── AttendanceChart.tsx
│   ├── PageTransition.tsx
│   └── LoadingSpinner.tsx
├── context/
│   └── AttendanceContext.tsx
└── lib/
    └── exportUtils.ts
\`\`\`

## Features in Detail

### Data Persistence
All data is stored in localStorage, including:
- Student information
- Attendance records
- User sessions
- Theme preferences

### Dark Mode
- System-wide dark mode toggle
- Persists across sessions
- Smooth transitions
- Optimized color palette

### Animations
- Page transitions with Framer Motion
- Smooth hover effects
- Loading states
- Interactive button feedback
- Staggered list animations

### Export Features
- **CSV Export**: Download attendance records in CSV format
- **PDF Export**: Generate printable reports with charts and statistics

### Mobile-First Design
- Optimized for mobile devices (max-width: 480px)
- Touch-friendly interface
- Floating bottom navigation
- Responsive layouts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
