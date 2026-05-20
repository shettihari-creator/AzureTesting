import React, { useEffect, useState } from 'react'

export default function StudentForm({ initial, onCancel, onSave }) {
  const init = initial || {}
  const [form, setForm] = useState({
    id: init.id || '',
    name: init.name || '',
    address: init.address || '',
    className: init.className || ''
  })

  useEffect(() => {
    const src = initial || {}
    setForm({
      id: src.id || '',
      name: src.name || '',
      address: src.address || '',
      className: src.className || ''
    })
    // only resync when the specific student object (id) changes
  }, [initial?.id])

  const [error, setError] = useState('')

  function change(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (name === 'name' && value.trim()) setError('')
  }

  function submit(e) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Name is required')
      return
    }
    setError('')
    onSave({ ...form, name: form.name.trim() })
  }

  return (
    <form className="student-form" onSubmit={submit}>
      <label>
        ID
        <input type="text" name="id" value={form.id} onChange={change} placeholder="optional or auto" onMouseDown={(e)=>e.stopPropagation()} />
      </label>
      <label>
        Name
        <input type="text" name="name" value={form.name} onChange={change} required onMouseDown={(e)=>e.stopPropagation()} />
        {error && <div className="error">{error}</div>}
      </label>
      <label>
        Address
        <input type="text" name="address" value={form.address} onChange={change} onMouseDown={(e)=>e.stopPropagation()} />
      </label>
      <label>
        Class
        <input type="text" name="className" value={form.className} onChange={change} onMouseDown={(e)=>e.stopPropagation()} />
      </label>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
