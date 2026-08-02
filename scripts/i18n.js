  /*
  Usage:
  
  */
  
  // 1. Import the dictionary from your separate file
  import { translations } from './translations.js';

  // 2. Core translation function
  function setLanguage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      if (translations[lang]?.[key]) { 
        var translated = translations[lang][key];
        var params = el.getAttribute("data-translate-params");
        if(params){
          params = params.split(",").map(p => p.trim());
          for(var i=0; i<params.length; i++){
            translated = translated.replace(`{${i}}`, params[i]);
          }
        }
        el.innerHTML = translated;
      };
    });

    document.querySelectorAll("[data-translate-placeholder]").forEach(el => {
      const key = el.getAttribute("data-translate-placeholder");
      if (translations[lang]?.[key]) el.placeholder = translations[lang][key];
    });

    document.querySelectorAll("[data-hide-on-language]").forEach(el => {
        const key = el.getAttribute("data-hide-on-language");
        if (key) {
            el.style.display = (key == lang ? "none" : "");
        }
    });

    localStorage.setItem("preferred-lang", lang);
    document.documentElement.lang = lang;
  }

  // 3. Browser language detection logic
  function getInitialLanguage() {
    const saved = localStorage.getItem("preferred-lang");
    if (saved) return saved;

    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith("bg") ? "bg" : "en";
  }

  document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-lang-switch]');
  
  if (target) {
    event.preventDefault(); // Stop native link jumping/reloads
    const targetLang = target.getAttribute('data-lang-switch');
    setLanguage(targetLang);
  }
});

// 5. Initialize
const initialLang = getInitialLanguage();
setLanguage(initialLang);