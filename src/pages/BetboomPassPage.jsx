import React, { useEffect, useMemo, useRef, useState } from 'react';

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
  if (block.type === 'list') {
    return (
      <section className="case-content-block">
        <h3>{block.heading}</h3>
        <ul className="case-bullet-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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

export function BetboomPassPage({ caseStudy }) {
  const sections = useMemo(() => caseStudy.sections, [caseStudy.sections]);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '');
  const [navStyles, setNavStyles] = useState({});
  const [navInnerStyles, setNavInnerStyles] = useState({});
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

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="case-study-page">
      <section className="case-hero">
        <div className="case-hero__head section-shell">
          <a className="case-back-link" href={caseStudy.backHref}>
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
        </nav>

        <div ref={contentRef} className="case-study-content">
          <section
            ref={firstSectionRef}
            id={sections[0].id}
            className="case-study-section"
          >
            <h2>{sections[0].title}</h2>
            <div className="case-study-stack">
              {sections[0].blocks.map((block) => (
                <ContentBlock key={block.heading} block={block} />
              ))}
            </div>
          </section>

          <section id={sections[1].id} className="case-study-section">
            <h2>{sections[1].title}</h2>
            <div className="case-rich-text case-rich-text--lead">
              {sections[1].intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="case-image-band">
              <span>{sections[1].imageBand.label}</span>
              <img src={sections[1].imageBand.src} alt={sections[1].imageBand.alt} />
            </div>

            <div className="case-study-stack">
              {sections[1].blocks.map((block) => (
                <ContentBlock key={block.heading} block={block} />
              ))}
            </div>

            <div className="case-feature-media">
              <CaseMedia media={sections[1].featureMedia} />
            </div>

            <div className="case-note-card">
              <h3>{sections[1].insightCard.title}</h3>
              <ul className="case-bullet-list">
                {sections[1].insightCard.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="case-rich-text">
                {sections[1].insightCard.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          <section id={sections[2].id} className="case-study-section">
            <h2>{sections[2].title}</h2>
            <div className="case-rich-text case-rich-text--lead">
              {sections[2].intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="case-note-card case-note-card--compact">
              <h3>{sections[2].issueCard.title}</h3>
              <ul className="case-bullet-list">
                {sections[2].issueCard.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="case-feature-media case-feature-media--wide">
              <CaseMedia media={sections[2].featureMedia} />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
