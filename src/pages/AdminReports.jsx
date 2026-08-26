import React from 'react';
import { FileSpreadsheet, Download, Calendar, Filter } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminReports() {
  const reports = [
    { title: "Monthly Gram Sabha Civic Resolution Summary", period: "May 2026", generated: "24 May 2026", format: "PDF & XLSX", size: "2.4 MB" },
    { title: "Water Supply Pipeline Incident & Hotspot Audit", period: "Q1 2026", generated: "18 May 2026", format: "PDF", size: "4.1 MB" },
    { title: "Street Lighting Power Consumption & Maintenance Log", period: "April 2026", generated: "01 May 2026", format: "XLSX", size: "1.8 MB" },
    { title: "Citizen Grievance Verification & Satisfaction Index", period: "April 2026", generated: "30 Apr 2026", format: "PDF", size: "3.2 MB" },
  ];

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#102333' }}>Reports & Gram Sabha Exports</h1>
              <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>Official auditable documentation for District Collectorate and Block Development review</p>
            </div>
            <button className="btn btn-primary btn-sm">
              <FileSpreadsheet size={15} /> Generate New Audit Log
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reports.map((r, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#E8F5EF', color: '#087A55', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileSpreadsheet size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#102333' }}>{r.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#5A6D7C', marginTop: '2px' }}>
                      Period: <strong style={{ color: '#102333' }}>{r.period}</strong> • Generated on {r.generated} • {r.format} ({r.size})
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Downloading ${r.title}`)}
                  className="btn btn-outline-green btn-sm"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
