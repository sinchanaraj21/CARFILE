
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MEDICAL_DISCLAIMER } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About Us', path: '/about' },
    { name: 'Predict Now', path: '/predict' },
    { name: 'Check Ups', path: '/checkups' },
    { name: 'Health Tips', path: '/tips' },
    { name: 'Contact Us', path: '/contact' },
  ];

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-50 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="flex items-center gap-2">
                <svg className="w-8 h-8 text-[#c52828]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-2xl font-black tracking-tighter text-[#c52828] uppercase">CARDEON</span>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center bg-gray-50 rounded-2xl p-1 gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${
                    location.pathname === link.path 
                      ? 'bg-white text-red-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {children}
      </main>

      <footer className="border-t border-gray-50 py-12 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">© 2024 Cardeon Clinical Analytics Ecosystem</p>
          <p className="text-[10px] text-gray-400 max-w-2xl mx-auto italic">
            {MEDICAL_DISCLAIMER}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
