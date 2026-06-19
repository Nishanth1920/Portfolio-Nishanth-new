import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    onLogin();
  };

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: 24,
    }}>
      <form onSubmit={handleLogin} className="login-card" style={{
        width: '100%',
        maxWidth: 400,
        padding: 40,
        borderRadius: 16,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
          Admin Login
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 28 }}>
          Sign in to manage your portfolio content
        </p>

        {error && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#ef4444',
            fontSize: '0.85rem',
            marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 10,
              background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
              color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none',
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 10,
              background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
              color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none',
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '14px 24px', fontSize: '0.95rem', fontWeight: 600,
            borderRadius: 9999, border: 'none', background: 'var(--gradient-main)',
            color: '#fff', cursor: 'pointer', opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <style>{`
        .login-card input:focus {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 12%, transparent) !important;
        }
        @media (max-width: 480px) {
          .login-page { padding: 16px !important; }
          .login-card { padding: 28px 24px !important; }
        }
        @media (max-width: 360px) {
          .login-card { padding: 24px 18px !important; border-radius: 12px !important; }
        }
      `}</style>
    </div>
  );
}
