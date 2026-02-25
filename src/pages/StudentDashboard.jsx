import React, { useState } from 'react';
import { Home, Upload, User, Image, Settings, HelpCircle, LogOut, Search, Heart, Calendar, Tag, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/dashboard.css';

const StudentDashboard = ({onLogout}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedEvents, setLikedEvents] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedSelfie, setSelectedSelfie] = useState(null);
  const [selfieUploadSuccess, setSelfieUploadSuccess] = useState(false);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@college.edu",
    regNumber: "CS2021045",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isApprovedUploader: true
  });

  const [tempName, setTempName] = useState(user.name);
  const [tempProfilePic, setTempProfilePic] = useState(user.profilePic);

  // NAVY BLUE COLOR SCHEME
  const colors = {
    bg: theme === 'dark' ? '#23384d' : '#23384d',
    cardBg: theme === 'dark' ? '#0f1d35' : '#ffffff',
    sidebarBg: theme === 'dark' ? '#0f1d35' : '#ffffff',
    text: theme === 'dark' ? '#e4e8f0' : '#1a202c',
    textMuted: theme === 'dark' ? '#9ca3af' : '#6b7280',
    textDim: theme === 'dark' ? '#6b7280' : '#9ca3af',
    border: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    inputBg: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
    inputBorder: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    primary: theme === 'dark' ? '#1e40af' : '#2563eb',
    primaryHover: theme === 'dark' ? '#1e3a8a' : '#1d4ed8',
    activeText: theme === 'dark' ? '#ffffff' : '#000000',
    gradient: theme === 'dark'
      ? 'radial-gradient(circle at top, #23384d,#000000)'
      : 'linear-gradient(135deg, #f0f4f8,#ffffff)',

    // ── NEW SEMANTIC TOKENS ──────────────────────────────────────────
    // "View Photos" button: dark slate — professional, neutral
    viewBtnBg: theme === 'dark' ? '#1e293b' : '#1e293b',
    viewBtnText: '#ffffff',
    viewBtnBorder: theme === 'dark' ? '#334155' : '#334155',

    // Photo-count badge: always black bg, white text
    badgeBg: '#111111',
    badgeText: '#ffffff',

    // Logout button: dark slate, never blue
    logoutBg: theme === 'dark' ? '#1e293b' : '#1e293b',
    logoutText: '#ffffff',
    logoutBorder: theme === 'dark' ? '#334155' : '#475569',

    // Category active highlight: subtle slate instead of blue wash
    catActiveBg: theme === 'dark' ? 'rgba(30,41,59,0.8)' : 'rgba(30,41,59,0.08)',
    catActiveBorder: theme === 'dark' ? '#475569' : '#94a3b8',
    catActiveText: theme === 'dark' ? '#ffffff' : '#1e293b',

    // Logo text in light mode: black (not blue)
    logoText: theme === 'dark' ? '#ffffff' : '#000000',
  };

  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: "Tech Fest 2024", 
      category: "technology", 
      date: "2024-12-15", 
      photoCount: 45, 
      views: 1234, 
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", 
      uploadedBy: "Dr. Sarah Williams",
      photos: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop"
      ]
    },
    { 
      id: 2, 
      title: "Annual Sports Day", 
      category: "sports", 
      date: "2024-11-20", 
      photoCount: 128, 
      views: 2567, 
      thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop", 
      uploadedBy: "Prof. Michael Chen",
      photos: [
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop"
      ]
    },
    { 
      id: 3, 
      title: "Cultural Evening", 
      category: "cultural", 
      date: "2024-10-30", 
      photoCount: 89, 
      views: 892, 
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop", 
      uploadedBy: "Ms. Priya Sharma",
      photos: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop"
      ]
    },
    { 
      id: 4, 
      title: "Graduation Ceremony", 
      category: "academic", 
      date: "2024-09-15", 
      photoCount: 234, 
      views: 3421, 
      thumbnail: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=400&h=300&fit=crop", 
      uploadedBy: "Dean's Office",
      photos: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1622495894853-511a7f14c4e7?w=800&h=600&fit=crop"
      ]
    },
    { 
      id: 5, 
      title: "Hackathon 2024", 
      category: "technology", 
      date: "2024-08-22", 
      photoCount: 67, 
      views: 1876, 
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop", 
      uploadedBy: "CS Department",
      photos: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
      ]
    },
    { 
      id: 6, 
      title: "Music Concert", 
      category: "cultural", 
      date: "2024-07-10", 
      photoCount: 156, 
      views: 2134, 
      thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop", 
      uploadedBy: "Student Council",
      photos: [
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=600&fit=crop"
      ]
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Events', icon: '🎯' },
    { id: 'technology', label: 'Technology', icon: '💻' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'cultural', label: 'Cultural', icon: '🎭' },
    { id: 'academic', label: 'Academic', icon: '🎓' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogout = () => { onLogout(); };

  const toggleLike = (eventId) => {
    setLikedEvents(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setTempProfilePic(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => { setTempProfilePic(null); };

  const getProfilePicDisplay = (pic, size = 80) => {
    if (!pic) {
      return (
        <div style={{ width: `${size}px`, height: `${size}px`, borderRadius: '50%', backgroundColor: theme === 'dark' ? '#202c33' : '#d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${theme === 'dark' ? '#2a3942' : '#c6c6c6'}`, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: `${size * 0.2}px`, width: `${size * 0.35}px`, height: `${size * 0.35}px`, borderRadius: '50%', backgroundColor: theme === 'dark' ? '#667781' : '#8e8e8e' }} />
          <div style={{ position: 'absolute', bottom: `${-size * 0.15}px`, width: `${size * 0.75}px`, height: `${size * 0.75}px`, borderRadius: '50%', backgroundColor: theme === 'dark' ? '#667781' : '#8e8e8e' }} />
        </div>
      );
    }
    return <img src={pic} alt={user.name} style={{ width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: `3px solid ${colors.primary}`, objectFit: 'cover' }} />;
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
    setUploadSuccess(false);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (!selectedEvent) { alert('⚠️ Please select an event first!'); return; }
    if (selectedFiles.length === 0) { alert('⚠️ Please select at least one photo!'); return; }
    const eventId = parseInt(selectedEvent);
    setEvents(prev => prev.map(event =>
      event.id === eventId
        ? { ...event, photoCount: event.photoCount + selectedFiles.length, thumbnail: URL.createObjectURL(selectedFiles[0]) }
        : event
    ));
    setUploadSuccess(true);
    setSelectedFiles([]);
    setSelectedEvent('');
    setTimeout(() => setUploadSuccess(false), 5000);
  };

  const handleSelfieSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedSelfie(file);
      setSelfieUploadSuccess(false);
    }
  };

  const handleSelfieUpload = () => {
    if (!selectedSelfie) {
      alert('⚠️ Please select a selfie first!');
      return;
    }
    setSelfieUploadSuccess(true);
    setTimeout(() => {
      setSelfieUploadSuccess(false);
      setSelectedSelfie(null);
    }, 5000);
  };

  const openPhotoGallery = (event) => {
    setViewingEvent(event);
    setCurrentPhotoIndex(0);
  };

  const closePhotoGallery = () => {
    setViewingEvent(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (viewingEvent && currentPhotoIndex < viewingEvent.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  // ── Reusable event card ─────────────────────────────────────────────
  const EventCard = ({ event, isLiked }) => (
    <div key={event.id} className="event-card" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
      <div className="event-image-container">
        <img src={event.thumbnail} alt={event.title} className="event-image" />
        {/* ✅ CHANGE 3 — Photo count badge: black bg, white text */}
        <div
          className="photo-count-badge"
          style={{
            backgroundColor: colors.badgeBg,
            color: colors.badgeText,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Image size={14} />{event.photoCount}
        </div>
      </div>
      <div className="event-info">
        <h3 className="event-title" style={{ color: colors.text }}>{event.title}</h3>
        <div className="event-meta">
          <span className="meta-item" style={{ color: colors.textMuted }}><Calendar size={14} />{new Date(event.date).toLocaleDateString()}</span>
          <span className="meta-item" style={{ color: colors.textMuted }}><Tag size={14} />{event.category}</span>
          <span className="meta-item" style={{ color: colors.textMuted }}><Eye size={14} />{event.views.toLocaleString()} views</span>
        </div>
        <p className="event-uploader" style={{ color: colors.textDim }}>By {event.uploadedBy}</p>
        <div className="event-actions">
          {/* ✅ CHANGE 2 — View Photos button: dark slate, professional */}
          <button
            className="view-button"
            onClick={() => openPhotoGallery(event)}
            style={{
              backgroundColor: colors.viewBtnBg,
              borderColor: colors.viewBtnBorder,
              color: colors.viewBtnText,
              border: `1px solid ${colors.viewBtnBorder}`,
            }}
          >
            View Photos
          </button>
          <button
            className="like-button"
            onClick={() => toggleLike(event.id)}
            style={{
              color: isLiked ? '#ef4444' : colors.textMuted,
              backgroundColor: colors.inputBg,
              borderColor: isLiked ? '#ef4444' : colors.inputBorder,
            }}
          >
            <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container" style={{ background: colors.gradient, color: colors.text }}>

      {/* ========== PHOTO GALLERY MODAL ========== */}
      {viewingEvent && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)', zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <button onClick={closePhotoGallery} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>
            <X size={24} />
          </button>
          <h2 style={{ position: 'absolute', top: '20px', left: '20px', color: '#fff', fontSize: '24px', fontWeight: 700, margin: 0 }}>{viewingEvent.title}</h2>
          <div style={{ position: 'absolute', top: '70px', left: '20px', color: '#9ca3af', fontSize: '14px' }}>Photo {currentPhotoIndex + 1} of {viewingEvent.photos.length}</div>
          <div style={{ maxWidth: '90%', maxHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={viewingEvent.photos[currentPhotoIndex]} alt={viewingEvent.title} style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }} />
          </div>
          {currentPhotoIndex > 0 && (
            <button onClick={prevPhoto} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>
              <ChevronLeft size={30} />
            </button>
          )}
          {currentPhotoIndex < viewingEvent.photos.length - 1 && (
            <button onClick={nextPhoto} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>
              <ChevronRight size={30} />
            </button>
          )}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', padding: '10px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '12px', maxWidth: '90%', overflowX: 'auto' }}>
            {viewingEvent.photos.map((photo, index) => (
              <img key={index} src={photo} alt="" onClick={() => setCurrentPhotoIndex(index)} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: currentPhotoIndex === index ? `3px solid ${colors.primary}` : '3px solid transparent', opacity: currentPhotoIndex === index ? 1 : 0.6, transition: 'all 0.2s' }} />
            ))}
          </div>
        </div>
      )}

      {/* ========== SIDEBAR ========== */}
      <div className="sidebar" style={{ backgroundColor: colors.sidebarBg, borderRightColor: colors.border }}>
        <div className="logo-section" style={{ borderBottomColor: colors.border }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/clickaloysius-logo.png" alt="Click Aloysius Logo" style={{ width: '40px', height: '40px' }} />
            <div>
              {/* ✅ CHANGE 1 — Logo text: black in light mode, white in dark mode */}
              <h1 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: 700,
                color: colors.logoText,
                letterSpacing: '-0.5px'
              }}>
                Click Aloysius
              </h1>
              <p className="logo-subtitle" style={{ color: colors.textMuted }}>Student Portal</p>
            </div>
          </div>
        </div>

        <nav className="nav-section">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'liked-events', label: 'Liked Events', icon: Heart },
            { id: 'my-photos', label: 'My Photos', icon: User },
            { id: 'uploader', label: 'Upload Photos', icon: Upload },
            { id: 'upload-selfie', label: 'Upload Selfie', icon: Image },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'help', label: 'Help', icon: HelpCircle }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                style={{ color: activeTab === item.id ? colors.activeText : colors.textMuted }}
              >
                <Icon size={20} />{item.label}
              </button>
            );
          })}
        </nav>

      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="main-content">
        <header className="top-bar" style={{ backgroundColor: colors.cardBg, borderBottomColor: colors.border }}>
          <div className="search-container">
            <Search size={18} className="search-icon" style={{ color: colors.textMuted }} />
            <input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }} />
          </div>
          <div className="top-bar-right">
            {getProfilePicDisplay(user.profilePic, 40)}
            {/* ✅ CHANGE 4 — Logout button: dark slate, never blue */}
            <button
              onClick={handleLogout}
              className="logout-button"
              style={{
                backgroundColor: colors.logoutBg,
                color: colors.logoutText,
                border: `1px solid ${colors.logoutBorder}`,
              }}
            >
              <LogOut size={18} />Logout
            </button>
          </div>
        </header>

        <main className="content-area">

          {/* ===== HOME TAB ===== */}
          {activeTab === 'home' && (
            <>
              <div className="category-filters">
                {categories.map(cat => (
                  // ✅ CHANGE 5 — Active category: slate highlight instead of blue wash
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
                    style={{
                      backgroundColor: selectedCategory === cat.id ? colors.catActiveBg : colors.inputBg,
                      borderColor: selectedCategory === cat.id ? colors.catActiveBorder : colors.inputBorder,
                      color: selectedCategory === cat.id ? colors.catActiveText : colors.textMuted,
                      fontWeight: selectedCategory === cat.id ? 600 : 400,
                    }}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>

              <div className="events-grid">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} isLiked={likedEvents.includes(event.id)} />
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="empty-state">
                  <p className="empty-title" style={{ color: colors.text }}>No events found</p>
                  <p className="empty-subtitle" style={{ color: colors.textMuted }}>Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}

          {/* ===== LIKED EVENTS TAB ===== */}
          {activeTab === 'liked-events' && (
            <>
              <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: 700, color: colors.text }}>Your Liked Events</h2>
              {likedEvents.length === 0 ? (
                <div className="empty-state">
                  <Heart size={48} style={{ margin: '0 auto 16px', color: '#ef4444' }} />
                  <p className="empty-title" style={{ color: colors.text }}>No liked events yet</p>
                  <p className="empty-subtitle" style={{ color: colors.textMuted }}>Start liking events to see them here!</p>
                </div>
              ) : (
                <div className="events-grid">
                  {events.filter(event => likedEvents.includes(event.id)).map(event => (
                    <EventCard key={event.id} event={event} isLiked={true} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ===== MY PHOTOS TAB ===== */}
          {activeTab === 'my-photos' && (
            <div className="placeholder-state">
              <User size={48} className="placeholder-icon" />
              <h2 className="placeholder-title" style={{ color: colors.text }}>My Photos</h2>
              <p className="placeholder-text" style={{ color: colors.textMuted }}>AI will show you photos where you appear</p>
              <button className="action-button" style={{ backgroundColor: colors.primary, color: colors.activeText }}>Find My Photos</button>
            </div>
          )}

          {/* ===== UPLOAD PHOTOS TAB ===== */}
          {activeTab === 'uploader' && (
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: 700, color: colors.text }}> Upload Event Photos</h2>

              {!user.isApprovedUploader ? (
                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '32px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(239, 68, 68, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Upload size={28} style={{ color: '#ef4444' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#ef4444' }}>Upload Access Denied</h3>
                  <p style={{ color: colors.textMuted, marginBottom: '16px' }}>You are not authorized to upload photos. Only pre-approved students can upload event photos.</p>
                  <p style={{ color: colors.textDim, fontSize: '14px' }}>Contact your event coordinator or staff to request upload access.</p>
                </div>
              ) : (
                <div style={{ maxWidth: '100%' }}>
                  {uploadSuccess && (
                    <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✅</div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, color: '#22c55e', fontSize: '15px' }}>Photos uploaded successfully!</p>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textMuted }}>Your photos have been submitted for review by the staff coordinator.</p>
                      </div>
                    </div>
                  )}

                  <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: colors.text }}>Select Event *</label>
                    <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} style={{ width: '100%', padding: '12px 16px', backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', border: `1px solid ${colors.inputBorder}`, borderRadius: '8px', color: theme === 'dark' ? '#ffffff' : '#1a202c', fontSize: '14px', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}>
                      <option value="">Choose an event...</option>
                      {events.map(event => (
                        <option key={event.id} value={event.id} style={{ backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#1a202c' }}>
                          {event.title} - {new Date(event.date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                    {!selectedEvent && <p style={{ marginTop: '8px', fontSize: '12px', color: '#ef4444' }}>* Please select an event before uploading</p>}
                  </div>

                  <div style={{ backgroundColor: colors.cardBg, border: `2px dashed ${colors.primary}50`, borderRadius: '12px', padding: '48px 24px', textAlign: 'center', marginBottom: '24px', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${colors.primary}50`; }}>
                    <Image size={48} style={{ color: colors.primary, margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: colors.activeText }}>Drag & Drop Photos Here</h3>
                    <p style={{ color: colors.textMuted, marginBottom: '16px', fontSize: '14px' }}>or click to browse from your computer</p>
                    <input type="file" multiple accept="image/*" style={{ display: 'none' }} id="file-upload" onChange={handleFileSelect} />
                    <label htmlFor="file-upload" style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: `${colors.primary}30`, border: `1px solid ${colors.primary}`, borderRadius: '8px', color: colors.activeText, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Choose Files</label>
                    <p style={{ marginTop: '12px', fontSize: '12px', color: colors.textDim }}>Supported formats: JPG, PNG, HEIC • Max 10MB per file</p>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: colors.text }}>📁 Selected Files ({selectedFiles.length})</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
                        {selectedFiles.map((file, index) => (
                          <div key={index} style={{ position: 'relative' }}>
                            <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${colors.border}` }} />
                            <button onClick={() => removeFile(index)} style={{ position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#ef4444', border: 'none', color: '#fff', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✕</button>
                            <p style={{ marginTop: '4px', fontSize: '10px', color: colors.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ backgroundColor: `${colors.primary}15`, border: `1px solid ${colors.primary}30`, borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: colors.activeText }}>📋 Upload Guidelines</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: colors.textMuted, fontSize: '13px', lineHeight: '1.8' }}>
                      <li>Ensure photos are clear and well-lit</li>
                      <li>Only upload photos from official college events</li>
                      <li>Respect privacy - avoid uploading inappropriate content</li>
                      <li>Photos will be reviewed before being published</li>
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button onClick={() => { setSelectedFiles([]); setSelectedEvent(''); }} style={{ padding: '12px 24px', backgroundColor: colors.inputBg, border: `1px solid ${colors.inputBorder}`, borderRadius: '8px', color: colors.textMuted, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                    <button onClick={handleUpload} style={{ padding: '12px 32px', backgroundColor: selectedFiles.length > 0 && selectedEvent ? colors.primary : '#4a5568', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: selectedFiles.length > 0 && selectedEvent ? 'pointer' : 'not-allowed', fontFamily: 'inherit', opacity: selectedFiles.length > 0 && selectedEvent ? 1 : 0.6 }}>Upload Photos</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== UPLOAD SELFIE TAB ===== */}
          {activeTab === 'upload-selfie' && (
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: 700, color: colors.text }}>Upload Your Selfie</h2>
              <div style={{ maxWidth: '100%' }}>
                {selfieUploadSuccess && (
                  <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✅</div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, color: '#22c55e', fontSize: '15px' }}>Selfie uploaded successfully!</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textMuted }}>Our AI will now recognize you in event photos.</p>
                    </div>
                  </div>
                )}
                <div style={{ backgroundColor: colors.cardBg, border: `2px dashed ${colors.primary}50`, borderRadius: '12px', padding: '48px 24px', textAlign: 'center', marginBottom: '24px', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${colors.primary}50`; }}>
                  {selectedSelfie ? (
                    <div>
                      <img src={URL.createObjectURL(selectedSelfie)} alt="Selected selfie" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '12px', marginBottom: '16px' }} />
                      <p style={{ color: colors.text, fontWeight: 600, marginBottom: '8px' }}>{selectedSelfie.name}</p>
                      <button onClick={() => setSelectedSelfie(null)} style={{ padding: '8px 16px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#ef4444', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Remove</button>
                    </div>
                  ) : (
                    <>
                      <User size={48} style={{ color: colors.primary, margin: '0 auto 16px' }} />
                      <h3 style={{ fontSize: '18px', marginBottom: '8px', color: colors.activeText }}>Upload Your Selfie</h3>
                      <p style={{ color: colors.textMuted, marginBottom: '16px', fontSize: '14px' }}>Help AI recognize you in event photos</p>
                      <input type="file" accept="image/*" style={{ display: 'none' }} id="selfie-upload" onChange={handleSelfieSelect} />
                      <label htmlFor="selfie-upload" style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: `${colors.primary}30`, border: `1px solid ${colors.primary}`, borderRadius: '8px', color: colors.activeText, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Choose File</label>
                      <p style={{ marginTop: '12px', fontSize: '12px', color: colors.textDim }}>JPG, PNG • Max 5MB • Clear face photo recommended</p>
                    </>
                  )}
                </div>
                <div style={{ backgroundColor: `${colors.primary}15`, border: `1px solid ${colors.primary}30`, borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: colors.activeText }}>📋 Selfie Guidelines</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: colors.textMuted, fontSize: '13px', lineHeight: '1.8' }}>
                    <li>Use a clear, front-facing photo</li>
                    <li>Ensure good lighting and no obstructions</li>
                    <li>Only your face should be visible</li>
                    <li>This helps AI identify you in event photos</li>
                  </ul>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button onClick={() => setSelectedSelfie(null)} style={{ padding: '12px 24px', backgroundColor: colors.inputBg, border: `1px solid ${colors.inputBorder}`, borderRadius: '8px', color: colors.textMuted, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                  <button onClick={handleSelfieUpload} style={{ padding: '12px 32px', backgroundColor: selectedSelfie ? colors.primary : '#4a5568', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: selectedSelfie ? 'pointer' : 'not-allowed', fontFamily: 'inherit', opacity: selectedSelfie ? 1 : 0.6 }}>Upload Selfie</button>
                </div>
              </div>
            </div>
          )}

          {/* ===== SETTINGS TAB ===== */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '100%' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: 700, color: colors.text }}> Settings</h2>
              <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: colors.text }}>👤 Profile Settings</h3>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: colors.text }}>Profile Picture</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {getProfilePicDisplay(tempProfilePic, 80)}
                    <div>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} id="profile-pic-upload" />
                      <label htmlFor="profile-pic-upload" style={{ padding: '10px 20px', backgroundColor: `${colors.primary}30`, border: `1px solid ${colors.primary}`, borderRadius: '8px', color: colors.activeText, fontSize: '14px', fontWeight: 600, cursor: 'pointer', marginRight: '8px', fontFamily: 'inherit', display: 'inline-block' }}>Change Photo</label>
                      <button onClick={handlePhotoRemove} style={{ padding: '10px 20px', backgroundColor: colors.inputBg, border: `1px solid ${colors.inputBorder}`, borderRadius: '8px', color: colors.textMuted, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Remove</button>
                      <p style={{ marginTop: '8px', fontSize: '12px', color: colors.textDim }}>JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: colors.text }}>Display Name</label>
                  <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} style={{ width: '100%', padding: '12px 16px', backgroundColor: colors.inputBg, border: `1px solid ${colors.inputBorder}`, borderRadius: '8px', color: colors.text, fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: colors.text }}>Email Address</label>
                  <input type="email" value={user.email} disabled style={{ width: '100%', padding: '12px 16px', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: '8px', color: theme === 'dark' ? colors.textDim : '#1a202c', fontSize: '14px', cursor: 'not-allowed', fontFamily: 'inherit', opacity: theme === 'dark' ? 0.6 : 1 }} />
                  <p style={{ marginTop: '6px', fontSize: '12px', color: theme === 'dark' ? colors.textDim : '#1a202c' }}>Contact admin to change your email address</p>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: colors.text }}>Registration Number</label>
                  <input type="text" value={user.regNumber} disabled style={{ width: '100%', padding: '12px 16px', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: '8px', color: theme === 'dark' ? colors.textDim : '#1a202c', fontSize: '14px', cursor: 'not-allowed', fontFamily: 'inherit', opacity: theme === 'dark' ? 0.6 : 1 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button onClick={() => { setTempName(user.name); setTempProfilePic(user.profilePic); }} style={{ padding: '10px 24px', backgroundColor: colors.inputBg, border: `1px solid ${colors.inputBorder}`, borderRadius: '8px', color: colors.textMuted, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                  <button onClick={() => { setUser({ ...user, name: tempName, profilePic: tempProfilePic }); alert('✅ Profile updated successfully!'); }} style={{ padding: '10px 32px', backgroundColor: colors.primary, border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Save Changes</button>
                </div>
              </div>
              <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: colors.text }}>Appearance</h3>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: colors.text }}>Theme</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setTheme('dark')} style={{ flex: 1, padding: '16px', backgroundColor: theme === 'dark' ? `${colors.primary}30` : colors.inputBg, border: theme === 'dark' ? `2px solid ${colors.primary}` : `2px solid ${colors.inputBorder}`, borderRadius: '10px', cursor: 'pointer' }}>
                  <div style={{ width: '100%', height: '60px', background: 'linear-gradient(135deg, #0a1628, #1e3a8a)', borderRadius: '6px', marginBottom: '8px' }} />
                  <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: 600, color: theme === 'dark' ? colors.primary : colors.textMuted }}>Dark {theme === 'dark' ? '(Active)' : ''}</p>
                  </button>
                  <button onClick={() => setTheme('light')} style={{ flex: 1, padding: '16px', backgroundColor: theme === 'light' ? `${colors.primary}30` : colors.inputBg, border: theme === 'light' ? `2px solid ${colors.primary}` : `2px solid ${colors.inputBorder}`, borderRadius: '10px', cursor: 'pointer' }}>
                  <div style={{ width: '100%', height: '60px', background: 'linear-gradient(135deg, #ffffff, #eff6ff)', borderRadius: '6px', marginBottom: '8px' }} />
                  <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: 600, color: theme === 'light' ? colors.primary : colors.textMuted }}>Light {theme === 'light' ? '(Active)' : ''}</p>
                  </button>
                </div>
                <p style={{ marginTop: '12px', fontSize: '12px', color: colors.textDim }}>Choose your preferred theme</p>
              </div>
            </div>
          )}

          {/* ===== HELP TAB ===== */}
          {activeTab==='help'&&(
          <div style={{ maxWidth: '100%' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: 700, color: colors.text }}>Help & Support</h2>
          <div style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ color: colors.textMuted, fontSize: '16px', marginBottom: '16px' }}>Need help? Reach us at:</p>
            <a href="mailto:support@clickaloysius.edu" style={{ fontSize: '18px', color: colors.primary, fontWeight: 600, textDecoration: 'none' }}>
              support@clickaloysius.edu
            </a>
          </div>
          </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;


