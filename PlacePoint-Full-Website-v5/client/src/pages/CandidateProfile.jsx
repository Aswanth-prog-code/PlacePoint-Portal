import React from 'react';
import { currentProfile, isDemoMode } from '../services/api';

export default function CandidateProfile() {
  const p = currentProfile() || {};
  return (
    <div className="content-page">
      <div className="page-heading">
        <div className="eyebrow">CANDIDATE ACCOUNT</div>
        <h1>My <em>profile.</em></h1>
        <p>Your registered details and placement preferences.</p>
      </div>

      {isDemoMode && !p.email && (
        <div className="demo-inline-banner" role="status">
          <strong>Portfolio Showcase:</strong> Candidate profile data (academic year, target companies, selected languages) is stored and retrieved from MongoDB Community Server in local development. Below is a preview of the candidate profile layout.
        </div>
      )}

      <section className="candidate-profile-card">
        <div className="candidate-profile-avatar">
          {(p.name || (isDemoMode ? 'D' : 'S')).charAt(0).toUpperCase()}
        </div>
        <h2>{p.name || (isDemoMode ? 'Demo Candidate' : 'Candidate')}</h2>
        <p>{p.email || (isDemoMode ? 'demo.candidate@placepoint.portfolio (Local Dev Mode)' : 'Not signed in')}</p>
        <div className="candidate-details-grid">
          {[
            ['College', p.college || (isDemoMode ? 'Engineering & Technology (Demo)' : 'Not provided')],
            ['Current year', p.year || (isDemoMode ? 'Final Year' : 'Not provided')],
            ['Programming languages', (p.languages && p.languages.length) ? p.languages.join(', ') : (isDemoMode ? 'JavaScript, Python, Java, C++, SQL' : 'Not provided')],
            ['Target companies', (p.companies && p.companies.length) ? p.companies.join(', ') : (isDemoMode ? 'Amazon, Google, Zoho, TCS, Capgemini, CTS, Accenture' : 'Not provided')]
          ].map(([k, v]) => (
            <div key={k}>
              <small>{k}</small>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
