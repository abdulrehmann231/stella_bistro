"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = scrolled || pathname !== '/';

  return (
    <nav className={`navbar ${isDark ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/assets/logo.png" 
            alt="Stella Bistro Logo" 
            style={{ 
              height: '65px', 
              width: '65px', 
              objectFit: 'cover', 
              borderRadius: '50%', 
              border: '2px solid var(--primary)' 
            }} 
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/menu" className="nav-link">Menu</Link>
        </div>
        <Link href="/menu" className="btn-primary">Order Now</Link>
      </div>
    </nav>
  );
}
