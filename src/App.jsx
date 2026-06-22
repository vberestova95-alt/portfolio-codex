import React, { useEffect, useState } from 'react';
import { Header } from './components/Header.jsx';
import { MaintenanceScreen } from './components/MaintenanceScreen.jsx';
import { CasesSection } from './sections/CasesSection.jsx';
import { CatCaseTeaserSection } from './sections/CatCaseTeaserSection.jsx';
import { ExperienceSection } from './sections/ExperienceSection.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import {
  betboomPassCaseStudy,
  catAppCaseStudy,
  iquotoCaseStudy,
  kokocCaseStudy,
  yandexTurkeyCaseStudy,
} from './data/caseStudies.js';
import { cases, experiences, profile } from './data/portfolioData.js';
import { ComponentCatalogPage } from './pages/ComponentCatalogPage.jsx';
import { CaseStudyPage } from './pages/BetboomPassPage.jsx';

const THEME_STORAGE_KEY = 'portfolio-theme';
const COMPONENT_CATALOG_PATH = '/components-library';
const CASE_STUDIES_BY_PATH = {
  '/betboom-pass': betboomPassCaseStudy,
  '/cat-app': catAppCaseStudy,
  '/iquoto': iquotoCaseStudy,
  '/kokoc-group': kokocCaseStudy,
  '/yandex-turkey': yandexTurkeyCaseStudy,
};

function getQueryTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const theme = searchParams.get('theme');

  return theme === 'light' || theme === 'dark' ? theme : null;
}

function shouldPauseSite() {
  return false;
}

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
  const forcedTheme = getQueryTheme();
  const [themePreference, setThemePreference] = useState(
    () => forcedTheme ?? getStoredTheme(),
  );
  const [theme, setTheme] = useState(() => forcedTheme ?? getStoredTheme() ?? getSystemTheme());
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const isSitePaused = shouldPauseSite();
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname || '/';
  const normalizedPathname =
    pathname === '/index.html' || pathname.endsWith('/index.html')
      ? pathname.slice(0, -'/index.html'.length) || '/'
      : pathname;
  const normalizedCasePath =
    normalizedPathname !== '/' && normalizedPathname.endsWith('/')
      ? normalizedPathname.slice(0, -1)
      : normalizedPathname;
  const currentCaseStudy = CASE_STUDIES_BY_PATH[normalizedCasePath] ?? null;
  const isCasePage = Boolean(currentCaseStudy);
  const isComponentCatalogPage = normalizedCasePath === COMPONENT_CATALOG_PATH;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    if (forcedTheme || themePreference) {
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
  }, [forcedTheme, themePreference]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (forcedTheme || !themePreference) {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  }, [forcedTheme, themePreference]);

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
    if (forcedTheme) {
      return;
    }

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
      {isSitePaused ? (
        <main id="top" className="main-content main-content-maintenance">
          <MaintenanceScreen />
        </main>
      ) : (
        <>
          {isComponentCatalogPage ? (
            <main id="top" className="main-content">
              <ComponentCatalogPage
                profile={profile}
                cases={cases}
                experiences={experiences}
              />
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
                  <CaseStudyPage caseStudy={currentCaseStudy} />
                ) : (
                  <>
                    <HeroSection profile={profile} />
                    <CasesSection items={cases} />
                    <ExperienceSection items={experiences} />
                    <CatCaseTeaserSection />
                  </>
                )}
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
}
