import { useState } from 'react';
import EmployeePage from './pages/EmployeePage';
import AttendancePage from './pages/AttendancePage';
import './index.css';

function App() {
  const [view, setView] = useState('employees');

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>HR Portal</h1>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className={`nav-btn ${view === 'employees' ? 'active' : ''}`} onClick={() => setView('employees')}>Staff Directory</button>
          <button className={`nav-btn ${view === 'attendance' ? 'active' : ''}`} onClick={() => setView('attendance')}>Attendance Tracking</button>
        </nav>
      </aside>
      
      <main className="main-content">
        {view === 'employees' ? <EmployeePage /> : <AttendancePage />}
      </main>
    </div>
  );
}

export default App;
