import { useEffect, useState } from 'react';
import { Button, Input, DataState } from '../components/UI';

const API = 'http://localhost:8000/api/employees';

export default function EmployeePage() {
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ employee_id: '', full_name: '', email: '', department: '' });

  const load = async () => {
    try {
      setLoading(true);
      const r = await fetch(API);
      const data = await r.json();
      setEmps(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteemp=async(id)=>{
    await fetch(
    `http://localhost:8000/api/employees/${id}`,
    { method: "DELETE" }
    );
    load()
  }

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch(API, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(form) 
    });
    setForm({ employee_id: '', full_name: '', email: '', department: '' });
    load();
    setSubmitting(false);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Employee Management</h2>
        <span className="badge">{emps.length} Total Staff</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <section className="card">
          <h3>Register New</h3>
          <form onSubmit={submit}>
            <Input placeholder="E-101" label="Employee ID" value={form.employee_id} onChange={e => setForm({ ...form, employee_id: e.target.value })} required />
            <Input placeholder="John Doe" label="Full Name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required />
            <Input placeholder="john@company.com" label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <Input placeholder="Engineering" label="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} required />
            <Button className='add_button' type="submit" loading={submitting}>Add Employee</Button>
          </form>
        </section>

        <section className="card">
          <h3>Staff Directory</h3>
          <DataState loading={loading} dataLength={emps.length} type="employee">
            <table className="pro-table">
              <thead><tr><th>Name</th><th>ID</th><th>Department</th><th>Action</th></tr></thead>
              <tbody>
                {emps.map(e => (
                  <tr key={e._id}>
                    <td><strong>{e.full_name}</strong><br/><small style={{color:'var(--text-muted)'}}>{e.email}</small></td>
                    <td>{e.employee_id}</td>
                    <td><span className="dept-tag">{e.department}</span></td>
                    <td><button onClick={()=>{deleteemp(e.employee_id)}} className='delete_button'>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataState>
        </section>
      </div>
    </div>
  );
}