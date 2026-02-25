// ── IMPORTS: Add or remove icons here as needed ─────────────────────────────
import { useState, useMemo } from "react";
import { LayoutDashboard, Users, GraduationCap, Calendar, Image, BarChart2, Download, Sun, Moon, CheckCircle, XCircle, Trash2, ArrowDownToLine, Eye, Clock } from "lucide-react";

// ── STAFF DATA: Edit staff names, emails, departments here ───────────────────
const initialStaff = [
  { id: 1, name: "Dr. Sarah Williams", email: "sarah.w@aloysius.edu", department: "Technology", events: 5, status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Prof. Michael Chen", email: "m.chen@aloysius.edu", department: "Sports", events: 3, status: "Active", joined: "2024-02-20" },
  { id: 3, name: "Ms. Priya Sharma", email: "priya.s@aloysius.edu", department: "Cultural", events: 4, status: "Pending", joined: "2024-03-10" },
  { id: 4, name: "Mr. David Roy", email: "d.roy@aloysius.edu", department: "Academic", events: 2, status: "Active", joined: "2024-04-05" },
  { id: 5, name: "Dr. Anitha Nair", email: "a.nair@aloysius.edu", department: "Technology", events: 4, status: "Pending", joined: "2024-05-18" },
  { id: 6, name: "Prof. Rajan Menon", email: "r.menon@aloysius.edu", department: "Sports", events: 3, status: "Active", joined: "2024-06-01" },
  { id: 7, name: "Ms. Deepa Kurian", email: "d.kurian@aloysius.edu", department: "Cultural", events: 2, status: "Active", joined: "2024-07-10" },
];

// ── STUDENT DATA: Edit student names, reg numbers here ───────────────────────
const initialStudents = [
  { id: 1,  name: "Alex Johnson",   regNo: "CS2021045", email: "alex.j@student.edu",    uploads: 34, status: "Whitelisted", lastActive: "2h ago" },
  { id: 2,  name: "Riya Menon",     regNo: "CS2022012", email: "riya.m@student.edu",    uploads: 12, status: "Normal",      lastActive: "5h ago" },
  { id: 3,  name: "Arjun Patel",    regNo: "EC2021089", email: "arjun.p@student.edu",   uploads: 56, status: "Whitelisted", lastActive: "1d ago" },
  { id: 4,  name: "Sneha Rao",      regNo: "ME2023034", email: "sneha.r@student.edu",   uploads: 0,  status: "Suspended",   lastActive: "3d ago" },
  { id: 5,  name: "Kiran Das",      regNo: "CS2022078", email: "kiran.d@student.edu",   uploads: 8,  status: "Normal",      lastActive: "30m ago" },
  { id: 6,  name: "Amal Jose",      regNo: "CS2023001", email: "amal.j@student.edu",    uploads: 22, status: "Whitelisted", lastActive: "1h ago" },
  { id: 7,  name: "Fathima Zahra",  regNo: "EC2022055", email: "fathima.z@student.edu", uploads: 5,  status: "Normal",      lastActive: "4h ago" },
  { id: 8,  name: "Rohit Nair",     regNo: "ME2021010", email: "rohit.n@student.edu",   uploads: 41, status: "Whitelisted", lastActive: "2d ago" },
  { id: 9,  name: "Nisha Thomas",   regNo: "CS2023045", email: "nisha.t@student.edu",   uploads: 15, status: "Normal",      lastActive: "6h ago" },
  { id: 10, name: "Vivek Sharma",   regNo: "EC2021034", email: "vivek.s@student.edu",   uploads: 28, status: "Whitelisted", lastActive: "3h ago" },
];

// ── EVENTS DATA: Edit event names, coordinators, dates here ──────────────────
const initialEvents = [
  { id: 1, name: "Tech Fest 2024",        coordinator: "Dr. Sarah Williams",  photos: 45,  date: "2024-12-15", deadline: "2024-12-20", category: "Technology", status: "Active" },
  { id: 2, name: "Annual Sports Day",     coordinator: "Prof. Michael Chen",  photos: 128, date: "2024-11-20", deadline: "2024-11-25", category: "Sports",     status: "Active" },
  { id: 3, name: "Cultural Evening",      coordinator: "Ms. Priya Sharma",    photos: 89,  date: "2024-10-30", deadline: "2024-11-05", category: "Cultural",   status: "Closed" },
  { id: 4, name: "Graduation Ceremony",   coordinator: "Mr. David Roy",       photos: 234, date: "2024-09-15", deadline: "2024-09-20", category: "Academic",   status: "Closed" },
  { id: 5, name: "Science Exhibition",    coordinator: "Dr. Anitha Nair",     photos: 67,  date: "2024-08-10", deadline: "2024-08-15", category: "Technology", status: "Closed" },
  { id: 6, name: "Basketball Tournament", coordinator: "Prof. Rajan Menon",   photos: 92,  date: "2024-07-20", deadline: "2024-07-25", category: "Sports",     status: "Closed" },
];

// ── PENDING PHOTOS: Photos waiting for admin approval ────────────────────────
const initialPendingPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: ["Sports Action Shot","Crowd Panorama","Award Ceremony","Group Photo","Stage Performance","Lab Session","Field Event","Closing Ceremony","Opening Speech","Trophy Moment","Dance Performance","Science Exhibit"][i],
  uploader: ["Arjun Patel","Alex Johnson","Kiran Das","Amal Jose","Riya Menon","Rohit Nair","Fathima Zahra","Arjun Patel","Alex Johnson","Kiran Das","Amal Jose","Rohit Nair"][i],
  regNo: ["EC2021089","CS2021045","CS2022078","CS2023001","CS2022012","ME2021010","EC2022055","EC2021089","CS2021045","CS2022078","CS2023001","ME2021010"][i],
  event: ["Annual Sports Day","Tech Fest 2024","Graduation Ceremony","Cultural Evening","Tech Fest 2024","Annual Sports Day","Cultural Evening","Graduation Ceremony","Tech Fest 2024","Annual Sports Day","Cultural Evening","Tech Fest 2024"][i],
  time: ["10 min ago","45 min ago","1h ago","2h ago","3h ago","4h ago","5h ago","6h ago","7h ago","8h ago","9h ago","10h ago"][i],
  image: [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=300&fit=crop",
  ][i],
}));

