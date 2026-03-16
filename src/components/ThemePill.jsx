import React from 'react';

export function ThemePill({ className = '' }) {
  return (
    <button
      className={`theme-pill${className ? ` ${className}` : ''}`}
      type="button"
      aria-label="Светлая тема"
      title="Светлая тема"
    >
      <span className="theme-pill__emoji" aria-hidden="true">
        🌝
      </span>
    </button>
  );
}
