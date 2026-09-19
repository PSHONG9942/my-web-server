import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MainMenu({ onPlayLocal, onPlayOnline, onInstructions }) {
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
      <a 
        href={typeof window !== 'undefined' && window.location.pathname.includes('/dist/') ? '../../index.html' : '../index.html'}
        className="custom-dropdown-toggle home-return-btn"
        style={{ position: 'absolute', top: '20px', left: '20px', textDecoration: 'none', zIndex: 50 }}
      >
        🏠 {t('menu.home')}
      </a>
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
        <div className="menu-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            className="menu-btn primary" 
            onClick={onPlayOnline}
            style={{ 
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              boxShadow: '0 6px 20px rgba(124, 58, 237, 0.4)'
            }}
          >
            🌐 {t('menu.playOnline')}
          </button>
          <button className="menu-btn secondary" onClick={onPlayLocal}>
            🎮 {t('menu.playLocal')}
          </button>
          <button className="menu-btn secondary" onClick={onInstructions} style={{ background: 'rgba(255,255,255,0.4)' }}>
            📖 {t('menu.instructions')}
          </button>
        </div>
      </div>
    </div>
  );
}
