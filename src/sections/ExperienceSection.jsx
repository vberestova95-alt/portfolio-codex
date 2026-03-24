import React from 'react';
import experienceArrowIcon from '../assets/experience-arrow.svg';

function ExperienceItem({ company, period, tone }) {
  return (
    <article className={`experience-item${tone ? ` ${tone}` : ''}`}>
      <div className="experience-toggle" aria-hidden="true">
        <div className="experience-text-group">
          <span className="experience-period">{period}</span>
          <span className="experience-company">{company}</span>
        </div>
        <span className="experience-icon">
          <img src={experienceArrowIcon} alt="" />
        </span>
      </div>
    </article>
  );
}

export function ExperienceSection({ items }) {
  return (
    <section id="experience" className="experience section-shell" aria-labelledby="experience-title">
      <div className="experience-title-wrap">
        <h2 id="experience-title">Опыт работы</h2>
      </div>
      <div className="experience-list">
        {items.map((item, index) => (
          <ExperienceItem
            key={item.id}
            period={item.period}
            company={item.company}
            tone={index === 1 ? 'experience-item-alt' : ''}
          />
        ))}
      </div>
    </section>
  );
}
