import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest, isDemoMode } from '../services/api';

const knownLanguages = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'C#', 'PHP', 'Go', 'SQL'];

export default function ProfileSetup({ isDemo = isDemoMode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    year: '2nd Year',
    languages: [],
    companies: 'Amazon, Google, Zoho, Capgemini, TCS, Cognizant (CTS), Accenture'
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const toggleLanguage = language =>
    update('languages', form.languages.includes(language)
      ? form.languages.filter(item => item !== language)
      : [...form.languages, language]);

  async function submit(event) {
    event.preventDefault();
    setError('');

    if (isDemo) {
      setError('Account registration requires MongoDB Community Server and Express running in local development. Click "Explore Platform Demo" above to tour the website.');
      return;
    }

    if (!form.languages.length) return setError('Select at least one programming language.');
    const payload = {
      ...form,
      email: form.email.trim().toLowerCase(),
      companies: form.companies.split(',').map(x => x.trim()).filter(Boolean)
    };
    setSaving(true);
    try {
      await apiRequest('/students/register', { method: 'POST', body: JSON.stringify(payload) });
      navigate('/login', { replace: true, state: { registered: true } });
    } catch (err) {
      const networkError = err instanceof TypeError || /fetch failed|networkerror|failed to fetch/i.test(err.message);
      setError(networkError ? `${err.message} Make sure the backend and MongoDB are running.` : err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="profile-setup-page">
      <div className="profile-setup-card">
        <div className="profile-brand">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>placepoint<span className="brand-dot">.</span></span>
        </div>
        <div className="eyebrow">CREATE YOUR CANDIDATE ACCOUNT</div>
        <h1>Build your <em>profile.</em></h1>
        <p className="profile-lead">Register once, then sign in whenever you return to PlacePoint.</p>

        {isDemo && (
          <div className="auth-demo-card" role="status" style={{ marginBottom: '1.75rem' }}>
            <div className="demo-badge">PORTFOLIO DEMO MODE</div>
            <h3>Registration Runs in Local Development</h3>
            <p>
              Candidate account creation writes directly to MongoDB Community Server in local development.
              You can explore all question banks, practice modules, and study books in portfolio demo mode without registering.
            </p>
            <Link to="/dashboard" className="btn-primary auth-demo-btn">
              Explore Platform Demo <span>→</span>
            </Link>
          </div>
        )}

        <div className="registration-progress">
          <span>01</span><i></i><span>02</span><i></i><span>03</span>
          <small>Account · Academic · Target companies</small>
        </div>

        <form onSubmit={submit} className="profile-form">
          <section className="register-section">
            <div className="register-section-heading">
              <span>01</span>
              <div>
                <h2>Account</h2>
                <p>Your sign-in details</p>
              </div>
            </div>
            <div className="profile-form-grid">
              <label>
                Full name *
                <input
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  placeholder="Enter your name"
                  aria-describedby={error ? 'register-error' : undefined}
                  required
                />
              </label>
              <label>
                Email address *
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="you@example.com"
                  aria-describedby={error ? 'register-error' : undefined}
                  required
                />
              </label>
              <label>
                Password *
                <input
                  type="password"
                  minLength="8"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="At least 8 characters"
                  aria-describedby={error ? 'register-error' : undefined}
                  required
                />
              </label>
            </div>
          </section>

          <section className="register-section">
            <div className="register-section-heading">
              <span>02</span>
              <div>
                <h2>Academic</h2>
                <p>Your current learning background</p>
              </div>
            </div>
            <div className="profile-form-grid">
              <label>
                College / Institution *
                <input
                  value={form.college}
                  onChange={e => update('college', e.target.value)}
                  placeholder="Your college name"
                  aria-describedby={error ? 'register-error' : undefined}
                  required
                />
              </label>
              <label>
                Current year *
                <select
                  value={form.year}
                  onChange={e => update('year', e.target.value)}
                  aria-describedby={error ? 'register-error' : undefined}
                >
                  {['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Graduate'].map(y => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="profile-field">
              <strong>Programming languages you know *</strong>
              <p>Select all that apply.</p>
              <div className="language-check-grid">
                {knownLanguages.map(language => (
                  <label key={language} className={form.languages.includes(language) ? 'checked' : ''}>
                    <input
                      type="checkbox"
                      checked={form.languages.includes(language)}
                      onChange={() => toggleLanguage(language)}
                      aria-describedby={error ? 'register-error' : undefined}
                    />
                    {language}
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="register-section">
            <div className="register-section-heading">
              <span>03</span>
              <div>
                <h2>Target companies</h2>
                <p>Choose the organisations you want to prepare for</p>
              </div>
            </div>
            <label className="profile-field">
              Target companies *
              <p>Separate company names with commas.</p>
              <textarea
                rows="2"
                value={form.companies}
                onChange={e => update('companies', e.target.value)}
                aria-describedby={error ? 'register-error' : undefined}
                required
              />
            </label>
          </section>

          {error && (
            <div id="register-error" className="profile-error" role="alert">
              {error}
            </div>
          )}

          <button className="btn-primary profile-submit" type="submit" disabled={saving}>
            {saving ? 'Creating account...' : isDemo ? 'Create account (Local Dev Only)' : 'Create account'} <span>→</span>
          </button>
        </form>

        <small className="profile-footnote">
          Already registered? <Link to="/login">Sign in here</Link>.
        </small>
      </div>
    </div>
  );
}
