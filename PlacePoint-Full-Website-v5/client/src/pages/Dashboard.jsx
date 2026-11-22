import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { currentProfile, studentStorageKey } from '../services/api';
import { companyBank, categoryInfo } from './companyQuestionBank';

const readJSON = key => { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } };
const tiles = [
  { icon: '◈', tone: 'teal', title: 'Aptitude practice', desc: 'Build speed in quantitative, logical and verbal reasoning.', to: '/aptitude', action: 'Explore aptitude', count: () => '3 practice areas' },
  { icon: '</>', tone: 'blue', title: 'Programming practice', desc: 'Strengthen fundamentals and solve placement-style problems.', to: '/coding', action: 'Explore coding', count: profile => `${profile?.languages?.length || 0} selected languages` },
  { icon: '◎', tone: 'terracotta', title: 'Interview preparation', desc: 'Get ready for technical and HR interview rounds.', to: '/interview', action: 'Prepare for interviews', count: () => `${categoryInfo.length} preparation categories` },
  { icon: '▤', tone: 'gold', title: 'Company preparation', desc: 'Practise company-wise behavioural, technical, coding and HR questions.', to: '/companies', action: 'Explore companies', count: () => `${Object.keys(companyBank).length} company banks` },
  { icon: '▣', tone: 'blue', title: 'Books library', desc: 'Download original aptitude, coding, CS and interview study guides.', to: '/books', action: 'Browse books', count: () => '4 free PDF guides' },
];
export default function Dashboard() {
  const profile = currentProfile() || {};
  const email = profile.email || 'guest';
  const coding = readJSON(studentStorageKey('placepoint-coding-completed', email)) || {};
  const aptitude = readJSON(studentStorageKey('placepoint-aptitude-results', email)) || {};
  const company = readJSON(studentStorageKey('placepoint-company-progress', email)) || {};
  const solved = Object.values(coding).filter(Boolean).length;
  const aptitudeValues = Object.values(aptitude).filter(item => Number.isFinite(Number(item?.percent))).map(item => Number(item.percent));
  const aptitudeAverage = aptitudeValues.length ? Math.round(aptitudeValues.reduce((sum, value) => sum + value, 0) / aptitudeValues.length) : 0;
  const companyAttempted = Object.values(company).filter(item => item?.answered).length;
  const lastPath = localStorage.getItem('placepoint-last-path') || '/aptitude';
  const continuePath = lastPath === '/dashboard' ? '/aptitude' : lastPath;
  const statCards = useMemo(() => [
    { label: 'Problems solved', value: solved, detail: 'Coding practice', icon: '</>' },
    { label: 'Aptitude average', value: `${aptitudeAverage}%`, detail: `${aptitudeValues.length} practice sets recorded`, icon: '◈' },
    { label: 'Company questions', value: companyAttempted, detail: 'Questions attempted', icon: '▤' },
  ], [solved, aptitudeAverage, aptitudeValues.length, companyAttempted]);
  return <div className="dashboard-page">
    <section className="dashboard-greeting"><div><div className="eyebrow">YOUR PLACEMENT JOURNEY</div><h1>Good evening, <em>{profile.name || 'Candidate'}</em></h1><p className="welcome-copy">A focused space to practise, improve and get ready for the opportunities ahead.</p></div><Link to="/progress" className="btn-primary">View my progress <span aria-hidden="true">↗</span></Link></section>
    <section className="dashboard-stats" aria-label="Your preparation statistics">{statCards.map(stat => <article className="stat-card" key={stat.label}><span className="stat-icon" aria-hidden="true">{stat.icon}</span><div><small>{stat.label}</small><strong>{stat.value}</strong><p>{stat.detail}</p></div></article>)}</section>
    <Link to={continuePath} className="continue-card"><span className="continue-icon" aria-hidden="true">↗</span><span><small>CONTINUE WHERE YOU LEFT OFF</small><strong>Pick up your preparation</strong><p>Return to the last section you visited.</p></span><span className="continue-arrow" aria-hidden="true">→</span></Link>
    <section className="section-heading"><div><div className="eyebrow">YOUR LEARNING SPACE</div><h2>Choose where to begin</h2><p>Build the skills that matter in every placement round.</p></div></section>
    <section className="feature-grid">{tiles.map((tile, index) => <article className={`feature-card feature-${tile.tone}`} key={tile.title}><div className={`feature-icon ${tile.tone}`} aria-hidden="true">{tile.icon}</div><div className="feature-meta">0{index + 1} <span>•</span> {tile.count(profile)}</div><h3>{tile.title}</h3><p>{tile.desc}</p><Link to={tile.to} className="card-link">{tile.action} <span aria-hidden="true">→</span></Link></article>)}</section>
    <section className="bottom-banner"><div className="banner-symbol" aria-hidden="true">✳</div><div><strong>Consistency beats cramming.</strong><p>Set aside a little time every day. Your preparation will build momentum.</p></div><Link to="/progress">See your progress <span aria-hidden="true">→</span></Link></section>
  </div>;
}
