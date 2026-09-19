import React, { createContext, useState, useContext } from 'react';
import en from '../i18n/en.json';
import ms from '../i18n/ms.json';
import zh from '../i18n/zh.json';

const dictionaries = { en, ms, zh };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key, variables = {}) => {
    let text = dictionaries[language][key] || dictionaries['en'][key] || key;
    
    // Replace variables like {name}
    Object.keys(variables).forEach(varKey => {
      text = text.replace(`{${varKey}}`, variables[varKey]);
    });
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
