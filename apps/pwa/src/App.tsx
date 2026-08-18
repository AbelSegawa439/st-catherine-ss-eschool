import { useEffect, useState } from "react";

type Role = "parent" | "school";
type Screen =
  | "splash" | "welcome" | "login" | "home" | "school"
  | "notices" | "calendar" | "chat"
  | "timetable" | "assignments" | "results" | "syllabus"
  | "attendance" | "fees" | "leave" | "profile"
  | "gallery" | "clubs" | "bus" | "canteen"
  | "library" | "clinic" | "suggest" | "lang";

type Item = { title: string; meta: string };

type Store = {
  about: string;
  phone: string;
  email: string;
  notices: Item[];
  calendar: Item[];
  chat: Item[];
  timetable: Item[];
  assignments: Item[];
  results: Item[];
  syllabus: Item[];
  attendance: string;
  fees: Item[];
  leave: Item[];
  profile: string;
  gallery: Item[];
  clubs: Item[];
  bus: string;
  canteen: Item[];
  library: Item[];
  clinic: Item[];
  suggest: Item[];
};

const seed: Store = {
  about:
    "St. Catherine Secondary School, Nabbingo is a private, Catholic-founded day and boarding school in Nabbingo-Ttega, Wakiso. UNEB O-Level and A-Level. Motto: Sweat for Success.",
  phone: "+256 752 672 864",
  email: "Esscanattega97@gmail.com",
  notices: [
    { title: "Term II in session", meta: "25 May – 21 Aug 2026" },
    { title: "Fee reminder", meta: "Pay before mid-term" },
  ],
  calendar: [
    { title: "Term II ends", meta: "21 Aug 2026" },
    { title: "Term III starts", meta: "14 Sep 2026" },
  ],
  chat: [{ title: "Admin", meta: "Welcome to St. Catherine SS messaging." }],
  timetable: [
    { title: "08:00 English", meta: "S3 East" },
    { title: "09:20 Mathematics", meta: "S3 East" },
    { title: "11:00 Biology", meta: "Lab 1" },
    { title: "14:00 Physics", meta: "Lab 2" },
  ],
  assignments: [
    { title: "Maths Exercise 4", meta: "Due Friday" },
    { title: "Biology CBC project", meta: "Due next week" },
  ],
  results: [{ title: "Term I report", meta: "UCE A–E competency grades" }],
  syllabus: [{ title: "S1–S2 compulsory subjects", meta: "NCDC lower secondary" }],
  attendance: "Present 18 · Late 1 · Absent 2. Parents get SMS if absent or late.",
  fees: [
    { title: "Tuition", meta: "Contact school / term" },
    { title: "Uniforms", meta: "Full set" },
    { title: "Admission", meta: "One-time" },
  ],
  leave: [{ title: "No pending leave", meta: "Parents can apply here" }],
  profile: "Learner ID (LIN) · class · stream · day/boarding · emergency contact.",
  gallery: [{ title: "Sports day", meta: "Photos coming after the event" }],
  clubs: [
    { title: "Music & Arts", meta: "Wed 15:20" },
    { title: "Science club", meta: "Thu 15:20" },
  ],
  bus: "Kampala–Masaka route. Live GPS and ETA will show on this screen.",
  canteen: [{ title: "Today", meta: "Posho, beans, greens · pre-order by 9:00" }],
  library: [{ title: "Issue / return", meta: "Due dates appear here" }],
  clinic: [{ title: "Health room", meta: "Medicine given is logged here" }],
  suggest: [{ title: "Suggestion box", meta: "Anonymous. Admin can reply." }],
};

const KEY = "stc-store-v1";

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...seed, ...JSON.parse(raw) } : seed;
  } catch {
    return seed;
  }
}

