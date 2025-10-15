import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  writeBatch,
  type Unsubscribe,
} from "firebase/firestore"
import { db, COLLECTIONS } from "./firebase"
import type { Student, AttendanceRecord } from "@/context/AttendanceContext"

// Students CRUD Operations
export const addStudentToFirestore = async (student: Student) => {
  try {
    await setDoc(doc(db, COLLECTIONS.STUDENTS, student.id), student)
    return true
  } catch (error) {
    console.error("[v0] Error adding student:", error)
    return false
  }
}

export const updateStudentInFirestore = async (id: string, data: Partial<Student>) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.STUDENTS, id), data)
    return true
  } catch (error) {
    console.error("[v0] Error updating student:", error)
    return false
  }
}

export const deleteStudentFromFirestore = async (id: string) => {
  try {
    // Delete student
    await deleteDoc(doc(db, COLLECTIONS.STUDENTS, id))

    // Delete all attendance records for this student
    const attendanceQuery = query(collection(db, COLLECTIONS.ATTENDANCE), where("studentId", "==", id))
    const attendanceSnapshot = await getDocs(attendanceQuery)

    const batch = writeBatch(db)
    attendanceSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })
    await batch.commit()

    return true
  } catch (error) {
    console.error("[v0] Error deleting student:", error)
    return false
  }
}

export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.STUDENTS))
    return querySnapshot.docs.map((doc) => doc.data() as Student)
  } catch (error) {
    console.error("[v0] Error getting students:", error)
    return []
  }
}

// Real-time listener for students
export const subscribeToStudents = (callback: (students: Student[]) => void): Unsubscribe => {
  return onSnapshot(collection(db, COLLECTIONS.STUDENTS), (snapshot) => {
    const students = snapshot.docs.map((doc) => doc.data() as Student)
    callback(students)
  })
}

// Attendance CRUD Operations
export const markAttendanceInFirestore = async (record: AttendanceRecord) => {
  try {
    const recordId = `${record.studentId}_${record.date}`
    await setDoc(doc(db, COLLECTIONS.ATTENDANCE, recordId), record)
    return true
  } catch (error) {
    console.error("[v0] Error marking attendance:", error)
    return false
  }
}

export const markAllPresentInFirestore = async (students: Student[], date: string) => {
  try {
    const batch = writeBatch(db)

    students.forEach((student) => {
      const recordId = `${student.id}_${date}`
      const record: AttendanceRecord = {
        studentId: student.id,
        date,
        status: "present",
        timestamp: Date.now(),
      }
      batch.set(doc(db, COLLECTIONS.ATTENDANCE, recordId), record)
    })

    await batch.commit()
    return true
  } catch (error) {
    console.error("[v0] Error marking all present:", error)
    return false
  }
}

export const getAllAttendance = async (): Promise<AttendanceRecord[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.ATTENDANCE))
    return querySnapshot.docs.map((doc) => doc.data() as AttendanceRecord)
  } catch (error) {
    console.error("[v0] Error getting attendance:", error)
    return []
  }
}

// Real-time listener for attendance
export const subscribeToAttendance = (callback: (attendance: AttendanceRecord[]) => void): Unsubscribe => {
  return onSnapshot(collection(db, COLLECTIONS.ATTENDANCE), (snapshot) => {
    const attendance = snapshot.docs.map((doc) => doc.data() as AttendanceRecord)
    callback(attendance)
  })
}

// Cleanup old attendance records (older than 12 hours)
export const cleanupOldAttendanceInFirestore = async () => {
  try {
    const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.ATTENDANCE))

    const batch = writeBatch(db)
    let deletedCount = 0

    querySnapshot.docs.forEach((doc) => {
      const record = doc.data() as AttendanceRecord
      if (record.timestamp < twelveHoursAgo) {
        batch.delete(doc.ref)
        deletedCount++
      }
    })

    if (deletedCount > 0) {
      await batch.commit()
      console.log(`[v0] Cleaned up ${deletedCount} old attendance records`)
    }

    return true
  } catch (error) {
    console.error("[v0] Error cleaning up old attendance:", error)
    return false
  }
}
