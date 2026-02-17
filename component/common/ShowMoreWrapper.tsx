import { useState, useRef, useLayoutEffect, useEffect, ReactNode } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ShowMoreWrapperProps {
  showMoreCount?: number;
  children: ReactNode;
  /** 컨텐츠 div에 적용할 CSS 클래스 (예: 'card-grid-3') */
  className?: string;
}

export function ShowMoreWrapper({ showMoreCount, children, className }: ShowMoreWrapperProps) {
  const [expanded, setExpanded] = useState(false);
  const [clipHeight, setClipHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isActive = showMoreCount != null && showMoreCount > 0;

  useIsomorphicLayoutEffect(() => {
    if (!isActive || expanded || !contentRef.current) {
      setClipHeight(null);
      return;
    }

    const items = Array.from(contentRef.current.children);
    if (items.length <= showMoreCount!) {
      setClipHeight(null);
      return;
    }

    const containerRect = contentRef.current.getBoundingClientRect();
    const nthItem = items[showMoreCount! - 1] as HTMLElement;
    const nextItem = items[showMoreCount!] as HTMLElement;

    if (!nthItem || !nextItem) {
      setClipHeight(null);
      return;
    }

    const nthBottom = nthItem.getBoundingClientRect().bottom - containerRect.top;
    const nextHeight = nextItem.getBoundingClientRect().height;
    const peekAmount = Math.min(nextHeight * 0.35, 80);

    setClipHeight(nthBottom + peekAmount);
  }, [isActive, expanded, showMoreCount]);

  if (!isActive) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  const isClipped = clipHeight !== null && !expanded;

  return (
    <div className="show-more-wrapper">
      <div
        ref={contentRef}
        className={['show-more-content', isClipped && 'show-more-content--clipped', className]
          .filter(Boolean)
          .join(' ')}
        style={isClipped ? { maxHeight: `${clipHeight}px` } : undefined}
      >
        {children}
      </div>
      {isClipped && <div className="show-more-gradient" />}
      {(isClipped || expanded) && (
        <button
          className="show-more-toggle"
          onClick={() => setExpanded((prev) => !prev)}
          type="button"
        >
          {expanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
}
