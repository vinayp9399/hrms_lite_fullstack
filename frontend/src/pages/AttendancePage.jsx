import { useEffect, useState } from 'react';
import { Button, Input, DataState } from '../components/UI';

const EMP_API = 'https://hrmslitebackend.vercel.app/api/employees';
const ATT_BASE_API = 'https://hrmslitebackend.vercel.app/api/attendance';

export default function AttendancePage() {
  // --- Global State ---
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Add Form State ---
  const [addForm, setAddForm] = useState({ employee_id: '', name: '', date: new Date().toISOString().split('T')[0], status: 'Present' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Search/History State ---
  const [searchId, setSearchId] = useState('');
  const [history, setHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch initial list of employees for the dropdowns
  useEffect(() => {
    fetch(EMP_API).then(r => r.json()).then(data => {
      setEmployees(data);
      setLoading(false);
    });
  }, []);

  // --- Logic: Add Attendance ---
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!addForm.employee_id) return alert("Please select an employee to add records.");
    
    setIsSubmitting(true);
    try {
      await fetch(ATT_BASE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm)
      });
      alert('Attendance Marked Successfully');
      // If we are currently viewing the history of this person, refresh it
      if (searchId === addForm.employee_id) handleSearch(null, addForm.employee_id);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Logic: Search History ---
  const handleSearch = async (e, forcedId = null) => {
    if (e) e.preventDefault();
    const idToQuery = forcedId || searchId;
    if (!idToQuery) return;

    setIsSearching(true);
    try {
      const res = await fetch(`${ATT_BASE_API}/${idToQuery}`);
      const records = await res.json();
      setHistory(records);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fade-in container">
      <header style={{ marginBottom: '2rem' }}>
        <h1>Attendance Portal</h1>
      </header>

      <div className="grid">
        
        {/* SECTION 1: ADD ATTENDANCE FORM */}
        <section className="card">
          <div className="card-header">
            <h3>Record New Entry</h3>
            <p className="text-muted">Manually mark attendance for a specific day.</p>
          </div>
          
          <form onSubmit={handleAddSubmit}>
            <div className="form-group">
              <label>Employee</label>
              <select 
                className="pro-select"
                onChange={e => {
                  const emp = employees.find(x => x.employee_id === e.target.value);
                  setAddForm({...addForm, employee_id: e.target.value, name: emp?.full_name || ''});
                }}
              >
                <option value="">Select Employee...</option>
                {employees.map(e => <option key={e._id} value={e.employee_id}>{e.full_name}</option>)}
              </select>
            </div>

            <Input 
              type="date" 
              label="Date of Attendance" 
              value={addForm.date} 
              onChange={e => setAddForm({...addForm, date: e.target.value})} 
            />

            <div className="form-group">
              <label>Status</label>
              <div className="radio-tile-group">
                {['Present', 'Absent', 'Late'].map(s => (
                  <label key={s} className="radio-label">
                    <input type="radio" name="status" checked={addForm.status === s} onChange={() => setAddForm({...addForm, status: s})} />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <Button className='add_button' type="submit" loading={isSubmitting} style={{ width: '100%' }}>
              Submit Attendance
            </Button>
          </form>
        </section>

        {/* SECTION 2: SEARCH & VIEW HISTORY */}
        <section className="card">
          <div className="card-header">
            <h3>Search History</h3>
            <p className="text-muted">Lookup previous records by employee ID.</p>
          </div>

          <form onSubmit={handleSearch} className="search-bar">
            <select 
                className="pro-select"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
            >
                <option value="">Select Employee to View...</option>
                {employees.map(e => <option key={e._id} value={e.employee_id}>{e.full_name} ({e.employee_id})</option>)}
            </select>
            <Button className='add_button' type="submit" variant="secondary" loading={isSearching}>View Records</Button>
          </form>

          <div style={{ marginTop: '1.5rem' }}>
          {loading && <></>}
            <DataState loading={isSearching} dataLength={history.length} type="records">
              <table className="pro-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(record => (
                    <tr key={record._id}>
                      <td>{record.date}</td>
                      <td>
                        <span className={`status-pill ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataState>
          </div>
        </section>

      </div>
    </div>
  );
}