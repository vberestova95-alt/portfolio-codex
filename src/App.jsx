import React from 'react';
import { Header } from './components/Header.jsx';
import { CasesSection } from './sections/CasesSection.jsx';
import { ExperienceSection } from './sections/ExperienceSection.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { cases, experiences, profile } from './data/portfolioData.js';

export function App() {
  return (
    <div className="page-shell">
      <div className="header-shell">
        <Header contacts={profile.contacts} name={profile.name} />
      </div>
      <main id="top" className="main-content">
        <HeroSection profile={profile} />
        <CasesSection items={cases} />
        <ExperienceSection items={experiences} />
      </main>
    </div>
  );
}
