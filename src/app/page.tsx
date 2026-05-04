import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <header className="hero" style={{ backgroundImage: "url('/assets/dish.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title" style={{ color: 'white' }}>A Taste of Elegance</h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Experience the finest blend of authentic flavors and modern gastronomy in a beautiful, airy setting.
          </p>
          <div className="hero-buttons">
            <Link href="/menu" className="btn-primary">View Menu</Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="section-padding">
        <div className="container about-grid">
          <div className="animate-fade-in">
            <h2 className="section-title">Our Culinary Philosophy</h2>
            <p className="mb-2" style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              At Stella Bistro, dining is more than a meal—it&apos;s a journey. We bring you a curated multi-cuisine menu that ranges from gourmet smash burgers to authentic handi and refreshing mocktails.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              Every dish is crafted with the freshest ingredients, unparalleled passion, and an eye for perfection. Our luminous, elegantly designed interior provides the perfect ambiance for your memorable moments.
            </p>
            <Link href="/menu" className="btn-dark mt-3">Discover Our Food</Link>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div style={{ width: '100%', height: '400px', backgroundImage: "url('/assets/hero.png')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px' }}></div>
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="section-padding bg-dark text-center">
        <div className="container animate-fade-in">
          <h2 className="section-title text-primary" style={{ color: 'var(--primary)' }}>Join Us For Dinner</h2>
          <p className="section-subtitle" style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Whether it&apos;s a romantic evening or a gathering with loved ones, Stella Bistro offers an unforgettable dining experience.
          </p>
          <Link href="/menu" className="btn-primary">Explore Menu</Link>
        </div>
      </section>
    </main>
  );
}
