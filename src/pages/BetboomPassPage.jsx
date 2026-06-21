import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function BeforeAfterSlider({ before, after }) {
  const [position, setPosition] = useState(50);
  const [animated, setAnimated] = useState(false);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  // hint animation on mount: 50 → 25 → 75 → 50
  useEffect(() => {
    const steps = [[700, 25], [1250, 75], [1800, 50]];
    const timers = steps.map(([delay, pos]) =>
      setTimeout(() => { setAnimated(true); setPosition(pos); }, delay)
    );
    const reset = setTimeout(() => setAnimated(false), 2400);
    return () => { [...timers, reset].forEach(clearTimeout); };
  }, []);

  const animateTo = useCallback((target) => {
    setAnimated(true);
    setPosition(target);
    setTimeout(() => setAnimated(false), 420);
  }, []);

  const updatePosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const stopAnimation = () => setAnimated(false);
  const onMouseDown = (e) => { e.preventDefault(); stopAnimation(); dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) updatePosition(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchStart = () => { stopAnimation(); dragging.current = true; };
  const onTouchMove = (e) => updatePosition(e.touches[0].clientX);
  const onTouchEnd = () => { dragging.current = false; };

  const activeTab = position <= 45 ? 'before' : position >= 55 ? 'after' : null;
  const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
  const movingStyle = animated ? { transition: `clip-path 0.52s ${easing}` } : {};
  const handleStyle = animated
    ? { left: `${position}%`, transition: `left 0.52s ${easing}` }
    : { left: `${position}%` };

  return (
    <div className="case-ba-wrap">
      <div className="case-ba-tabs">
        <button
          className={`case-ba-tab${activeTab === 'before' ? ' is-active' : ''}`}
          onClick={() => animateTo(5)}
        >
          До
        </button>
        <button
          className={`case-ba-tab${activeTab === 'after' ? ' is-active' : ''}`}
          onClick={() => animateTo(95)}
        >
          После
        </button>
      </div>
      <div
        ref={containerRef}
        className="case-ba-slider"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img className="case-ba-slider__img" src={after.src} alt={after.alt} draggable={false} />
        <img
          className="case-ba-slider__before"
          src={before.src}
          alt={before.alt}
          draggable={false}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, ...movingStyle }}
        />
        <div
          className="case-ba-slider__handle"
          style={handleStyle}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <div className="case-ba-slider__line" />
          <div className="case-ba-slider__grip" aria-label="Перетащите для сравнения">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7 5L2 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 5L18 10L13 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatGrid({ items, className = '' }) {
  return (
    <div className={`case-stat-grid${className ? ` ${className}` : ''}`}>
      {items.map((item) => (
        <div key={`${item.value}-${item.label}`} className="case-stat-card">
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function ContentBlock({ block }) {
  if (block.type === 'list' || block.type === 'ordered-list') {
    const ListTag = block.type === 'ordered-list' ? 'ol' : 'ul';

    return (
      <section className="case-content-block">
        <h3>{block.heading}</h3>
        <ListTag className="case-bullet-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ListTag>
      </section>
    );
  }

  if (block.type === 'stats') {
    return (
      <section className="case-content-block">
        <h3>{block.heading}</h3>
        <StatGrid items={block.stats} className="case-stat-grid--compact" />
      </section>
    );
  }

  return (
    <section className="case-content-block">
      <h3>{block.heading}</h3>
      <div className="case-rich-text">
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function CaseMedia({ media, className = '' }) {
  if (media.type === 'video') {
    return (
      <video
        className={className}
        src={media.src}
        aria-label={media.alt}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return <img className={className} src={media.src} alt={media.alt} />;
}

function Collapsible({ part }) {
  const [isOpen, setIsOpen] = useState(false);
  const ListTag = part.listType === 'ordered' ? 'ol' : 'ul';

  return (
    <div className={`case-collapsible${isOpen ? ' is-open' : ''}`}>
      <button
        className="case-collapsible__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="case-collapsible__title">{part.title}</span>
        <svg
          className="case-collapsible__icon"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="case-collapsible__body">
        {part.items?.length ? (
          <ListTag className="case-bullet-list">
            {part.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ListTag>
        ) : null}
        {part.paragraphs?.length ? (
          <div className="case-rich-text" style={{ marginTop: part.items?.length ? '16px' : 0 }}>
            {part.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PainCards({ part }) {
  return (
    <div className="case-pain-section">
      {part.heading ? <h3>{part.heading}</h3> : null}
      <div className="case-pain-cards">
        {part.items.map((item, index) => (
          <div key={item} className="case-pain-card">
            <span className="case-pain-card__num">0{index + 1}</span>
            <p className="case-pain-card__text">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightCards({ part }) {
  return (
    <div className="case-insight-section">
      {part.heading ? <h3>{part.heading}</h3> : null}
      <div className="case-insight-cards">
        {part.items.map((item) => (
          <div key={item} className="case-insight-card">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoteCard({ card }) {
  const ListTag = card.listType === 'ordered' ? 'ol' : 'ul';

  const body = (
    <>
      {card.items?.length ? (
        <ListTag className="case-bullet-list">
          {card.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ListTag>
      ) : null}
      {card.paragraphs?.length ? (
        <div className="case-rich-text">
          {card.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </>
  );

  return (
    <div className={`case-note-card${card.compact ? ' case-note-card--compact' : ''}`}>
      {card.title ? <h3>{card.title}</h3> : null}
      {card.icon ? (
        <div className="case-note-card__icon-row">
          <span className="case-note-card__icon" aria-hidden="true">{card.icon}</span>
          <div>{body}</div>
        </div>
      ) : body}
    </div>
  );
}

function SectionPart({ part }) {
  if (part.type === 'richTextLead') {
    return (
      <div className="case-rich-text case-rich-text--lead">
        {part.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (part.type === 'blocks') {
    return (
      <div className="case-study-stack">
        {part.blocks.map((block) => (
          <ContentBlock key={`${block.type}-${block.heading}`} block={block} />
        ))}
      </div>
    );
  }

  if (part.type === 'imageBand') {
    return (
      <div className="case-image-band">
        {part.label ? <span>{part.label}</span> : null}
        <CaseMedia
          media={part.media}
          className={part.media.type === 'video' ? 'case-image-band__video' : undefined}
        />
      </div>
    );
  }

  if (part.type === 'featureMedia') {
    return (
      <div
        className={`case-feature-media${part.wide ? ' case-feature-media--wide' : ''}`}
      >
        <CaseMedia media={part.media} />
      </div>
    );
  }

  if (part.type === 'noteCard') {
    return <NoteCard card={part} />;
  }

  if (part.type === 'collapsible') {
    return <Collapsible part={part} />;
  }

  if (part.type === 'painCards') {
    return <PainCards part={part} />;
  }

  if (part.type === 'insightCards') {
    return <InsightCards part={part} />;
  }

  if (part.type === 'phonePair') {
    return (
      <div className="case-image-band">
        {part.label ? <span>{part.label}</span> : null}
        <div className="case-phone-pair">
          {part.items.map((item, i) => (
            <div key={i} className="case-phone-pair__item">
              {item.type === 'video' ? (
                <video
                  ref={el => { if (el) el.playbackRate = 0.67; }}
                  src={item.src}
                  aria-label={item.alt}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img src={item.src} alt={item.alt} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (part.type === 'beforeAfterSlider') {
    return <BeforeAfterSlider before={part.before} after={part.after} />;
  }

  if (part.type === 'siteLink') {
    return (
      <div className="case-site-link">
        <span>{part.label || 'Сайт проекта'}</span>
        <a href={part.href} target="_blank" rel="noopener noreferrer">
          {part.text || part.href}
        </a>
      </div>
    );
  }

  return null;
}

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="case-lightbox" onClick={onClose}>
      <button className="case-lightbox__close" onClick={onClose} aria-label="Закрыть">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <img
        className="case-lightbox__img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export function CaseStudyPage({ caseStudy }) {
  const sections = useMemo(() => caseStudy.sections, [caseStudy.sections]);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '');
  const [lightbox, setLightbox] = useState(null);

  const handleImgClick = useCallback((e) => {
    if (e.target.tagName === 'IMG' && !e.target.closest('.case-ba-slider')) {
      setLightbox({ src: e.target.src, alt: e.target.alt });
    }
  }, []);
  const [isFloatingBackVisible, setIsFloatingBackVisible] = useState(false);
  const [navStyles, setNavStyles] = useState({});
  const [navInnerStyles, setNavInnerStyles] = useState({});
  const heroBackLinkRef = useRef(null);
  const layoutRef = useRef(null);
  const navRef = useRef(null);
  const navInnerRef = useRef(null);
  const contentRef = useRef(null);
  const firstSectionRef = useRef(null);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (!sectionElements.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const headerOffset = window.innerWidth <= 1024 ? 120 : 152;
      const currentY = window.scrollY + headerOffset;

      let nextActiveSection = sectionElements[0]?.id ?? sections[0]?.id ?? '';

      sectionElements.forEach((element) => {
        const elementTop = window.scrollY + element.getBoundingClientRect().top;

        if (currentY >= elementTop) {
          nextActiveSection = element.id;
        }
      });

      setActiveSection(nextActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sections]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncNavPosition = () => {
      const navElement = navRef.current;
      const navInnerElement = navInnerRef.current;
      const contentElement = contentRef.current;
      const layoutElement = layoutRef.current;
      const firstSectionElement = firstSectionRef.current;

      if (
        !navElement ||
        !navInnerElement ||
        !contentElement ||
        !layoutElement ||
        !firstSectionElement
      ) {
        return;
      }

      const isMobile = window.innerWidth <= 1024;

      if (isMobile) {
        setNavStyles({});
        setNavInnerStyles({});
        return;
      }

      const topOffset = isMobile ? 108 : 132;
      const navRect = navElement.getBoundingClientRect();
      const navHeight = navInnerElement.offsetHeight;
      const firstSectionTop =
        window.scrollY + firstSectionElement.getBoundingClientRect().top;
      const contentHeight = contentElement.offsetHeight;
      const contentBottom =
        window.scrollY + contentElement.getBoundingClientRect().top + contentHeight;
      const fixedStart = firstSectionTop - topOffset;
      const fixedEnd = contentBottom - topOffset - navHeight;

      setNavStyles({ minHeight: `${contentHeight}px` });

      if (window.scrollY <= fixedStart) {
        setNavInnerStyles({});
        return;
      }

      if (window.scrollY >= fixedEnd) {
        setNavInnerStyles({
          position: 'absolute',
          top: `${Math.max(contentHeight - navHeight, 0)}px`,
          left: '0',
          width: '100%',
        });
        return;
      }

      setNavInnerStyles({
        position: 'fixed',
        top: `${topOffset}px`,
        left: `${navRect.left}px`,
        width: `${navRect.width}px`,
      });
    };

    syncNavPosition();
    window.addEventListener('scroll', syncNavPosition, { passive: true });
    window.addEventListener('resize', syncNavPosition);

    return () => {
      window.removeEventListener('scroll', syncNavPosition);
      window.removeEventListener('resize', syncNavPosition);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const getHeaderHeight = () => {
      const rootStyles = window.getComputedStyle(document.documentElement);
      const headerHeight = Number.parseFloat(
        rootStyles.getPropertyValue('--header-height'),
      );

      return Number.isNaN(headerHeight) ? 100 : headerHeight;
    };

    const syncFloatingBackVisibility = () => {
      const isDesktop = window.innerWidth > 1024;
      const heroBackLinkElement = heroBackLinkRef.current;

      if (!isDesktop || !heroBackLinkElement) {
        setIsFloatingBackVisible(false);
        return;
      }

      const backLinkBottom = heroBackLinkElement.getBoundingClientRect().bottom;
      const headerHeight = getHeaderHeight();

      setIsFloatingBackVisible(backLinkBottom <= headerHeight + 12);
    };

    syncFloatingBackVisibility();
    window.addEventListener('scroll', syncFloatingBackVisibility, { passive: true });
    window.addEventListener('resize', syncFloatingBackVisibility);

    return () => {
      window.removeEventListener('scroll', syncFloatingBackVisibility);
      window.removeEventListener('resize', syncFloatingBackVisibility);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="case-study-page" onClick={handleImgClick}>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      <a
        className={`case-back-link case-back-link--floating${
          isFloatingBackVisible ? ' is-visible' : ''
        }`}
        href={caseStudy.backHref}
      >
        <span aria-hidden="true">←</span>
        <span>Назад</span>
      </a>

      <section className="case-hero">
        <div className="case-hero__head section-shell">
          <a ref={heroBackLinkRef} className="case-back-link" href={caseStudy.backHref}>
            <span aria-hidden="true">←</span>
            <span>Назад</span>
          </a>
        </div>
        <div className="case-hero__content">
          <div className="case-hero__copy">
            <div className="case-hero__intro">
              <h1>{caseStudy.hero.title}</h1>
              <p>{caseStudy.hero.description}</p>
            </div>
            <StatGrid items={caseStudy.hero.stats} />
            <p className="case-hero__meta">{caseStudy.hero.meta}</p>
          </div>
          <div className="case-hero__media">
            <img src={caseStudy.hero.image.src} alt={caseStudy.hero.image.alt} />
          </div>
        </div>
      </section>

      <section ref={layoutRef} className="case-study-layout section-shell">
        <nav
          ref={navRef}
          className="case-study-nav"
          aria-label="Навигация по кейсу"
          style={navStyles}
        >
          <div ref={navInnerRef} className="case-study-nav__inner" style={navInnerStyles}>
            <div className="case-study-nav__links">
              {sections.map((section) => (
                <a
                  key={section.id}
                  className={`case-study-nav__link${
                    activeSection === section.id ? ' is-active' : ''
                  }`}
                  href={`#${section.id}`}
                  onClick={() => handleNavClick(section.id)}
                >
                  {section.navLabel}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div ref={contentRef} className="case-study-content">
          {sections.map((section, index) => (
            <section
              key={section.id}
              ref={index === 0 ? firstSectionRef : undefined}
              id={section.id}
              className="case-study-section"
            >
              <h2>{section.title}</h2>
              {section.parts.map((part, partIndex) => (
                <SectionPart key={`${section.id}-${part.type}-${partIndex}`} part={part} />
              ))}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

export const BetboomPassPage = CaseStudyPage;
