import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser, showToast } = useComplaints();

  const [loginRole, setLoginRole] = useState('citizen'); // 'citizen' or 'admin'
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e?.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (loginRole === 'admin') {
        setCurrentUser({
          name: "Panchayat Admin",
          phone: "+91 98765 00001",
          citizenId: "ADM-PAN-001",
          ward: "All Wards",
          village: "Kalyanpur Gram Panchayat",
          role: "admin"
        });
        showToast("🏛️ Welcome Admin", "Logged into Panchayat Administrative Portal");
        navigate('/admin');
      } else {
        setCurrentUser({
          name: "Ramesh Kumar",
          phone: mobileNumber,
          citizenId: "CIT-IND-000124",
          ward: "Ward 5",
          village: "Kalyanpur Gram Panchayat",
          role: "citizen"
        });
        showToast("👤 Welcome Citizen", "Logged in as Ramesh Kumar (Ward 5)");
        navigate('/complaints');
      }
    }, 400);
  };

  const handleFastDemoLogin = () => {
    handleLogin();
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF'
    }}>
      {/* Left Column: Forest Green with Hindi Title & Subtitle */}
      <div style={{
        flex: 1,
        backgroundColor: '#35654B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3.2rem',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '1.25rem',
          letterSpacing: '0.5px'
        }}>
          आवाज़ सरपंच
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: '#E2EFE8',
          maxWidth: '440px',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          Voice-first AI for accessible, transparent and accountable local governance.
        </p>
      </div>

      {/* Right Column: Clean White Login Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {/* Back to Home link */}
          <Link
            to="/"
            style={{
              fontSize: '0.88rem',
              color: '#5A6D7C',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}
          >
            ← Back to Home
          </Link>

          {/* Heading */}
          <h2 style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            color: '#102333',
            marginBottom: '1.5rem'
          }}>
            Login
          </h2>

          {/* Segmented Pill Selector (Citizen / Panchayat Admin) */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1.75rem'
          }}>
            <button
              type="button"
              onClick={() => setLoginRole('citizen')}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: '8px',
                border: loginRole === 'citizen' ? '1.5px solid #35654B' : '1px solid #DDE7E2',
                backgroundColor: loginRole === 'citizen' ? '#F4F9F6' : '#FFFFFF',
                color: loginRole === 'citizen' ? '#35654B' : '#5A6D7C',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Citizen
            </button>

            <button
              type="button"
              onClick={() => setLoginRole('admin')}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: '8px',
                border: loginRole === 'admin' ? '1.5px solid #35654B' : '1px solid #DDE7E2',
                backgroundColor: loginRole === 'admin' ? '#F4F9F6' : '#FFFFFF',
                color: loginRole === 'admin' ? '#35654B' : '#5A6D7C',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Panchayat Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Mobile Number */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#5A6D7C', marginBottom: '0.4rem' }}>
                Mobile Number
              </label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #DDE7E2',
                  fontSize: '0.92rem',
                  color: '#102333',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#5A6D7C', marginBottom: '0.4rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #DDE7E2',
                  fontSize: '0.92rem',
                  color: '#102333',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>

            {/* LOGIN Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: '#35654B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.95rem',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                marginTop: '0.35rem',
                boxShadow: '0 2px 6px rgba(53, 101, 75, 0.25)'
              }}
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          {/* New here? Register with OTP */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#5A6D7C' }}>
            New here?{' '}
            <Link to="/register" style={{ color: '#35654B', fontWeight: 700, textDecoration: 'none' }}>
              Register with OTP
            </Link>
          </div>

          {/* Fast Demo Login Button */}
          <button
            type="button"
            onClick={handleFastDemoLogin}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#FFFFFF',
              color: '#102333',
              border: '1px solid #DDE7E2',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              marginTop: '1.25rem'
            }}
          >
            Fast Demo Login
          </button>
        </div>
      </div>
    </div>
  );
}
