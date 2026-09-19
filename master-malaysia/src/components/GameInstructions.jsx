import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function GameInstructions({ onBack }) {
  const { t } = useLanguage();
  return (
    <div className="instructions-container">
      <div className="menu-glass-panel instructions-panel">
        <button className="back-btn" onClick={onBack}>&larr; {t('inst.back')}</button>
        <h2>{t('inst.title')}</h2>
        
        <div className="instructions-content">
          <section>
            <h3>{t('inst.obj.title')}</h3>
            <p>{t('inst.obj.desc')}</p>
          </section>

          <section>
            <h3>{t('inst.mov.title')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('inst.mov.desc').replace('exactly 1 step sequentially each round', '<strong>exactly 1 step sequentially each round</strong>').replace('not', '<em>not</em>') }}></p>
          </section>

          <section>
            <h3>{t('inst.score.title')}</h3>
            <p>{t('inst.score.desc1')}</p>
            <p>{t('inst.score.desc2')}</p>
          </section>

          <section>
            <h3>{t('inst.risk.title')}</h3>
            <p>{t('inst.risk.desc')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
