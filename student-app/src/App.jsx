import React, { useEffect, useState } from 'react'
import StudentList from './components/StudentList'
import { students as initialStudents } from './data/students'

const STORAGE_KEY = 'students'

export default function App() {
  const [students, setStudents] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : initialStudents
    } catch (e) {
      return initialStudents
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
    } catch (e) {
      // ignore write errors
    }
  }, [students])

  function addStudent(student) {
    const id = student.id || `S${Date.now()}`
    setStudents((s) => [{ ...student, id }, ...s])
  }

  function updateStudent(updated) {
    setStudents((s) => s.map((st) => (st.id === updated.id ? updated : st)))
  }

  function deleteStudent(id) {
    setStudents((s) => s.filter((st) => st.id !== id))
  }

  return (
    <div className="app-container">
      <header>
        <h1>Student Details</h1>
      </header>
      <main>
        <StudentList
          students={students}
          onAdd={addStudent}
          onUpdate={updateStudent}
          onDelete={deleteStudent}
        />
      </main>
    </div>
  )
}
