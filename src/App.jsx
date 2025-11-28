import React, { useReducer, useState, useEffect } from "react";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Ananya Reddy", status: "Not Marked" },
  { id: 2, name: "Rahul Verma", status: "Not Marked" },
  { id: 3, name: "Meera Nair", status: "Not Marked" },
  { id: 4, name: "Sai Kiran", status: "Not Marked" },
  { id: 5, name: "John Paul", status: "Not Marked" },
  { id: 6, name: "Lakshmi Priya", status: "Not Marked" },
];

function attendanceReducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map((s) =>
        s.id === action.id ? { ...s, status: "Present" } : s
      );
    case "MARK_ABSENT":
      return state.map((s) =>
        s.id === action.id ? { ...s, status: "Absent" } : s
      );
    case "RESET":
      return initialStudents.map((s) => ({ ...s, status: "Not Marked" }));
    default:
      return state;
  }
}

export default function App() {
  const [students, dispatch] = useReducer(attendanceReducer, initialStudents);

  // Live clock state
  const [timeString, setTimeString] = useState(() =>
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const t = setInterval(() => {
      setTimeString(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const totalPresent = students.filter((s) => s.status === "Present").length;
  const totalAbsent = students.filter((s) => s.status === "Absent").length;

  return (
    <div className="app">
      <div className="attendance-card">
        <header className="header">
          <div>
            <h1>Smart Classroom Attendance</h1>
            <p>Click a button to mark each student Present or Absent.</p>
          </div>

          {/* present time / live clock */}
          <div className="clock" aria-live="polite" style={{ marginRight: 12 }}>
            {timeString}
          </div>

          <button
            className="reset-btn"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset All
          </button>
        </header>

        <div className="summary-row">
          <div className="chip total">
            <span className="chip-label">Total Students</span>
            <span className="chip-value">{students.length}</span>
          </div>
          <div className="chip present-chip">
            <span className="chip-label">Present</span>
            <span className="chip-value">{totalPresent}</span>
          </div>
          <div className="chip absent-chip">
            <span className="chip-label">Absent</span>
            <span className="chip-value">{totalAbsent}</span>
          </div>
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td
                  className={
                    "status-cell " + s.status.toLowerCase().replace(" ", "-")
                  }
                >
                  {s.status}
                </td>
                <td>
                  <button
                    className="present-btn"
                    onClick={() =>
                      dispatch({ type: "MARK_PRESENT", id: s.id })
                    }
                  >
                    Present
                  </button>
                  <button
                    className="absent-btn"
                    onClick={() =>
                      dispatch({ type: "MARK_ABSENT", id: s.id })
                    }
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className="footer">
          <span>Final attendance is shown in the table above.</span>
        </footer>
      </div>
    </div>
  );
}