// ── INITIAL STATS: Starting dashboard numbers ─────────────────────────────────
const initialStats = {
  totalPhotos:    initialPendingPhotos.length,
  pendingPhotos:  initialPendingPhotos.length,
  totalEvents:    initialEvents.length,
  pendingStaff:   initialStaff.filter(s => s.status === "Pending").length,
  totalStudents:  initialStudents.length,
  totalStaff:     initialStaff.length,
  approvedPhotos: 0,
  rejectedPhotos: 0,
  totalDownloads: 0,
  totalViews:     0,
};

// ── LINE CHART: Used in analytics. Edit data/labels/color per chart ───────────
function LineChart({ data, labels, color = "#3b82f6" }) {
  const width = 400, height = 120, pad = 20;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = pad + ((max - v) / range) * (height - pad * 2);
    return `${x},${y}`;
  });
  const areaPoints = [`${pad},${height - pad}`, ...points, `${pad + (width - pad * 2)},${height - pad}`].join(" ");
  const gid = `g${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "140px" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gid})`} />
      <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {points.map((p, i) => { const [x, y] = p.split(","); return <circle key={i} cx={x} cy={y} r="3" fill={color} />; })}
      {labels.map((l, i) => { const x = pad + (i / (labels.length - 1)) * (width - pad * 2); return <text key={i} x={x} y={height} textAnchor="middle" fontSize="9" fill="#64748b">{l}</text>; })}
    </svg>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(initialStats);
  const [staff, setStaff] = useState(initialStaff);
  const [students, setStudents] = useState(initialStudents);
  const [events, setEvents] = useState(initialEvents);
  const [pendingPhotos, setPendingPhotos] = useState(initialPendingPhotos);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [downloadedPhotos, setDownloadedPhotos] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const [staffSearch, setStaffSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [eventSearch, setEventSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [showTheme, setShowTheme] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const isDark = theme === "dark";

  // ── COLOR PALETTE ─────────────────────────────────────────────────────────
  // ── CHANGE: To restyle the entire dashboard, edit colors here ────────────
  const c = {
    bg:         isDark ? "linear-gradient(160deg,#060d1a 0%,#0a1628 50%,#060d1a": "#f0f4f8",
    sidebar:    isDark ? "#080f1e"               : "#ffffff",
    card:       isDark ? "rgba(10,18,35,0.95)"   : "#ffffff",
    border:     isDark ? "rgba(255,255,255,0.07)": "#e2e8f0",
    text:       isDark ? "#e8f0fc"               : "#0f172a",
    sub:        isDark ? "#4a6080"               : "#64748b",
    inputBg:    isDark ? "#0d1830"               : "#f1f5f9",
    barBg:      isDark ? "#0d1830"               : "#e2e8f0",
    // ── CHANGE: Primary blue accent ──────────────────────────────────────
    accent:     "#1e4fa8",
    accentHi:   "#2d6fd4",
    // ── CHANGE: Badge/highlight background opacity ────────────────────────
    accentSoft: isDark ? "rgba(30,79,168,0.15)"  : "rgba(30,79,168,0.08)",
    white:      "#ffffff",
  };

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const confirmDelete = () => {
    const { type, id, name } = deleteModal;
    if (type === "staff")   { setStaff(p => p.filter(s => s.id !== id));   setStats(p => ({ ...p, totalStaff: p.totalStaff - 1 })); }
    if (type === "student") { setStudents(p => p.filter(s => s.id !== id)); setStats(p => ({ ...p, totalStudents: p.totalStudents - 1 })); }
    if (type === "event")   { setEvents(p => p.filter(e => e.id !== id));   setStats(p => ({ ...p, totalEvents: p.totalEvents - 1 })); }
    if (type === "photo")   { setPendingPhotos(p => p.filter(ph => ph.id !== id)); setStats(p => ({ ...p, totalPhotos: p.totalPhotos - 1, pendingPhotos: p.pendingPhotos - 1, rejectedPhotos: p.rejectedPhotos + 1 })); }
    notify(`${name} deleted.`, "error");
    setDeleteModal(null);
  };

  const approveStaff  = (id) => { setStaff(p => p.map(s => s.id === id ? { ...s, status: "Active" } : s)); setStats(p => ({ ...p, pendingStaff: p.pendingStaff - 1 })); notify("Staff approved!"); };
  const approvePhoto  = (id) => { setPendingPhotos(p => p.filter(ph => ph.id !== id)); setStats(p => ({ ...p, pendingPhotos: p.pendingPhotos - 1, approvedPhotos: p.approvedPhotos + 1 })); notify("Photo approved!"); };
  const rejectPhoto   = (id) => { setPendingPhotos(p => p.filter(ph => ph.id !== id)); setStats(p => ({ ...p, pendingPhotos: p.pendingPhotos - 1, rejectedPhotos: p.rejectedPhotos + 1, totalPhotos: p.totalPhotos - 1 })); notify("Photo rejected.", "error"); };
  const bulkApprove   = () => { setPendingPhotos(p => p.filter(ph => !selectedPhotos.includes(ph.id))); setStats(p => ({ ...p, pendingPhotos: p.pendingPhotos - selectedPhotos.length, approvedPhotos: p.approvedPhotos + selectedPhotos.length })); notify(`${selectedPhotos.length} approved!`); setSelectedPhotos([]); };
  const bulkReject    = () => { setPendingPhotos(p => p.filter(ph => !selectedPhotos.includes(ph.id))); setStats(p => ({ ...p, pendingPhotos: p.pendingPhotos - selectedPhotos.length, rejectedPhotos: p.rejectedPhotos + selectedPhotos.length, totalPhotos: p.totalPhotos - selectedPhotos.length })); notify(`${selectedPhotos.length} rejected.`, "error"); setSelectedPhotos([]); };
  const toggleSelect  = (id) => setSelectedPhotos(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const downloadPhoto = (p)  => { setDownloadedPhotos(prev => [...prev, p]); setStats(prev => ({ ...prev, totalDownloads: prev.totalDownloads + 1 })); notify(`"${p.title}" downloaded!`); };

  const filteredStaff    = useMemo(() => staff.filter(s => s.name.toLowerCase().includes(staffSearch.toLowerCase()) || s.email.toLowerCase().includes(staffSearch.toLowerCase())), [staff, staffSearch]);
  const filteredStudents = useMemo(() => studentSearch.length >= 2 ? students.filter(s => s.regNo.toLowerCase().includes(studentSearch.toLowerCase())) : students.slice(0, 50), [students, studentSearch]);
  const filteredEvents   = useMemo(() => events.filter(e => e.name.toLowerCase().includes(eventSearch.toLowerCase())), [events, eventSearch]);

  // ── SIDEBAR TABS ──────────────────────────────────────────────────────────
  // ── CHANGE: Add/remove/rename tabs here. icon uses lucide-react icons ────
  const tabs = [
    { id: "overview",  label: "Overview",     sub: "System Snapshot",   icon: <LayoutDashboard size={17} /> },
    { id: "staff",     label: "Staff",        sub: "Coordinators",      icon: <Users size={17} />,       count: staff.filter(s => s.status === "Pending").length },
    { id: "students",  label: "Students",     sub: "Student Records",   icon: <GraduationCap size={17} /> },
    { id: "events",    label: "Events",       sub: "All Events",        icon: <Calendar size={17} /> },
    { id: "photos",    label: "Photo Review", sub: "Pending Approvals", icon: <Image size={17} />,       count: pendingPhotos.length },
    { id: "analytics", label: "Analytics",    sub: "Stats & Insights",  icon: <BarChart2 size={17} /> },
    { id: "downloads", label: "Downloads",    sub: "Admin Downloads",   icon: <Download size={17} /> },
  ];

  // ── SHARED CARD STYLE ─────────────────────────────────────────────────────
  // ── CHANGE: Card borderRadius, padding, shadow ───────────────────────────
  const cardStyle = {
    background: c.card,
    borderRadius: "14px",
    border: `1px solid ${c.border}`,
    padding: "1.5rem",
    marginBottom: "1.25rem",
    boxShadow: isDark ? "0 4px 30px rgba(0,0,0,0.5)" : "0 2px 12px rgba(0,0,0,0.06)",
  };

  // ── TABLE HEADER STYLE ────────────────────────────────────────────────────
  // ── CHANGE: Table header font size, padding ──────────────────────────────
  const thStyle = {
    textAlign: "left",
    padding: "0.6rem 1rem",
    fontSize: "0.68rem",
    fontWeight: 700,
    color: c.sub,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    borderBottom: `1px solid ${c.border}`,
    background: isDark ? "rgba(255,255,255,0.02)" : "#fafbfc",
  };

  // ── TABLE CELL STYLE ─────────────────────────────────────────────────────
  // ── CHANGE: Table cell font size, padding ────────────────────────────────
  const tdStyle = {
    padding: "0.85rem 1rem",
    fontSize: "0.83rem",
    borderBottom: `1px solid ${c.border}`,
    color: c.text,
  };

  // ── ACTION BUTTON STYLES ─────────────────────────────────────────────────
  // ── CHANGE: Button colors — edit approve/reject/remove/download here ─────
  const btn = (variant) => {
    const map = {
      approve:  { bg: "rgba(30,79,168,0.12)", bc: "rgba(30,79,168,0.35)", col: isDark ? "#6ea8fe" : "#1e4fa8" },
      reject:   { bg: "rgba(255,255,255,0.05)", bc: "rgba(255,255,255,0.15)", col: isDark ? "#94a3b8" : "#64748b" },
      remove:   { bg: "rgba(255,255,255,0.04)", bc: "rgba(255,255,255,0.1)",  col: isDark ? "#64748b" : "#94a3b8" },
      download: { bg: "rgba(30,79,168,0.1)",   bc: "rgba(30,79,168,0.3)",   col: isDark ? "#93c5fd" : "#1e4fa8" },
    };
    const s = map[variant] || map.remove;
    return { background: s.bg, border: `1px solid ${s.bc}`, color: s.col, borderRadius: "7px", padding: "0.3rem 0.75rem", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px", transition: "all 0.2s", fontFamily: "inherit" };
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh", background: isDark ? "linear-gradient(160deg, #060d1a 0%, #0d1f3c 50%, #060d1a 100%)" : "#f0f4f8",
      // ── CHANGE: Main font — change 'DM Sans' to any Google font ──────────
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      color: c.text, transition: "all 0.3s",
    }}>

      {/* ══ SIDEBAR ════════════════════════════════════════════════════════════ */}
      <aside style={{
        // ── CHANGE: Sidebar width — change 240px wider/narrower ──────────────
        width: "240px",
        minHeight: "100vh", background: c.sidebar, borderRight: `1px solid ${c.border}`,
        display: "flex", flexDirection: "column", padding: "1.5rem 0",
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
      }}>

        {/* ── LOGO SECTION ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0 1.25rem 1.25rem", borderBottom: `1px solid ${c.border}`, marginBottom: "0.75rem" }}>
          {/* ── CHANGE: Logo — replace src path here ──────────────────────── */}
          <img src="/clickaloysius-logo.png" alt="Logo" style={{ width: "36px", height: "36px", borderRadius: "10px", objectFit: "cover" }} />
          <div>
            {/* ── CHANGE: App name ──────────────────────────────────────────── */}
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: c.text, letterSpacing: "-0.3px" }}>Click Aloysius</div>
            {/* ── CHANGE: Portal subtitle ───────────────────────────────────── */}
            <div style={{ fontSize: "0.58rem", color: c.accentHi, letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase" }}>Admin Portal</div>
          </div>
        </div>

        {/* ── NAV BUTTONS: Auto-rendered from tabs array above ─────────────── */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", padding: "0 0.65rem" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.7rem",
                padding: "0.65rem 0.85rem", borderRadius: "10px",
                background: activeTab === tab.id ? c.accentSoft : "transparent",
                border: "none",
                // ── CHANGE: Active tab left border color ──────────────────────
                borderLeft: activeTab === tab.id ? `2px solid ${c.accentHi}` : "2px solid transparent",
                cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"; }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.background = "transparent"; }}
            >
              {/* ── CHANGE: Tab icon box — change borderRadius, size ─────────── */}
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: activeTab === tab.id ? "rgba(30,79,168,0.3)" : isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9",
                display: "flex", alignItems: "center", justifyContent: "center",
                // ── CHANGE: Active icon color ──────────────────────────────────
                color: activeTab === tab.id ? "#93c5fd" : c.sub, flexShrink: 0,
              }}>
                {tab.icon}
              </div>
              <div style={{ flex: 1 }}>
                {/* ── CHANGE: Tab label font size — change 0.82rem ─────────────── */}
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: activeTab === tab.id ? "#93c5fd" : c.text }}>{tab.label}</div>
                <div style={{ fontSize: "0.67rem", color: c.sub, marginTop: "1px" }}>{tab.sub}</div>
              </div>
              {/* ── CHANGE: Badge background color ───────────────────────────── */}
              {tab.count > 0 && <span style={{ background: c.accent, color: "#fff", fontSize: "0.65rem", borderRadius: "9999px", padding: "1px 6px", fontWeight: 700 }}>{tab.count}</span>}
            </button>
          ))}
        </nav>

        {/* ── ADMIN PROFILE SECTION ────────────────────────────────────────── */}
        <div style={{ padding: "1rem 1.25rem 0", borderTop: `1px solid ${c.border}`, marginTop: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            {/* ── CHANGE: Admin avatar — replace with <img> for real photo ──── */}
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #1e4fa8, #0d2d6b)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "0.9rem", flexShrink: 0 }}>A</div>
            <div>
              {/* ── CHANGE: Admin display name ────────────────────────────────── */}
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: c.text }}>Admin</div>
              {/* ── CHANGE: Admin email ───────────────────────────────────────── */}
              <div style={{ fontSize: "0.67rem", color: c.sub }}>admin@aloysius.edu</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ══ MAIN CONTENT ═══════════════════════════════════════════════════════ */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* ── TOP HEADER ───────────────────────────────────────────────────── */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          // ── CHANGE: Header padding — change 1rem 2rem ─────────────────────
          padding: "1rem 2rem",
          background: c.sidebar, borderBottom: `1px solid ${c.border}`,
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div>
            {/* ── CHANGE: Header title font size — change 1.15rem ──────────── */}
            <h1 style={{ fontSize: "1.15rem", fontWeight: 700, color: c.text, margin: 0, letterSpacing: "-0.3px" }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <p style={{ fontSize: "0.72rem", color: c.sub, margin: "2px 0 0" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          {/* ── APPEARANCE TOGGLE: Dark / Light mode ─────────────────────── */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowTheme(!showTheme)} style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9", border: `1px solid ${c.border}`, borderRadius: "9px", padding: "0.45rem 0.9rem", color: c.text, cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "inherit" }}>
              {isDark ? <Moon size={15} /> : <Sun size={15} />} Appearance
            </button>
            {showTheme && (
              <div style={{ position: "absolute", top: "110%", right: 0, background: c.card, border: `1px solid ${c.border}`, borderRadius: "11px", padding: "0.4rem", zIndex: 50, minWidth: "150px", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
                {["dark", "light"].map(mode => (
                  <button key={mode} onClick={() => { setTheme(mode); setShowTheme(false); }}
                    style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: "100%", padding: "0.55rem 0.7rem", borderRadius: "7px", border: "none", cursor: "pointer", background: theme === mode ? c.accentSoft : "transparent", color: theme === mode ? (isDark ? "#93c5fd" : "#1e4fa8") : c.text, fontSize: "0.82rem", fontWeight: 600, fontFamily: "inherit" }}>
                    {mode === "dark" ? <Moon size={13} /> : <Sun size={13} />}
                    {mode === "dark" ? "Dark Mode" : "Light Mode"}
                    {theme === mode && <span style={{ marginLeft: "auto", fontSize: "0.75rem" }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <div style={{ padding: "1.75rem 2rem", flex: 1, overflowY: "auto" }}>

          {/* ══ OVERVIEW TAB ═══════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div>
              {/* ── OVERVIEW STAT CARDS ───────────────────────────────────────── */}
              {/* ── CHANGE: Card min width — change 160px to resize cards ───────── */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
                {[
                  // ── CHANGE: Overview cards — edit label, icon, tab here ──────
                  { label: "Total Photos",    value: stats.totalPhotos,    tab: "photos",    icon: <Image size={18} /> },
                  { label: "Pending Review",  value: stats.pendingPhotos,  tab: "photos",    icon: <Clock size={18} /> },
                  { label: "Total Events",    value: stats.totalEvents,    tab: "events",    icon: <Calendar size={18} /> },
                  { label: "Pending Staff",   value: staff.filter(x => x.status === "Pending").length, tab: "staff", icon: <Users size={18} /> },
                  { label: "Total Students",  value: stats.totalStudents,  tab: "students",  icon: <GraduationCap size={18} /> },
                  { label: "Total Downloads", value: stats.totalDownloads, tab: "downloads", icon: <Download size={18} /> },
                ].map((st, i) => (
                  <div key={i} onClick={() => setActiveTab(st.tab)}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = c.accentHi; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(30,79,168,0.25)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    style={{ borderRadius: "14px", padding: "1.2rem 1rem", border: `1px solid ${c.border}`, background: c.card, cursor: "pointer", transition: "all 0.25s", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {/* ── CHANGE: Overview card icon color ─────────────────────── */}
                    <div style={{ color: c.sub, marginBottom: "2px" }}>{st.icon}</div>
                    {/* ── CHANGE: Stat number font size — change 1.8rem ──────────── */}
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: c.text, letterSpacing: "-1px", lineHeight: 1 }}>{st.value}</div>
                    <div style={{ fontSize: "0.74rem", color: c.sub, fontWeight: 500 }}>{st.label}</div>
                    <div style={{ fontSize: "0.68rem", color: c.accentHi, marginTop: "2px" }}>View →</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {/* ── PHOTO STATISTICS CARD ──────────────────────────────────── */}
                <div style={cardStyle}>
                  <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: "0 0 1.25rem" }}>Photo Statistics</h3>
                  {[
                    { label: "Approved", value: stats.approvedPhotos },
                    { label: "Pending",  value: stats.pendingPhotos  },
                    { label: "Rejected", value: stats.rejectedPhotos },
                  ].map((st, i) => (
                    <div key={i} style={{ marginBottom: "1.1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "6px" }}>
                        <span style={{ color: c.text, fontWeight: 500 }}>{st.label}</span>
                        <span style={{ color: c.sub, fontWeight: 600 }}>{st.value}</span>
                      </div>
                      <div style={{ background: c.barBg, borderRadius: "6px", height: "6px", overflow: "hidden" }}>
                        {/* ── CHANGE: Progress bar gradient colors ───────────────── */}
                        <div style={{ background: `linear-gradient(90deg, #1e4fa8, #2d6fd4)`, height: "100%", borderRadius: "6px", width: `${Math.max((st.value / (stats.totalPhotos || 1)) * 100, 2)}%`, transition: "width 0.6s ease" }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", paddingTop: "1rem", borderTop: `1px solid ${c.border}` }}>
                    {[
                      { label: "Total",    value: stats.totalPhotos },
                      { label: "Approved", value: stats.approvedPhotos },
                      { label: "Rejected", value: stats.rejectedPhotos },
                    ].map((s, i) => (
                      <div key={i} style={{ flex: 1, textAlign: "center", padding: "0.6rem", background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", borderRadius: "8px", border: `1px solid ${c.border}` }}>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: c.text }}>{s.value}</div>
                        <div style={{ fontSize: "0.65rem", color: c.sub, marginTop: "2px" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── QUICK ACTIONS CARD ─────────────────────────────────────── */}
                <div style={cardStyle}>
                  <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: "0 0 1.25rem" }}>Quick Actions</h3>
                  {/* ── CHANGE: Quick action buttons — edit label, sub, tab ──────── */}
                  {[
                    { label: "Review Pending Photos",  sub: `${stats.pendingPhotos} awaiting review`,                           tab: "photos" },
                    { label: "Approve Staff Requests", sub: `${staff.filter(x=>x.status==="Pending").length} pending approvals`, tab: "staff" },
                    { label: "Manage Events",          sub: `${stats.totalEvents} total events`,                                 tab: "events" },
                    { label: "View Analytics",         sub: "Stats & upload trends",                                             tab: "analytics" },
                  ].map((qa, i) => (
                    <button key={i} onClick={() => setActiveTab(qa.tab)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = c.accentHi; e.currentTarget.style.background = c.accentSoft; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "#fafbfc"; }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: isDark ? "rgba(255,255,255,0.02)" : "#fafbfc", border: `1px solid ${c.border}`, borderRadius: "10px", padding: "0.75rem 1rem", cursor: "pointer", marginBottom: "0.6rem", textAlign: "left", transition: "all 0.2s", fontFamily: "inherit" }}>
                      <div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: c.text }}>{qa.label}</div>
                        <div style={{ fontSize: "0.7rem", color: c.sub, marginTop: "2px" }}>{qa.sub}</div>
                      </div>
                      <span style={{ color: c.accentHi, fontSize: "0.8rem" }}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ STAFF TAB ══════════════════════════════════════════════════════ */}
          {activeTab === "staff" && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", gap: "1rem", flexWrap: "wrap" }}>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: 0 }}>Staff Coordinators ({filteredStaff.length})</h3>
                {/* ── CHANGE: Staff search placeholder text ─────────────────── */}
                <input style={{ background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: "9px", padding: "0.5rem 1rem", color: c.text, fontSize: "0.8rem", outline: "none", width: "240px", fontFamily: "inherit" }} placeholder="Search by name or email..." value={staffSearch} onChange={e => setStaffSearch(e.target.value)} />
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  {/* ── CHANGE: Staff table column headers ───────────────────── */}
                  <thead><tr>{["Name & Email", "Department", "Events", "Joined", "Status", "Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
                  <tbody>
                    {filteredStaff.map(sf => (
                      <tr key={sf.id}
                        onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "#f8fafc"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            {/* ── CHANGE: Staff avatar gradient ─────────────────── */}
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#1e4fa8,#0d2d6b)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "0.8rem", flexShrink: 0 }}>{sf.name[0]}</div>
                            <div>
                              <div style={{ fontWeight: 600, color: c.text, fontSize: "0.82rem" }}>{sf.name}</div>
                              <div style={{ fontSize: "0.7rem", color: c.sub }}>{sf.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={tdStyle}>
                          {/* ── CHANGE: Department badge — light mode color is #1e4fa8 ── */}
                          <span style={{ background: c.accentSoft, color: isDark ? "#93c5fd" : "#1e4fa8", padding: "0.18rem 0.6rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600 }}>{sf.department}</span>
                        </td>
                        <td style={{ ...tdStyle, color: c.sub }}>{sf.events}</td>
                        <td style={{ ...tdStyle, color: c.sub }}>{sf.joined}</td>
                        <td style={tdStyle}>
                          <span style={{ padding: "0.18rem 0.6rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600, background: "rgba(255,255,255,0.05)", color: sf.status === "Active" ? c.text : c.sub, border: `1px solid ${c.border}` }}>{sf.status}</span>
                        </td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: "0.4rem" }}>
                            {sf.status === "Pending" && <button onClick={() => approveStaff(sf.id)} style={btn("approve")}><CheckCircle size={13} /> Approve</button>}
                            <button onClick={() => setDeleteModal({ id: sf.id, name: sf.name, type: "staff" })} style={btn("remove")}><Trash2 size={13} /> Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ STUDENTS TAB ═══════════════════════════════════════════════════ */}
          {activeTab === "students" && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", gap: "1rem", flexWrap: "wrap" }}>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: 0 }}>Students ({stats.totalStudents} total)</h3>
                <input style={{ background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: "9px", padding: "0.5rem 1rem", color: c.text, fontSize: "0.8rem", outline: "none", width: "240px", fontFamily: "inherit" }} placeholder="Search by reg. number..." value={studentSearch} onChange={e => setStudentSearch(e.target.value)} />
              </div>
              {studentSearch.length > 0 && studentSearch.length < 2 && <p style={{ color: c.sub, fontSize: "0.78rem", marginBottom: "1rem" }}>Type at least 2 characters...</p>}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["Student", "Reg. No", "Uploads", "Last Active", "Status", "Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
                  <tbody>
                    {filteredStudents.map(st => (
                      <tr key={st.id}
                        onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "#f8fafc"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#1e4fa8,#0d2d6b)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "0.8rem", flexShrink: 0 }}>{st.name[0]}</div>
                            <div>
                              <div style={{ fontWeight: 600, color: c.text, fontSize: "0.82rem" }}>{st.name}</div>
                              <div style={{ fontSize: "0.7rem", color: c.sub }}>{st.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={tdStyle}>
                          {/* ── CHANGE: Reg number color — light mode uses #1e4fa8 ─── */}
                          <span style={{ color: isDark ? "#93c5fd" : "#1e4fa8", fontFamily: "monospace", fontSize: "0.8rem" }}>{st.regNo}</span>
                        </td>
                        <td style={{ ...tdStyle, color: c.sub }}>{st.uploads} photos</td>
                        <td style={{ ...tdStyle, color: c.sub }}>{st.lastActive}</td>
                        <td style={tdStyle}>
                          {/* ── CHANGE: Student status badge color ───────────────── */}
                          <span style={{ padding: "0.18rem 0.6rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600, background: c.accentSoft, color: isDark ? "#93c5fd" : "#1e4fa8", border: `1px solid ${c.border}` }}>{st.status}</span>
                        </td>
                        <td style={tdStyle}><button onClick={() => setDeleteModal({ id: st.id, name: st.name, type: "student" })} style={btn("remove")}><Trash2 size={13} /> Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: c.sub, fontSize: "0.72rem", marginTop: "0.75rem" }}>Showing {filteredStudents.length} of {stats.totalStudents} students.</p>
            </div>
          )}

          {/* ══ EVENTS TAB ═════════════════════════════════════════════════════ */}
          {activeTab === "events" && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", gap: "1rem", flexWrap: "wrap" }}>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: 0 }}>All Events ({filteredEvents.length})</h3>
                <input style={{ background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: "9px", padding: "0.5rem 1rem", color: c.text, fontSize: "0.8rem", outline: "none", width: "240px", fontFamily: "inherit" }} placeholder="Search by event name..." value={eventSearch} onChange={e => setEventSearch(e.target.value)} />
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  {/* ── CHANGE: Events table column headers ──────────────────── */}
                  <thead><tr>{["Event", "Coordinator", "Photos", "Date", "Deadline", "Category", "Status", "Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
                  <tbody>
                    {filteredEvents.map(ev => {
                      const deadlinePassed = new Date(ev.deadline) < new Date();
                      return (
                        <tr key={ev.id}
                          onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "#f8fafc"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <td style={{ ...tdStyle, fontWeight: 600 }}>{ev.name}</td>
                          <td style={{ ...tdStyle, color: c.sub, fontSize: "0.78rem" }}>{ev.coordinator}</td>
                          {/* ── CHANGE: Photos count color ────────────────────────── */}
                          <td style={{ ...tdStyle, color: isDark ? "#93c5fd" : "#1e4fa8", fontWeight: 600 }}>{ev.photos}</td>
                          <td style={{ ...tdStyle, color: c.sub, fontSize: "0.78rem" }}>{ev.date}</td>
                          <td style={tdStyle}><span style={{ color: deadlinePassed ? c.sub : (isDark ? "#93c5fd" : "#1e4fa8"), fontSize: "0.78rem", fontWeight: 500 }}>{ev.deadline}</span></td>
                          <td style={tdStyle}>
                            {/* ── CHANGE: Category badge color ──────────────────── */}
                            <span style={{ background: c.accentSoft, color: isDark ? "#93c5fd" : "#1e4fa8", padding: "0.18rem 0.6rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600 }}>{ev.category}</span>
                          </td>
                          <td style={tdStyle}><span style={{ padding: "0.18rem 0.6rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600, background: "rgba(255,255,255,0.05)", color: ev.status === "Active" ? c.text : c.sub, border: `1px solid ${c.border}` }}>{ev.status}</span></td>
                          <td style={tdStyle}><button onClick={() => setDeleteModal({ id: ev.id, name: ev.name, type: "event" })} style={btn("remove")}><Trash2 size={13} /> Delete</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ PHOTO REVIEW TAB ═══════════════════════════════════════════════ */}
          {activeTab === "photos" && (
            <div>
              {/* ── PHOTO TOOLBAR ─────────────────────────────────────────────── */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: c.card, border: `1px solid ${c.border}`, borderRadius: "12px", padding: "0.85rem 1.25rem", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <span style={{ color: c.text, fontWeight: 700, fontSize: "0.88rem" }}>{pendingPhotos.length} Pending</span>
                  <span style={{ color: c.sub, fontSize: "0.78rem", marginLeft: "8px" }}>· {selectedPhotos.length} selected</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <button onClick={() => setSelectedPhotos(pendingPhotos.map(p => p.id))} style={btn("download")}>Select All</button>
                  <button onClick={() => setSelectedPhotos([])} style={btn("remove")}>Clear</button>
                  {selectedPhotos.length > 0 && (<>
                    <button onClick={bulkApprove} style={btn("approve")}><CheckCircle size={13} /> Approve ({selectedPhotos.length})</button>
                    <button onClick={bulkReject}  style={btn("reject")}><XCircle size={13} /> Reject ({selectedPhotos.length})</button>
                    <button onClick={() => { const items = pendingPhotos.filter(p => selectedPhotos.includes(p.id)); setDownloadedPhotos(prev => [...prev, ...items]); setStats(prev => ({ ...prev, totalDownloads: prev.totalDownloads + selectedPhotos.length })); notify(`${selectedPhotos.length} downloaded!`); setSelectedPhotos([]); }} style={btn("download")}><ArrowDownToLine size={13} /> Download</button>
                  </>)}
                </div>
              </div>

              {/* ── PHOTO GRID ────────────────────────────────────────────────── */}
              {/* ── CHANGE: Photo card min width — change 220px ──────────────── */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem" }}>
                {pendingPhotos.map(p => {
                  const selected = selectedPhotos.includes(p.id);
                  return (
                    <div key={p.id}
                      onMouseEnter={e => { e.currentTarget.querySelector('.photo-actions').style.opacity = "1"; e.currentTarget.querySelector('.photo-actions').style.transform = "translateY(0)"; }}
                      onMouseLeave={e => { e.currentTarget.querySelector('.photo-actions').style.opacity = "0"; e.currentTarget.querySelector('.photo-actions').style.transform = "translateY(8px)"; }}
                      style={{ borderRadius: "12px", border: `1px solid ${selected ? c.accentHi : c.border}`, overflow: "hidden", background: c.card, position: "relative", cursor: "pointer", transition: "all 0.25s", boxShadow: selected ? `0 0 0 2px ${c.accentHi}` : "none" }}>
                      {/* Checkbox top-left */}
                      <div onClick={() => toggleSelect(p.id)} style={{ position: "absolute", top: "10px", left: "10px", zIndex: 3, width: "20px", height: "20px", borderRadius: "5px", background: selected ? c.accentHi : "rgba(0,0,0,0.5)", border: `1.5px solid ${selected ? c.accentHi : "rgba(255,255,255,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", transition: "all 0.2s" }}>
                        {selected && <span style={{ color: "#fff", fontSize: "11px", fontWeight: 700 }}>✓</span>}
                      </div>
                      {/* Time badge top-right */}
                      <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 3, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", borderRadius: "6px", padding: "2px 8px", fontSize: "0.65rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{p.time}</div>
                      {/* ── CHANGE: Photo card image height — change 150px ──────── */}
                      <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
                        <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", display: "block" }}
                          onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                          onMouseLeave={e => e.target.style.transform = "scale(1)"}
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,13,26,0.7) 0%, transparent 60%)" }} />
                      </div>
                      <div style={{ padding: "0.75rem 0.9rem 0.5rem" }}>
                        <div style={{ fontWeight: 700, fontSize: "0.82rem", color: c.text, marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                        <div style={{ fontSize: "0.7rem", color: c.sub, marginBottom: "1px" }}>{p.uploader} · <span style={{ color: isDark ? "#93c5fd" : "#1e4fa8", fontFamily: "monospace" }}>{p.regNo}</span></div>
                        <div style={{ fontSize: "0.68rem", color: c.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.event}</div>
                      </div>
                      {/* ── PHOTO ACTION BUTTONS: Slide up on hover ─────────────── */}
                      <div className="photo-actions" style={{ display: "flex", gap: "0.4rem", padding: "0.5rem 0.9rem 0.75rem", opacity: 0, transform: "translateY(8px)", transition: "all 0.25s ease" }}>
                        {/* ── CHANGE: Approve button color ──────────────────────── */}
                        <button onClick={e => { e.stopPropagation(); approvePhoto(p.id); }} style={{ flex: 1, background: c.accentSoft, border: `1px solid rgba(30,79,168,0.4)`, color: isDark ? "#93c5fd" : "#1e4fa8", borderRadius: "7px", padding: "0.4rem 0", cursor: "pointer", fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", fontFamily: "inherit" }}>
                          <CheckCircle size={12} /> Approve
                        </button>
                        {/* ── CHANGE: Reject button color ───────────────────────── */}
                        <button onClick={e => { e.stopPropagation(); rejectPhoto(p.id); }} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${c.border}`, color: c.sub, borderRadius: "7px", padding: "0.4rem 0", cursor: "pointer", fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", fontFamily: "inherit" }}>
                          <XCircle size={12} /> Reject
                        </button>
                        <button onClick={e => { e.stopPropagation(); downloadPhoto(p); }} style={{ background: c.accentSoft, border: `1px solid rgba(30,79,168,0.3)`, color: isDark ? "#93c5fd" : "#1e4fa8", borderRadius: "7px", padding: "0.4rem 0.6rem", cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" }}>
                          <ArrowDownToLine size={13} />
                        </button>
                        <button onClick={e => { e.stopPropagation(); setPreviewPhoto(p); }} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.border}`, color: c.sub, borderRadius: "7px", padding: "0.4rem 0.6rem", cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" }}>
                          <Eye size={13} />
                        </button>
                        <button onClick={e => { e.stopPropagation(); setDeleteModal({ id: p.id, name: p.title, type: "photo" }); }} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.border}`, color: c.sub, borderRadius: "7px", padding: "0.4rem 0.6rem", cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {pendingPhotos.length === 0 && (
                  <div style={{ color: c.sub, padding: "4rem", textAlign: "center", gridColumn: "1/-1", fontSize: "0.9rem" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}></div>
                    All photos reviewed — you're all caught up!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ ANALYTICS TAB ══════════════════════════════════════════════════ */}
          {activeTab === "analytics" && (
            <div>
              {/* ── ANALYTICS TOP 4 CARDS ─────────────────────────────────────── */}
              {/* ── CHANGE: Analytics card min width — change 200px ──────────── */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
                {[
                  // ── CHANGE: Analytics cards — edit label, icon, desc here ────
                  { label: "Total Views",     value: stats.totalViews,     icon: <Eye size={20} />,         desc: "All-time page views" },
                  { label: "Total Downloads", value: stats.totalDownloads, icon: <Download size={20} />,    desc: "Photos downloaded" },
                  { label: "Approved Photos", value: stats.approvedPhotos, icon: <CheckCircle size={20} />, desc: "Successfully approved" },
                  { label: "Rejected Photos", value: stats.rejectedPhotos, icon: <XCircle size={20} />,     desc: "Removed from review" },
                ].map((st, i) => (
                  <div key={i}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(30,79,168,0.2)"; e.currentTarget.style.borderColor = c.accentHi; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = c.border; }}
                    style={{ borderRadius: "14px", padding: "1.4rem 1.2rem", border: `1px solid ${c.border}`, background: c.card, transition: "all 0.25s", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(30,79,168,0.08)", pointerEvents: "none" }} />
                    {/* ── CHANGE: Analytics icon color ─────────────────────────── */}
                    <div style={{ color: c.sub, marginBottom: "10px" }}>{st.icon}</div>
                    {/* ── CHANGE: Analytics number font size — change 2rem ─────── */}
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: c.text, letterSpacing: "-1.5px", lineHeight: 1 }}>{st.value.toLocaleString()}</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: c.text, marginTop: "6px" }}>{st.label}</div>
                    <div style={{ fontSize: "0.68rem", color: c.sub, marginTop: "3px" }}>{st.desc}</div>
                    {/* ── CHANGE: Bottom accent line color ─────────────────────── */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, #1e4fa8, transparent)` }} />
                  </div>
                ))}
              </div>

              {/* ── ANALYTICS CHARTS ──────────────────────────────────────────── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div style={cardStyle}>
                  {/* ── CHANGE: Upload chart title ────────────────────────────── */}
                  <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: "0 0 1rem" }}>Upload Activity (Last 7 Days)</h3>
                  {/* ── CHANGE: Upload chart data, labels, color ─────────────── */}
                  <LineChart data={[23,45,30,67,52,78,41]} labels={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} color="#2d6fd4" />
                </div>
                <div style={cardStyle}>
                  {/* ── CHANGE: Views chart title ─────────────────────────────── */}
                  <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: "0 0 1rem" }}>Views Over Time</h3>
                  {/* ── CHANGE: Views chart data, labels, color ──────────────── */}
                  <LineChart data={[1200,1800,1500,2200,1900,2800,2100]} labels={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} color="#1e4fa8" />
                </div>
              </div>

              {/* ── TOP EVENTS BY PHOTOS ──────────────────────────────────────── */}
              <div style={cardStyle}>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: "0 0 1rem" }}>Top Events by Photos</h3>
                {[...events].sort((a, b) => b.photos - a.photos).map((ev, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.65rem 0", borderBottom: `1px solid ${c.border}` }}>
                    <span style={{ color: c.sub, minWidth: "1.5rem", fontWeight: 700, fontSize: "0.75rem" }}>#{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: c.text, fontSize: "0.82rem", marginBottom: "5px", fontWeight: 500 }}>{ev.name}</div>
                      <div style={{ background: c.barBg, borderRadius: "4px", height: "5px", overflow: "hidden" }}>
                        {/* ── CHANGE: Bar chart gradient colors ──────────────────── */}
                        <div style={{ background: `linear-gradient(90deg, #1e4fa8, #2d6fd4)`, height: "100%", borderRadius: "4px", width: `${(ev.photos / 234) * 100}%`, transition: "width 0.6s" }} />
                      </div>
                    </div>
                    <span style={{ color: c.sub, fontSize: "0.76rem", minWidth: "60px", textAlign: "right" }}>{ev.photos} photos</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ DOWNLOADS TAB ══════════════════════════════════════════════════ */}
          {activeTab === "downloads" && (
            <div style={cardStyle}>
              <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text, margin: "0 0 1.25rem" }}>Admin Downloads ({downloadedPhotos.length})</h3>
              {downloadedPhotos.length === 0 ? (
                <p style={{ color: c.sub, fontSize: "0.85rem" }}>No downloads yet. Download photos from the Photo Review tab.</p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" }}>
                  {downloadedPhotos.map((p, i) => (
                    <div key={i}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = c.accentHi; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = c.border; }}
                      style={{ borderRadius: "12px", border: `1px solid ${c.border}`, overflow: "hidden", background: c.card, transition: "all 0.2s" }}>
                      <img src={p.image} alt={p.title} style={{ width: "100%", height: "120px", objectFit: "cover", display: "block" }} />
                      <div style={{ padding: "0.75rem 0.9rem" }}>
                        <div style={{ fontWeight: 600, fontSize: "0.82rem", color: c.text }}>{p.title}</div>
                        <div style={{ fontSize: "0.7rem", color: c.sub, marginTop: "2px" }}>{p.uploader} · {p.regNo}</div>
                        <div style={{ fontSize: "0.68rem", color: c.sub }}>{p.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* ══ PHOTO PREVIEW MODAL ════════════════════════════════════════════════ */}
      {previewPhoto && (
        <div onClick={() => setPreviewPhoto(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, backdropFilter: "blur(8px)", padding: "2rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: "16px", border: `1px solid ${c.border}`, overflow: "hidden", maxWidth: "600px", width: "100%" }}>
            <img src={previewPhoto.image} alt={previewPhoto.title} style={{ width: "100%", maxHeight: "380px", objectFit: "cover", display: "block" }} />
            <div style={{ padding: "1.25rem" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: c.text, marginBottom: "6px" }}>{previewPhoto.title}</div>
              <div style={{ fontSize: "0.8rem", color: c.sub }}>{previewPhoto.uploader} · <span style={{ color: isDark ? "#93c5fd" : "#1e4fa8", fontFamily: "monospace" }}>{previewPhoto.regNo}</span></div>
              <div style={{ fontSize: "0.78rem", color: c.sub, marginTop: "2px" }}>{previewPhoto.event} · {previewPhoto.time}</div>
              <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
                <button onClick={() => { approvePhoto(previewPhoto.id); setPreviewPhoto(null); }} style={btn("approve")}><CheckCircle size={14} /> Approve</button>
                <button onClick={() => { rejectPhoto(previewPhoto.id); setPreviewPhoto(null); }} style={btn("reject")}><XCircle size={14} /> Reject</button>
                <button onClick={() => { downloadPhoto(previewPhoto); setPreviewPhoto(null); }} style={btn("download")}><ArrowDownToLine size={14} /> Download</button>
                <button onClick={() => setPreviewPhoto(null)} style={{ ...btn("remove"), marginLeft: "auto" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ DELETE CONFIRMATION MODAL ══════════════════════════════════════════ */}
      {deleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(6px)" }}>
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: "16px", padding: "2rem", maxWidth: "380px", width: "90%", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🗑</div>
            <h3 style={{ color: c.text, marginBottom: "0.6rem", fontSize: "1rem" }}>Confirm Deletion</h3>
            <p style={{ color: c.sub, fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Delete <strong style={{ color: c.text }}>{deleteModal.name}</strong>? This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button onClick={() => setDeleteModal(null)} style={{ ...btn("remove"), padding: "0.55rem 1.5rem", fontSize: "0.85rem" }}>Cancel</button>
              <button onClick={confirmDelete} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${c.border}`, color: c.text, borderRadius: "9px", padding: "0.55rem 1.5rem", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ TOAST NOTIFICATION ════════════════════════════════════════════════ */}
      {/* ── CHANGE: Toast position — change bottom/right values ──────────────── */}
      {notification && (
        <div style={{ position: "fixed", bottom: "2rem", right: "2rem", background: notification.type === "error" ? "rgba(255,255,255,0.08)" : c.accentSoft, border: `1px solid ${notification.type === "error" ? c.border : c.accentHi}`, color: c.text, padding: "0.7rem 1.25rem", borderRadius: "10px", fontWeight: 600, fontSize: "0.82rem", zIndex: 200, boxShadow: "0 8px 30px rgba(0,0,0,0.4)", backdropFilter: "blur(10px)" }}>
          {notification.type === "error" ? "✗" : "✓"} {notification.msg}
        </div>
      )}

    </div>
  );
}
