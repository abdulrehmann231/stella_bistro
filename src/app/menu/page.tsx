"use client";

import { useEffect, useState, useMemo } from 'react';

interface MenuItem {
  index: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

const ITEMS_PER_PAGE = 9;

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetch('/stella-bistro-menu.json')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        const cats = new Set<string>(['All']);
        data.forEach((item: MenuItem) => cats.add(categorizeItem(item.name)));
        setCategories(Array.from(cats));
      })
      .catch(console.error);
  }, []);

  const categorizeItem = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('burger')) return 'Burgers';
    if (lowerName.includes('pizza')) return 'Pizzas';
    if (lowerName.includes('sandwich')) return 'Sandwiches';
    if (lowerName.includes('karahi') || lowerName.includes('handi')) return 'Traditional';
    if (lowerName.includes('tikka') || lowerName.includes('boti') || lowerName.includes('kabab')) return 'BBQ';
    if (lowerName.includes('shake') || lowerName.includes('mojito') || lowerName.includes('mocktail') || lowerName.includes('tea') || lowerName.includes('coffee') || lowerName.includes('lime') || lowerName.includes('cooler')) return 'Beverages';
    if (lowerName.includes('chilli') || lowerName.includes('manchurian') || lowerName.includes('schezwan') || lowerName.includes('chow mein') || lowerName.includes('fried rice')) return 'Chinese';
    if (lowerName.includes('fries') || lowerName.includes('dynamite') || lowerName.includes('wings') || lowerName.includes('strip')) return 'Appetizers';
    return 'Others';
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const filteredMenu = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || categorizeItem(item.name) === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredMenu.length / ITEMS_PER_PAGE);
  const paginatedMenu = filteredMenu.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="bg-light min-h-screen pb-10" style={{ paddingBottom: '10rem' }}>
      <div className="menu-header">
        <div className="container animate-fade-in">
          <h1 className="section-title text-primary" style={{ color: 'var(--primary)' }}>Our Menu</h1>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '500px', color: 'var(--text-muted)' }}>
            A curated selection of extraordinary culinary delights.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="menu-controls animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search for a dish..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="menu-categories">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {menuItems.length === 0 ? (
            <div className="text-center w-full col-span-full py-10" style={{ gridColumn: '1 / -1', marginTop: '3rem', color: 'var(--text-muted)' }}>
              Loading culinary experiences...
            </div>
          ) : paginatedMenu.length === 0 ? (
            <p className="text-center w-full col-span-full py-10" style={{ gridColumn: '1 / -1', marginTop: '3rem' }}>
              No dishes found matching your criteria.
            </p>
          ) : (
            paginatedMenu.map((item) => {
              const imageUrl = item.image && item.image.trim() !== '' 
                ? item.image 
                : '/assets/dish.png';
              
              return (
                <div key={item.index} className="menu-item">
                  <div className="menu-item-img-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt={item.name} className="menu-item-img" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = '/assets/dish.png'; }} />
                  </div>
                  <div className="menu-item-header">
                    <h3 className="menu-item-title">{item.name}</h3>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <p className="menu-item-desc">{item.description}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button 
              className="page-btn" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button 
              className="page-btn" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
