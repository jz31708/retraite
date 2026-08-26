(() => {
  'use strict';

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'v4.css?v=20260826-2';
  document.head.append(css);

  const v4 = document.createElement('script');
  v4.src = 'v4.js?v=20260826-2';
  v4.async = false;
  v4.onload = () => {
    const v5 = document.createElement('script');
    v5.src = 'v5.js?v=20260826-1';
    v5.async = false;
    document.body.append(v5);
  };
  document.body.append(v4);
})();