function save(data: Store) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState<Role>("parent");
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<Store>(load);
  const [lang, setLang] = useState<"en" | "lg">("en");
  const admin = role === "school" && authed;

  useEffect(() => {
    const t = setTimeout(() => setScreen("welcome"), 1600);
    return () => clearTimeout(t);
  }, []);

  function update(next: Store) {
    setData(next);
    save(next);
  }

  function login() {
    if (user.trim().toLowerCase() === "cath" && pass === "1234") {
      setAuthed(true);
      setRole("school");
      setScreen("home");
      setError("");
    } else {
      setError("Wrong school username or password.");
    }
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
        <p className="lead">To give you the best experience, tell us who you are:</p>
        <button className="btn primary" onClick={() => setScreen("login")}>
          Join as a School
        </button>
        <button
          className="btn ghost"
          onClick={() => {
            setRole("parent");
            setAuthed(false);
            setScreen("home");
          }}
        >
          I am a Parent
        </button>
      </main>
    );
  }

  if (screen === "login") {
    return (
      <main className="screen">
        <button className="back" onClick={() => setScreen("welcome")}>Back</button>
        <h1>School login</h1>
        <input placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} />
        <input placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        {error && <p className="err">{error}</p>}
        <button className="btn primary" onClick={login}>Sign in</button>
      </main>
    );
  }

  return (
    <div className="app">
      <header className="top">
        <img src="./1.png" alt="" />
        <div>
          <strong>St. Catherine SS</strong>
          <span>{admin ? "Admin · can edit all" : "Parent portal"}</span>
        </div>
        <button className="link" onClick={() => setScreen("welcome")}>Out</button>
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
              <Tile title="Notices" onClick={() => setScreen("notices")} />
              <Tile title="Calendar" onClick={() => setScreen("calendar")} />
              <Tile title="Chat" onClick={() => setScreen("chat")} />
              <Tile title="Timetable" onClick={() => setScreen("timetable")} />
              <Tile title="Homework" onClick={() => setScreen("assignments")} />
              <Tile title="Results" onClick={() => setScreen("results")} />
              <Tile title="Syllabus" onClick={() => setScreen("syllabus")} />
              <Tile title="Attendance" onClick={() => setScreen("attendance")} />
              <Tile title="Fees" onClick={() => setScreen("fees")} />
              <Tile title="Leave" onClick={() => setScreen("leave")} />
              <Tile title="ID / Profile" onClick={() => setScreen("profile")} />
              <Tile title="Gallery" onClick={() => setScreen("gallery")} />
              <Tile title="Clubs" onClick={() => setScreen("clubs")} />
              <Tile title="Bus" onClick={() => setScreen("bus")} />
              <Tile title="Canteen" onClick={() => setScreen("canteen")} />
              <Tile title="Library" onClick={() => setScreen("library")} />
              <Tile title="Clinic" onClick={() => setScreen("clinic")} />
              <Tile title="Suggestions" onClick={() => setScreen("suggest")} />
              <Tile title="Language" onClick={() => setScreen("lang")} />
            </div>
          </>
        )}

        {screen === "school" && (
          <section>
            <Back go={() => setScreen("home")} />
            <img className="cover" src="./1.png" alt="" />
            <h2>St. Catherine Secondary School</h2>
            {admin ? (
              <>
                <textarea value={data.about} onChange={(e) => update({ ...data, about: e.target.value })} />
                <input value={data.phone} onChange={(e) => update({ ...data, phone: e.target.value })} />
                <input value={data.email} onChange={(e) => update({ ...data, email: e.target.value })} />
              </>
            ) : (
              <>
                <p>{data.about}</p>
                <p>{data.phone}</p>
                <p>{data.email}</p>
              </>
            )}
          </section>
        )}

        <ListScreen screen={screen} id="notices" title="Announcements" items={data.notices} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, notices: items })} />
        <ListScreen screen={screen} id="calendar" title="Calendar" items={data.calendar} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, calendar: items })} />
        <ListScreen screen={screen} id="chat" title="Messaging" items={data.chat} admin={admin} parentCanAdd onBack={() => setScreen("home")} onSave={(items) => update({ ...data, chat: items })} />
        <ListScreen screen={screen} id="timetable" title="Timetable" items={data.timetable} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, timetable: items })} />
        <ListScreen screen={screen} id="assignments" title="Assignments" items={data.assignments} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, assignments: items })} />
        <ListScreen screen={screen} id="results" title="Grades & reports" items={data.results} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, results: items })} />
        <ListScreen screen={screen} id="syllabus" title="Syllabus & materials" items={data.syllabus} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, syllabus: items })} />
        <ListScreen screen={screen} id="fees" title="Fees & payments" items={data.fees} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, fees: items })} />
        <ListScreen screen={screen} id="leave" title="Leave requests" items={data.leave} admin={admin} parentCanAdd onBack={() => setScreen("home")} onSave={(items) => update({ ...data, leave: items })} />
        <ListScreen screen={screen} id="gallery" title="Events gallery" items={data.gallery} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, gallery: items })} />
        <ListScreen screen={screen} id="clubs" title="Clubs & activities" items={data.clubs} admin={admin} parentCanAdd onBack={() => setScreen("home")} onSave={(items) => update({ ...data, clubs: items })} />
        <ListScreen screen={screen} id="canteen" title="Canteen menu" items={data.canteen} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, canteen: items })} />
        <ListScreen screen={screen} id="library" title="Library" items={data.library} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, library: items })} />
        <ListScreen screen={screen} id="clinic" title="Health room" items={data.clinic} admin={admin} onBack={() => setScreen("home")} onSave={(items) => update({ ...data, clinic: items })} />
        <ListScreen screen={screen} id="suggest" title="Suggestion box" items={data.suggest} admin={admin} parentCanAdd onBack={() => setScreen("home")} onSave={(items) => update({ ...data, suggest: items })} />

        {screen === "attendance" && (
          <TextScreen title="Attendance" value={data.attendance} admin={admin} onBack={() => setScreen("home")} onSave={(v) => update({ ...data, attendance: v })} />
        )}
        {screen === "profile" && (
          <TextScreen title="Student ID / profile" value={data.profile} admin={admin} onBack={() => setScreen("home")} onSave={(v) => update({ ...data, profile: v })} />
        )}
        {screen === "bus" && (
          <TextScreen title="Bus tracking" value={data.bus} admin={admin} onBack={() => setScreen("home")} onSave={(v) => update({ ...data, bus: v })} />
        )}
        {screen === "lang" && (
          <section>
            <Back go={() => setScreen("home")} />
            <h2>Language</h2>
            <button className="btn primary" onClick={() => setLang("en")}>English</button>
            <button className="btn ghost" onClick={() => setLang("lg")}>Luganda</button>
            <p>{lang === "lg" ? "Olulimi: Luganda" : "Language: English"}</p>
          </section>
        )}
      </main>
    </div>
  );
}

