window.addEventListener('load', () => {
  if (document.getElementsByClassName('language-motoko').length > 0) {
    const script = document.createElement('script');
    script.async = true;
    script.src = '/moc-interpreter-0.6.27.js';
    document.head.appendChild(script);
    console.log("moc loaded");
  }
});
