import React, { useState } from 'react'
import StudentForm from './StudentForm'

function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="student-card">
      <div className="card-row"><strong>ID:</strong> {student.id}</div>
      <div className="card-row"><strong>Name:</strong> {student.name}</div>
      <div className="card-row"><strong>Address:</strong> {student.address}</div>
      <div className="card-row"><strong>Class:</strong> {student.className}</div>
      <div className="card-actions">
        <button onClick={() => onEdit(student)}>Edit</button>
        <button
          className="btn-danger"
          onClick={() => {
            if (window.confirm(`Delete ${student.name}?`)) onDelete(student.id)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default function StudentList({ students, onAdd, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  if (!students) return <div>Loading...</div>

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <h2>Students ({students.length})</h2>
        <div>
          <button onClick={() => { setShowAdd((s)=>!s); setEditing(null); }}>
            {showAdd ? 'Close' : 'Add Student'}
          </button>
        </div>
      </div>

      {showAdd && (
        <StudentForm
          onCancel={() => setShowAdd(false)}
          onSave={(stu) => { onAdd(stu); setShowAdd(false); }}
        />
      )}

      {editing && (
        <div style={{marginTop:12}}>
          <h3>Edit Student</h3>
          <StudentForm
            initial={editing}
            onCancel={() => setEditing(null)}
            onSave={(stu) => { onUpdate(stu); setEditing(null); }}
          />
        </div>
      )}

      <div style={{overflowX:'auto'}}>
        <table className="student-table">
          <thead>
            <tr>
              <th style={{width:120}}>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th style={{width:120}}>Class</th>
              <th style={{width:160}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="mono">{s.id}</td>
                <td>{s.name}</td>
                <td>{s.address}</td>
                <td>{s.className}</td>
                <td>
                  <button onClick={() => setEditing(s)}>Edit</button>
                  <button className="btn-danger" onClick={() => { if (window.confirm(`Delete ${s.name}?`)) onDelete(s.id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