function Tile({ title, onClick }: { title: string; onClick: () => void }) {
  return <button className="tile" onClick={onClick}>{title}</button>;
}
function Back({ go }: { go: () => void }) {
  return <button className="back" onClick={go}>Back</button>;
}

function ListScreen({
  screen, id, title, items, admin, parentCanAdd, onBack, onSave,
}: {
  screen: Screen; id: Screen; title: string; items: Item[];
  admin: boolean; parentCanAdd?: boolean; onBack: () => void;
  onSave: (items: Item[]) => void;
}) {
  const [t, setT] = useState("");
  const [m, setM] = useState("");
  if (screen !== id) return null;
  const canAdd = admin || parentCanAdd;
  return (
    <section>
      <Back go={onBack} />
      <h2>{title}</h2>
      {items.map((item, i) => (
        <div className="row" key={`\( {item.title}- \){i}`}>
          <b>{item.title}</b>
          <span>{item.meta}</span>
          {admin && (
            <button className="link" onClick={() => onSave(items.filter((_, x) => x !== i))}>Remove</button>
          )}
        </div>
      ))}
      {canAdd && (
        <>
          <input placeholder="Title" value={t} onChange={(e) => setT(e.target.value)} />
          <input placeholder="Details" value={m} onChange={(e) => setM(e.target.value)} />
          <button
            className="btn primary"
            onClick={() => {
              if (!t.trim()) return;
              onSave([{ title: t.trim(), meta: m.trim() }, ...items]);
              setT("");
              setM("");
            }}
          >
            Post
          </button>
        </>
      )}
    </section>
  );
}

function TextScreen({
  title, value, admin, onBack, onSave,
}: {
  title: string; value: string; admin: boolean;
  onBack: () => void; onSave: (v: string) => void;
}) {
  return (
    <section>
      <Back go={onBack} />
      <h2>{title}</h2>
      {admin ? <textarea value={value} onChange={(e) => onSave(e.target.value)} /> : <p>{value}</p>}
    </section>
  );
}