import { PropsWithChildren, useEffect, useRef, useState } from 'react';

export function SectionAnimate({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : 'translateY(12px)',
    transition: 'opacity var(--transition-enter), transform var(--transition-enter)',
  };

  return (
    <div ref={ref} className="section-animate" style={style}>
      {children}
    </div>
  );
}
