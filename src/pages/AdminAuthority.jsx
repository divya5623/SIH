import React from 'react';
import { ShieldCheck, Users, Phone, Mail, CheckCircle2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminAuthority() {
  const departments = [
    { name: "Water Supply Department", head: "Shri Rajesh Patel (Junior Engineer)", staff: 8, openIssues: 6, resolved: 42, phone: "+91 94250 11223" },
    { name: "Electrical & Lighting Cell", head: "Smt. Sunita Verma (Supervisor)", staff: 5, openIssues: 4, resolved: 27, phone: "+91 94250 22334" },
    { name: "Sanitation & Waste Management", head: "Shri Mohan Lal (Nodal Officer)", staff: 12, openIssues: 2, resolved: 16, phone: "+91 94250 33445" },
    { name: "Public Works & Roads (PWD)", head: "Er. Amit Deshmukh (Asst Engineer)", staff: 6, openIssues: 5, resolved: 18, phone: "+91 94250 44556" }
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
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#102333' }}>Department Authorities</h1>
            <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>Designated officers and field crews assigned to automated grievance routing</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {departments.map((dept, idx) => (
              <div key={idx} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#E8F5EF', color: '#087A55', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#102333' }}>{dept.name}</h3>
                    <span style={{ fontSize: '0.78rem', color: '#087A55', fontWeight: 600 }}>Active Authority</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.88rem', color: '#5A6D7C', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#102333' }}>In-charge:</strong> {dept.head}
                </div>

                <div style={{ fontSize: '0.85rem', color: '#5A6D7C', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                  <Phone size={14} color="#087A55" />
                  {dept.phone}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F8FAF9', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #EBF1EE' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#8A9CA8', fontWeight: 700 }}>FIELD STAFF</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#102333' }}>{dept.staff} workers</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#8A9CA8', fontWeight: 700 }}>ACTIVE</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#B46B00' }}>{dept.openIssues}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#8A9CA8', fontWeight: 700 }}>RESOLVED</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#087A55' }}>{dept.resolved}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
