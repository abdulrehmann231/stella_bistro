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
        <Link href="/" className="logo" style={isDark ? { color: 'var(--text-dark)' } : {}}>
          Stella
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link" style={isDark ? { color: 'var(--text-dark)' } : {}}>Home</Link>
          <Link href="/menu" className="nav-link" style={isDark ? { color: 'var(--text-dark)' } : {}}>Menu</Link>
        </div>
        <Link href="/menu" className="btn-primary">Order Now</Link>
      </div>
    </nav>
  );
}
