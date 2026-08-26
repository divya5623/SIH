import React from 'react';
import { Users, UserCheck, Shield, Phone, MapPin } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminUsers() {
  const citizenUsers = [
    { name: "Ramesh Kumar", id: "CIT-IND-000124", ward: "Ward 5", phone: "+91 98765 43210", complaintsCount: 3, joined: "Jan 2026" },
    { name: "Suresh Patil", id: "CIT-IND-000125", ward: "Ward 2", phone: "+91 98765 43211", complaintsCount: 1, joined: "Feb 2026" },
    { name: "Anjali Devi", id: "CIT-IND-000126", ward: "Ward 3", phone: "+91 98765 43212", complaintsCount: 2, joined: "Mar 2026" },
    { name: "Vikram Singh", id: "CIT-IND-000127", ward: "Ward 1", phone: "+91 98765 43213", complaintsCount: 4, joined: "Jan 2026" },
    { name: "Meena Bai", id: "CIT-IND-000128", ward: "Ward 4", phone: "+91 98765 43214", complaintsCount: 1, joined: "Apr 2026" },
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
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#102333' }}>Registered Village Citizens</h1>
            <p style={{ fontSize: '0.9rem', color: '#5A6D7C' }}>Aadhaar/Mobile verified identity directory for Kalyanpur Gram Panchayat</p>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Citizen Name</th>
                  <th>Citizen ID</th>
                  <th>Ward</th>
                  <th>Phone Number</th>
                  <th>Complaints Lodged</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {citizenUsers.map(u => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 700, color: '#102333' }}>{u.name}</td>
                    <td style={{ color: '#087A55', fontFamily: 'monospace', fontWeight: 700 }}>{u.id}</td>
                    <td>{u.ward}</td>
                    <td>{u.phone}</td>
                    <td style={{ fontWeight: 700 }}>{u.complaintsCount}</td>
                    <td style={{ color: '#5A6D7C', fontSize: '0.85rem' }}>{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
