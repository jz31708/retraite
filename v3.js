(() => {
  'use strict';

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'v4.css?v=20260826-2';
  document.head.append(css);

  const script = document.createElement('script');
  script.src = 'v4.js?v=20260826-2';
  script.async = false;
  document.body.append(script);
})();
