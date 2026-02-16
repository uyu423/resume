import { useEffect, useState } from 'react';

interface NavItem {
  id: string;
  title: string;
}

export function FloatingNav() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 992);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[aria-labelledby]');
    const navItems: NavItem[] = [];
    sections.forEach((section) => {
      const labelId = section.getAttribute('aria-labelledby');
      if (labelId) {
        const heading = document.getElementById(labelId);
        if (heading) {
          navItems.push({
            id: labelId,
            title: heading.textContent || '',
          });
        }
      }
    });
    setItems(navItems);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const labelId = entry.target.getAttribute('aria-labelledby');
            if (labelId) setActiveId(labelId);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    const sections = document.querySelectorAll('section[aria-labelledby]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const heading = document.getElementById(id);
    if (heading) {
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isDesktop || items.length === 0) return null;

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    right: '24px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 100,
    opacity: visible ? 1 : 0,
    transition: 'opacity var(--transition-slow)',
    pointerEvents: visible ? 'auto' : 'none',
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  return (
    <nav className="floating-nav" style={navStyle} aria-label="Section navigation">
      <ul style={listStyle}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} style={{ marginBottom: '8px' }}>
              <button
                onClick={() => handleClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  borderRight: isActive
                    ? '2px solid var(--color-accent)'
                    : '2px solid transparent',
                  textAlign: 'right',
                  display: 'block',
                  width: '100%',
                  transition: 'all var(--transition-fast)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
