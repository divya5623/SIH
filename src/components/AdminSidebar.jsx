import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  ShieldCheck, 
  BarChart3, 
  AlertTriangle, 
  FileSpreadsheet, 
  Users, 
  Settings, 
  LogOut,
  Shield,
  ArrowLeft
} from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Complaints', path: '/admin/complaints', icon: FileText },
    { name: 'Authority', path: '/admin/authority', icon: ShieldCheck },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Recurring Issues', path: '/admin/recurring', icon: AlertTriangle },
    { name: 'Reports', path: '/admin/reports', icon: FileSpreadsheet },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
      {/* Sidebar Header */}
      <div className="admin-sidebar-header">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '38px',
            height: '38px',
            background: 'linear-gradient(135deg, #087A55, #07563F)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0
          }}>
            <Shield size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.5px' }}>
              <span style={{ color: '#1DB37B' }}>AWAAZ</span> SARPANCH
            </div>
            <div style={{ fontSize: '0.68rem', color: '#8EA4B8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              ADMIN PORTAL
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <div style={{ margin: '1rem 0', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Back to Citizen View */}
        <Link
          to="/"
          className="admin-nav-item"
          style={{ color: '#8EA4B8', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Citizen Portal</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="admin-nav-item"
          style={{
            background: 'none',
            border: 'none',
            textAlign: 'left',
            width: '100%',
            color: '#FF7676',
            marginTop: 'auto'
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
