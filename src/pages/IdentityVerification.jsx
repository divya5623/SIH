import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, Phone, KeyRound, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useComplaints } from '../context/ComplaintContext';

export default function IdentityVerification() {
  const navigate = useNavigate();
  const { setCurrentUser } = useComplaints();

  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerified(true);
    setCurrentUser({
      name: "Ramesh Kumar",
      phone: `+91 ${mobileNumber}`,
      citizenId: "CIT-IND-000124",
      ward: "Ward 5",
      village: "Kalyanpur Gram Panchayat",
      role: "citizen"
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleProceed = () => {
    navigate('/complaints');
  };

  return (
    <div style={{ backgroundColor: '#F7FAF8', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      <div className="page-wrapper-sm">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            backgroundColor: '#E8F5EF',
            color: '#087A55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <ShieldCheck size={28} strokeWidth={2.4} />
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#102333',
            marginBottom: '0.35rem',
            letterSpacing: '-0.3px'
          }}>
            Verify Your Identity
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#5A6D7C', fontWeight: 500 }}>
            This is a demonstration for prototype.
          </p>
        </div>

        {/* VERIFICATION CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDE7E2',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 8px 24px rgba(16, 35, 51, 0.05)',
          maxWidth: '520px',
          margin: '0 auto'
        }}>
          {!isVerified ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Step 1: Mobile Number Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#102333', marginBottom: '0.5rem' }}>
                  Enter Mobile Number
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#5A6D7C', fontSize: '0.9rem', fontWeight: 600 }}>
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="98765 43210"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        borderRadius: '10px',
                        border: '1px solid #DDE7E2',
                        fontSize: '0.95rem',
                        color: '#102333',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                        fontWeight: 600
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="btn btn-outline-green"
                    style={{ padding: '0.75rem 1.25rem', whiteSpace: 'nowrap', fontSize: '0.85rem' }}
                  >
                    {otpSent ? "RESEND OTP" : "SEND OTP"}
                  </button>
                </div>
              </div>

              {/* Step 2: OTP Input Boxes */}
              {otpSent && (
                <div style={{
                  backgroundColor: '#F8FAF9',
                  border: '1px solid #E2EBE6',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  animation: 'pulseWave 0.3s ease-out'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#102333' }}>
                      Enter OTP
                    </label>
                    <span style={{ fontSize: '0.78rem', color: '#087A55', fontWeight: 600 }}>
                      Demo OTP pre-filled
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        style={{
                          width: '44px',
                          height: '50px',
                          borderRadius: '8px',
                          border: '2px solid #087A55',
                          textAlign: 'center',
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: '#102333',
                          backgroundColor: '#FFFFFF',
                          outline: 'none'
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerify}
                    className="btn btn-primary btn-full"
                    style={{
                      padding: '0.85rem',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      boxShadow: '0 4px 14px rgba(8, 122, 85, 0.25)'
                    }}
                  >
                    VERIFY & CONTINUE
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* SUCCESS CARD */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#E8F6EF',
                color: '#087A55',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 4px 14px rgba(8, 122, 85, 0.25)'
              }}>
                <CheckCircle2 size={36} strokeWidth={2.6} />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#102333', marginBottom: '0.25rem' }}>
                Identity Verified Successfully!
              </h2>

              <p style={{ fontSize: '0.88rem', color: '#5A6D7C', marginBottom: '1.5rem' }}>
                Your unique citizen ID
              </p>

              {/* Large Citizen ID Badge */}
              <div style={{
                backgroundColor: '#F3FAF6',
                border: '2px dashed #087A55',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                display: 'inline-block',
                marginBottom: '2rem'
              }}>
                <div style={{
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: '#087A55',
                  letterSpacing: '1px',
                  fontFamily: 'monospace'
                }}>
                  CIT-IND-000124
                </div>
              </div>

              {/* Green Proceed to Dashboard button */}
              <button
                type="button"
                onClick={handleProceed}
                className="btn btn-primary btn-full"
                style={{
                  padding: '0.9rem',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 16px rgba(8, 122, 85, 0.3)'
                }}
              >
                PROCEED TO DASHBOARD
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
