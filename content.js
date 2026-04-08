// ChatGPT Dark Mode Toggle - Content Script v2
(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const BTN_ID = 'cgpt-dark-toggle-btn';

  function getCurrentTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
      html.setAttribute('data-theme', 'dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      html.setAttribute('data-theme', 'light');
      html.style.colorScheme = 'light';
    }
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: theme,
      storageArea: localStorage,
    }));
  }

  function isDark() {
    return getCurrentTheme() === 'dark';
  }

  function moonSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
    </svg>`;
  }

  function sunSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`;
  }


  function createButton() {
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.title = 'Toggle dark / light mode';
    btn.setAttribute('aria-label', 'Toggle dark / light mode');

    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '70px',
      left: '11px',
      zIndex: '9999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      background: 'transparent',
      color: isDark() ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
      transition: 'transform 0.2s ease',
      outline: 'none',
      padding: '0',
    });

    btn.innerHTML = isDark() ? moonSVG() : sunSVG();

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const next = isDark() ? 'light' : 'dark';
      setTheme(next);
      btn.innerHTML = next === 'dark' ? moonSVG() : sunSVG();
      btn.style.color = next === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
      btn.style.transform = 'scale(0.8) rotate(20deg)';
      setTimeout(() => { btn.style.transform = 'scale(1) rotate(0deg)'; }, 180);
    });

    return btn;
  }

  function inject() {
    if (document.getElementById(BTN_ID)) return;
    document.body.appendChild(createButton());
  }

  function init() {
    inject();
    const observer = new MutationObserver(() => {
      if (!document.getElementById(BTN_ID)) inject();
    });
    observer.observe(document.body, { childList: true, subtree: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 600);
  }
})();
