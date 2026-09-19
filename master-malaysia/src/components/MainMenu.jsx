import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MainMenu({ onPlay, onInstructions }) {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'zh', label: '中文' }
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.label || 'Language';

  return (
    <div className="main-menu-container">
      <div className="language-selector">
        <button 
          className="custom-dropdown-toggle" 
          onClick={() => setIsLangOpen(!isLangOpen)}
        >
          🌍 {currentLangLabel}
        </button>
        <div className={`custom-dropdown-menu ${isLangOpen ? 'open' : ''}`}>
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`custom-dropdown-item ${language === lang.code ? 'active' : ''}`}
              onClick={() => {
                setLanguage(lang.code);
                setIsLangOpen(false);
              }}
            >
              {lang.label} {language === lang.code && '✓'}
            </button>
          ))}
        </div>
      </div>
      <div className="menu-glass-panel">
        <h1 className="menu-title">{t('menu.title').toUpperCase()}</h1>
        <p className="menu-subtitle">{t('menu.subtitle')}</p>
        <div className="menu-buttons">
          <button className="menu-btn primary" onClick={onPlay}>{t('menu.play')}</button>
          <button className="menu-btn secondary" onClick={onInstructions}>{t('menu.instructions')}</button>
        </div>
      </div>
    </div>
  );
}
