import React, { useEffect, useState } from 'react';
import { Header } from './components/Header.jsx';
import { MaintenanceScreen } from './components/MaintenanceScreen.jsx';
import { CasesSection } from './sections/CasesSection.jsx';
import { ExperienceSection } from './sections/ExperienceSection.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { betboomPassCaseStudy } from './data/caseStudies.js';
import { cases, experiences, profile } from './data/portfolioData.js';
import { BetboomPassPage } from './pages/BetboomPassPage.jsx';

const THEME_STORAGE_KEY = 'portfolio-theme';
const BETBOOM_PASS_PATH = '/betboom-pass';
const SITE_PAUSED = true;

function getSystemTheme() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(THEME_STORAGE_KEY);

  return value === 'light' || value === 'dark' ? value : null;
}

export function App() {
  const [themePreference, setThemePreference] = useState(() => getStoredTheme());
  const [theme, setTheme] = useState(() => getStoredTheme() ?? getSystemTheme());
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname || '/';
  const normalizedPathname =
    pathname === '/index.html' || pathname.endsWith('/index.html')
      ? pathname.slice(0, -'/index.html'.length) || '/'
      : pathname;
  const isCasePage =
    normalizedPathname === BETBOOM_PASS_PATH || normalizedPathname === `${BETBOOM_PASS_PATH}/`;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    if (themePreference) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [themePreference]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!themePreference) {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  }, [themePreference]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleThemeToggle = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setThemePreference(nextTheme);

      return nextTheme;
    });
  };

  const headerContacts = isCasePage
    ? profile.contacts.map((contact) => ({
        ...contact,
        href: contact.href.startsWith('#') ? `/${contact.href}` : contact.href,
      }))
    : profile.contacts;

  return (
    <div className={`page-shell app theme-${theme}`}>
      <div className="hero-gradient" aria-hidden="true">
        <span className="hero-gradient__blob hero-gradient__blob--left" />
        <span className="hero-gradient__blob hero-gradient__blob--center" />
        <span className="hero-gradient__blob hero-gradient__blob--top" />
      </div>
      {SITE_PAUSED ? (
        <main id="top" className="main-content main-content-maintenance">
          <MaintenanceScreen />
        </main>
      ) : (
        <>
          <div className={`header-shell${isHeaderScrolled ? ' is-scrolled' : ''}`}>
            <Header
              contacts={headerContacts}
              brandHref={isCasePage ? '/#top' : '#top'}
              name={profile.name}
              theme={theme}
              onThemeToggle={handleThemeToggle}
            />
          </div>
          <main id="top" className={`main-content${isCasePage ? ' main-content-case' : ''}`}>
            {isCasePage ? (
              <BetboomPassPage caseStudy={betboomPassCaseStudy} />
            ) : (
              <>
                <HeroSection profile={profile} />
                <CasesSection items={cases} />
                <ExperienceSection items={experiences} />
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}
