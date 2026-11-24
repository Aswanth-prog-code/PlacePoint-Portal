import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthLogin from './pages/AuthLogin';
import Aptitude from './pages/Aptitude';
import Coding from './pages/Coding';
import Interview from './pages/Interview';
import Progress from './pages/Progress';
import ProfileSetup from './pages/ProfileSetup';
import CandidateProfile from './pages/CandidateProfile';
import Books from './pages/Books';
import { apiRequest, isDemoMode } from './services/api';
import { CompaniesHome, CompanyModules, CompanyQuestionPractice, CompanyProgress } from './pages/Companies';
import './App.css';

const links = [
  { to: '/dashboard', label: 'Dashboard', mobileLabel: 'Home', icon: '⌂', end: true },
  { to: '/aptitude', label: 'Aptitude', mobileLabel: 'Aptitude', icon: '◈' },
  { to: '/coding', label: 'Programming', mobileLabel: 'Code', icon: '</>' },
  { to: '/interview', label: 'Interview', mobileLabel: 'Interview', icon: '◎' },
  { to: '/companies', label: 'Companies', mobileLabel: 'Companies', icon: '▤' },
  { to: '/books', label: 'Books', mobileLabel: 'Books', icon: '▣' },
  { to: '/progress', label: 'My progress', mobileLabel: 'Progress', icon: '↗' },
];
function RequireAuth({ profile, isDemo, children }) {
  const location = useLocation();
  if (profile || isDemo) {
    return children;
  }
  return <Navigate to="/login" replace state={{ from: location }} />;
}
function AppShell({ profile, isDemo, onLogout }) {
  const [presence, setPresence] = useState({ loggedInUsers: null, activeUsers: null });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (isDemo) {
      setPresence({ loggedInUsers: null, activeUsers: null });
      return;
    }
    let mounted = true;
    const refreshPresence = async () => {
      try {
        await apiRequest('/presence/heartbeat', { method: 'POST' }).catch(() => null);
        const stats = await apiRequest('/presence/stats');
        if (mounted) setPresence({ loggedInUsers: stats.loggedInUsers, activeUsers: stats.activeUsers });
      } catch {
        if (mounted) setPresence({ loggedInUsers: null, activeUsers: null });
      }
    };
    refreshPresence();
    const timer = window.setInterval(refreshPresence, 60000);
    return () => { mounted = false; window.clearInterval(timer); };
  }, [profile?.email, isDemo]);
  useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      localStorage.setItem('placepoint-last-path', location.pathname);
    }
    setShowNavMenu(false);
  }, [location.pathname]);

  const navLinks = (className) => links.map(link => (
    <NavLink key={link.to} to={link.to} end={link.end} className={className}>
      <span className="nav-icon" aria-hidden="true">{link.icon}</span>
      <span className="nav-label-desktop">{link.label}</span>
      <span className="nav-label-mobile">{link.mobileLabel || link.label}</span>
    </NavLink>
  ));

  return <div className="app-shell">
    <header className="site-header">
      <Link to="/dashboard" className="brand" aria-label="PlacePoint dashboard">
        <span className="brand-mark" aria-hidden="true">P</span>
        <span className="brand-word">placepoint<span className="brand-dot">.</span><small>PLACEMENT PREPARATION</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navLinks(({ isActive }) => `nav-link${isActive ? ' selected' : ''}`)}</nav>
      <div className="header-profile">
        <button className="profile-menu-trigger" type="button" aria-expanded={showProfileMenu} aria-label="Open candidate menu" onClick={() => setShowProfileMenu(value => !value)}>
          <span className="avatar" aria-hidden="true">{(profile?.name || (isDemo ? 'D' : 'S')).charAt(0).toUpperCase()}</span>
          <span className="profile-trigger-name">{profile?.name || (isDemo ? 'Demo Mode' : 'Student')}</span><span className="profile-chevron" aria-hidden="true">⌄</span>
        </button>
        {showProfileMenu && <div className="profile-popover">
          <Link to="/profile" onClick={() => setShowProfileMenu(false)}>View candidate profile</Link>
          {profile ? (
            <button type="button" onClick={onLogout}>Sign out</button>
          ) : (
            <Link to="/login" onClick={() => setShowProfileMenu(false)}>Sign in / Local Setup</Link>
          )}
        </div>}
      </div>
      <button className="nav-menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded={showNavMenu} onClick={() => setShowNavMenu(value => !value)}><span aria-hidden="true">☰</span></button>
      {showNavMenu && <nav className="tablet-nav" aria-label="Main navigation">{navLinks(({ isActive }) => `nav-link${isActive ? ' selected' : ''}`)}</nav>}
    </header>
    {isDemo && !profile && (
      <aside className="demo-top-banner" aria-label="Portfolio Demo Notice">
        <div className="demo-top-banner-inner">
          <span className="demo-pill">PORTFOLIO DEMO</span>
          <span className="demo-top-banner-text">
            Frontend demonstration for LinkedIn showcase. Backend authentication & MongoDB Community Server run in local development.
          </span>
          <Link to="/login" className="demo-top-banner-link">Local Sign In →</Link>
        </div>
      </aside>
    )}
    <main className="page-content"><Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/aptitude" element={<Aptitude />} />
      <Route path="/coding" element={<Coding />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/profile" element={<CandidateProfile />} />
      <Route path="/companies" element={<CompaniesHome />} />
      <Route path="/books" element={<Books />} />
      <Route path="/companies/progress" element={<CompanyProgress />} />
      <Route path="/companies/:companyId" element={<CompanyModules />} />
      <Route path="/companies/:companyId/:category" element={<CompanyQuestionPractice />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes></main>
    <footer className="footer">
      <div className="footer-presence">
        <span><i className="presence-dot" /> Logged in (30m): <strong>{isDemo ? 'Local Dev' : (presence.loggedInUsers ?? '—')}</strong></span>
        <span><i className={`presence-dot${isDemo ? '' : ' active'}`} /> Active (5m): <strong>{isDemo ? 'Local Dev' : (presence.activeUsers ?? '—')}</strong></span>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PlacePoint</span>
        <span>Prepare with purpose. Perform with confidence.</span>
        <span className="footer-link">{isDemo ? 'Portfolio Showcase · MongoDB Community Server (Local)' : 'Counts refresh every minute'}</span>
      </div>
    </footer>
    <nav className="mobile-tabbar" aria-label="Main navigation">{navLinks(({ isActive }) => `mobile-tab${isActive ? ' selected' : ''}`)}</nav>
  </div>;
}
export default function App() {
  const [profile, setProfile] = useState(() => {
    try { return localStorage.getItem('placepoint-auth') === 'true' && localStorage.getItem('placepoint-token') ? JSON.parse(localStorage.getItem('placepoint-profile') || 'null') : null; }
    catch { return null; }
  });
  function handleLogin(student, token) {
    localStorage.setItem('placepoint-profile', JSON.stringify(student));
    localStorage.setItem('placepoint-token', token);
    localStorage.setItem('placepoint-auth', 'true');
    setProfile(student);
  }
  async function handleLogout() {
    if (!isDemoMode) {
      try { await apiRequest('/presence/logout', { method: 'POST' }); } catch { /* Clear the local session even if the API is offline. */ }
    }
    Object.keys(localStorage).filter(key => key.startsWith('placepoint-')).forEach(key => localStorage.removeItem(key));
    setProfile(null);
  }
  return <BrowserRouter><Routes>
    <Route path="/register" element={profile ? <Navigate to="/dashboard" replace /> : <ProfileSetup isDemo={isDemoMode} />} />
    <Route path="/login" element={profile ? <Navigate to="/dashboard" replace /> : <AuthLogin onLogin={handleLogin} isDemo={isDemoMode} />} />
    <Route path="/*" element={<RequireAuth profile={profile} isDemo={isDemoMode}><AppShell profile={profile} isDemo={isDemoMode} onLogout={handleLogout} /></RequireAuth>} />
  </Routes></BrowserRouter>;
}
