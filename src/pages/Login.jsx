import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Phone, UserCheck, Shield } from 'lucide-react';
import VillageIllustration from '../components/VillageIllustration';
import { useComplaints } from '../context/ComplaintContext';

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useComplaints();

  const [loginType, setLoginType] = useState('Citizen'); // 'Citizen', 'Panchayat Admin'
  const [mobile, setMobile] = useState('9876543210');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (loginType === 'Panchayat Admin') {
        setCurrentUser({
          name: "Panchayat Admin",
          phone: "+91 98765 00001",
          citizenId: "ADM-PAN-001",
          ward: "All Wards",
          village: "Kalyanpur Gram Panchayat",
          role: "admin"
        });
        navigate('/admin');
      } else {
        setCurrentUser({
          name: "Ramesh Kumar",
          phone: `+91 ${mobile || '98765 43210'}`,
          citizenId: "CIT-IND-000124",
          ward: "Ward 5",
          village: "Kalyanpur Gram Panchayat",
          role: "citizen"
        });
        navigate('/complaints');
      }
    }, 500);
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
      <div className="page-wrapper-lg" style={{ padding: '2rem 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          maxWidth: '1050px',
          margin: '0 auto'
        }}>
          {/* Left Side: Village Illustration */}
          <div style={{ textAlign: 'center' }}>
            <VillageIllustration />
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#102333' }}>
                <span style={{ color: '#087A55' }}>AWAAZ</span> SARPANCH
              </div>
              <p style={{ fontSize: '0.88rem', color: '#5A6D7C', marginTop: '4px' }}>
                Empowering every rural citizen through AI-driven voice reporting.
              </p>
            </div>
          </div>

          {/* Right Side: White Login Card */}
          <div>
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #DDE7E2',
              borderRadius: '20px',
              padding: '2.5rem 2.25rem',
              boxShadow: '0 8px 30px rgba(16, 35, 51, 0.07)',
              maxWidth: '440px',
              margin: '0 auto'
            }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#102333', marginBottom: '0.3rem' }}>
                  Welcome Back!
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>
                  Login to your account
                </p>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Login Type Dropdown */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.4rem' }}>
                    Login Type
                  </label>
                  <select
                    value={loginType}
                    onChange={(e) => setLoginType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #DDE7E2',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#102333',
                      backgroundColor: '#F8FAF9',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Citizen">Citizen</option>
                    <option value="Panchayat Admin">Panchayat Admin</option>
                  </select>
                </div>

                {/* Mobile Number */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.4rem' }}>
                    Mobile Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#8A9CA8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.4rem',
                        borderRadius: '10px',
                        border: '1px solid #DDE7E2',
                        fontSize: '0.9rem',
                        color: '#102333',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#102333' }}>
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => { e.preventDefault(); alert("An OTP has been sent to your registered mobile number."); }}
                      style={{ fontSize: '0.8rem', color: '#087A55', fontWeight: 600 }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} color="#8A9CA8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 2.4rem',
                        borderRadius: '10px',
                        border: '1px solid #DDE7E2',
                        fontSize: '0.9rem',
                        color: '#102333',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#8A9CA8',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-full"
                  style={{
                    padding: '0.85rem',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.5px',
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 14px rgba(8, 122, 85, 0.28)'
                  }}
                >
                  {loading ? "LOGGING IN..." : "LOGIN"}
                </button>
              </form>

              {/* Bottom Register Link */}
              <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.88rem', color: '#5A6D7C' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#087A55', fontWeight: 700, textDecoration: 'none' }}>
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
