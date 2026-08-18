import { useEffect, useState } from "react";

type Role = "parent" | "school";
type Screen =
  | "splash"
  | "welcome"
  | "home"
  | "school"
  | "notices"
  | "timetable"
  | "attendance"
  | "assignments"
  | "results"
  | "fees"
  | "chat"
  | "more";

const facilities = [
  "Science Labs",
  "Computer Lab",
  "Library",
  "Cafeteria",
  "School Transport",
  "School Clinic",
  "Music & Arts",
];

const notices = [
  { title: "Term II in session", meta: "25 May – 21 Aug 2026" },
  { title: "UNEB candidate briefing", meta: "S4 and S6 · Friday 8:00am" },
  { title: "Fee reminder", meta: "Balance due before mid-term" },
];

const days = [
  { time: "08:00", subject: "English", room: "S3 East" },
  { time: "09:20", subject: "Mathematics", room: "S3 East" },
  { time: "10:40", subject: "Break", room: "—" },
  { time: "11:00", subject: "Biology", room: "Lab 1" },
  { time: "12:20", subject: "History & PE", room: "S3 East" },
  { time: "14:00", subject: "Physics", room: "Lab 2" },
  { time: "15:20", subject: "Games / Clubs", room: "Field" },
];

const moreItems = [
  "Leave requests",
  "Student ID / profile",
  "Events gallery",
  "Clubs & activities",
  "Bus tracking",
  "Canteen menu",
  "Library",
  "Health room",
  "Suggestion box",
  "Luganda / English",
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState<Role>("parent");

  useEffect(() => {
    const t = setTimeout(() => setScreen("welcome"), 1800);
    return () => clearTimeout(t);
  }, []);

  function enter(next: Role) {
    setRole(next);
    setScreen("home");
  }

  if (screen === "splash") {
    return (
      <main className="splash">
        <img src="./1.png" alt="St. Catherine SS" />
        <h1>St. Catherine SS</h1>
        <p>Sweat for Success</p>
      </main>
    );
  }

  if (screen === "welcome") {
    return (
      <main className="screen">
        <img className="logo" src="./1.png" alt="" />
        <p className="eyebrow">eSchool Manager</p>
        <h1>Welcome</h1>
        <p className="lead">
          To give you the best experience, tell us who you are:
        </p>
        <button className="btn primary" onClick={() => enter("school")}>
          Join as a School
        </button>
        <button className="btn ghost" onClick={() => enter("parent")}>
          I am a Parent
        </button>
      </main>
    );
  }

  return (
    <div className="app">
      <header className="top">
        <img src="./1.png" alt="" />
        <div>
          <strong>St. Catherine SS</strong>
          <span>{role === "parent" ? "Parent portal" : "School portal"}</span>
        </div>
      </header>

      <main className="body">
        {screen === "home" && (
          <>
            <section className="banner" onClick={() => setScreen("school")}>
              <p className="tag">2026 Intake · Admissions Open</p>
              <h2>St. Catherine Secondary School</h2>
              <p>Nabbingo-Ttega · UNEB · Mixed · Day & Boarding</p>
            </section>
            <div className="grid">
              <Tile onClick={() => setScreen("notices")} title="Notices" />
              <Tile onClick={() => setScreen("timetable")} title="Timetable" />
              <Tile onClick={() => setScreen("attendance")} title="Attendance" />
              <Tile onClick={() => setScreen("assignments")} title="Homework" />
              <Tile onClick={() => setScreen("results")} title="Results" />
              <Tile onClick={() => setScreen("fees")} title="Fees" />
              <Tile onClick={() => setScreen("chat")} title="Chat" />
              <Tile onClick={() => setScreen("more")} title="More" />
            </div>
          </>
        )}

        {screen === "school" && (
          <article className="card">
            <button className="back" onClick={() => setScreen("home")}>Back</button>
            <img className="cover" src="./1.png" alt="" />
            <h2>St. Catherine Secondary School</h2>
            <p>9 miles from Kampala along the Kampala–Masaka highway</p>
            <p>Secondary · Private · Catholic founded · UNEB</p>
            <p>Ttega, Nabbingo Ward, Kyengera Town Council, Wakiso</p>
            <h3>About</h3>
            <p>
              St. Catherine Secondary School, Nabbingo is a private, Catholic-founded
              day and boarding school in Nabbingo-Ttega, Wakiso. It offers a
              comprehensive Ugandan curriculum for O-Level and A-Level. Motto:
              Sweat for Success.
            </p>
            <h3>Facilities</h3>
            <ul>{facilities.map((f) => <li key={f}>{f}</li>)}</ul>
            <p>+256 752 672 864</p>
            <p>Esscanattega97@gmail.com</p>
          </article>
        )}

        {screen === "notices" && (
          <List title="Announcements" items={notices} onBack={() => setScreen("home")} />
        )}

        {screen === "timetable" && (
          <section>
            <button className="back" onClick={() => setScreen("home")}>Back</button>
            <h2>Today’s timetable</h2>
            {days.map((d) => (
              <div className="row" key={d.time}>
                <b>{d.time}</b>
                <span>{d.subject}</span>
                <em>{d.room}</em>
              </div>
            ))}
          </section>
        )}

        {screen === "attendance" && (
          <section>
            <button className="back" onClick={() => setScreen("home")}>Back</button>
            <h2>Attendance</h2>
            <p>Present 18 · Late 1 · Absent 2</p>
            <p>Parents are notified by SMS when a learner is absent or late.</p>
          </section>
        )}

        {screen === "assignments" && (
          <List
            title="Assignments"
            items={[
              { title: "Mathematics exercise 4", meta: "Due Fri" },
              { title: "Biology project (CBC)", meta: "Due next week" },
            ]}
            onBack={() => setScreen("home")}
          />
        )}

        {screen === "results" && (
          <section>
            <button className="back" onClick={() => setScreen("home")}>Back</button>
            <h2>Results</h2>
            <p>UCE grades: A Exceptional · B Outstanding · C Satisfactory · D Basic · E Elementary</p>
            <p>Term reports will appear here as PDF.</p>
          </section>
        )}

        {screen === "fees" && (
          <section>
            <button className="back" onClick={() => setScreen("home")}>Back</button>
            <h2>Fees</h2>
            <p>2026 intake · Contact school for tuition / term.</p>
            <p>Includes admission (one-time), tuition, uniforms.</p>
            <p>Pay on Mobile Money. Receipts stay in this screen.</p>
          </section>
        )}

        {screen === "chat" && (
          <section>
            <button className="back" onClick={() => setScreen("home")}>Back</button>
            <h2>Messaging</h2>
            <p>Teachers ↔ parents ↔ admin. Direct chat for PTMs.</p>
          </section>
        )}

        {screen === "more" && (
          <section>
            <button className="back" onClick={() => setScreen("home")}>Back</button>
            <h2>More</h2>
            {moreItems.map((item) => (
              <div className="row" key={item}>{item}</div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function Tile({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button className="tile" onClick={onClick}>
      {title}
    </button>
  );
}

function List({
  title,
  items,
  onBack,
}: {
  title: string;
  items: { title: string; meta: string }[];
  onBack: () => void;
}) {
  return (
    <section>
      <button className="back" onClick={onBack}>Back</button>
      <h2>{title}</h2>
      {items.map((item) => (
        <div className="row" key={item.title}>
          <b>{item.title}</b>
          <span>{item.meta}</span>
        </div>
      ))}
    </section>
  );
   }
