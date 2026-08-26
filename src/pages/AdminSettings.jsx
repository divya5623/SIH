import React, { useState } from 'react';
import { Settings, Save, Bell, Shield, Database, RefreshCw, CheckCircle } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { useComplaints } from '../context/ComplaintContext';

export default function AdminSettings() {
  const { resetAllData } = useComplaints();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    autoAssign: true,
    smsAlerts: true,
    escalationDays: "3",
    sarpanchNotification: true,
    languageModel: "IndicVoice-v4-Multilingual",
    clusterThreshold: "5"
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all mock complaint records to initial state?")) {
      resetAllData();
      alert("Mock data reset successfully.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#E8F5EF', color: '#087A55', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>PA</div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>Panchayat Admin</div>
              <div style={{ fontSize: '0.72rem', color: '#5A6D7C' }}>Kalyanpur Gram Panchayat</div>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#102333' }}>Panchayat Portal Settings</h1>
            <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>Configure AI classification models, escalation thresholds and automated routing rules</p>
          </div>

          {saved && (
            <div style={{ backgroundColor: '#E8F6EF', color: '#087A55', padding: '0.75rem 1.25rem', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <CheckCircle size={18} />
              Portal settings saved successfully!
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333', marginBottom: '1.25rem' }}>AI Triage & Classification Engine</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.35rem' }}>Active Dialect AI Model</label>
                  <select
                    value={settings.languageModel}
                    onChange={(e) => setSettings({ ...settings, languageModel: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  >
                    <option value="IndicVoice-v4-Multilingual">IndicVoice-v4-Multilingual (Default - 12 Dialects)</option>
                    <option value="Bhashini-ASR-Rural-v2">Bhashini-ASR-Rural-v2</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.35rem' }}>Recurring Hotspot Cluster Threshold</label>
                  <input
                    type="number"
                    value={settings.clusterThreshold}
                    onChange={(e) => setSettings({ ...settings, clusterThreshold: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#8A9CA8' }}>Min complaints in 500m radius to trigger cluster alert</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>Auto-assign to Department</div>
                    <div style={{ fontSize: '0.78rem', color: '#5A6D7C' }}>Direct work-order dispatch without manual triage</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoAssign}
                    onChange={(e) => setSettings({ ...settings, autoAssign: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#087A55' }}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#102333', marginBottom: '1.25rem' }}>Escalation & Citizen Notifications</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#102333', marginBottom: '0.35rem' }}>Auto-Escalate to BDO if Unresolved for (Days)</label>
                  <input
                    type="number"
                    value={settings.escalationDays}
                    onChange={(e) => setSettings({ ...settings, escalationDays: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #DDE7E2', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>SMS Broadcast to Citizen</div>
                    <div style={{ fontSize: '0.78rem', color: '#5A6D7C' }}>Send SMS milestone updates at each progress step</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.smsAlerts}
                    onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#087A55' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#102333' }}>Daily Sarpanch Digest</div>
                    <div style={{ fontSize: '0.78rem', color: '#5A6D7C' }}>Morning summary of unresolved high priority issues</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.sarpanchNotification}
                    onChange={(e) => setSettings({ ...settings, sarpanchNotification: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#087A55' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline"
              style={{ borderColor: '#E94B4B', color: '#E94B4B' }}
            >
              <RefreshCw size={15} />
              Reset Demo Data
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              <Save size={16} />
              Save Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
