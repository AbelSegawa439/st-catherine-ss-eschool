const roles = [
  { id: "student", label: "Student", hint: "Timetable, homework, grades" },
  { id: "parent", label: "Parent", hint: "Child progress, fees, chat" },
  { id: "teacher", label: "Teacher", hint: "Attendance, assignments, marks" },
  { id: "admin", label: "School", hint: "Notices, users, school data" },
];

export default function App() {
  return (
    <main className="screen">
      <header className="hero">
        <p className="eyebrow">eSchool Manager</p>
        <h1>St. Catherine Secondary School</h1>
        <p className="motto">Sweat for Success</p>
        <p className="place">Nabbingo-Ttega · UNEB · Day &amp; Boarding</p>
      </header>
      <section>
        <h2>Who are you?</h2>
        <div className="roles">
          {roles.map((role) => (
            <button key={role.id} type="button" className="role">
              <strong>{role.label}</strong>
              <span>{role.hint}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}