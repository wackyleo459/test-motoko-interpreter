async function addPackage(name, repo, version, dir) {
  const meta_url = `https://data.jsdelivr.com/v1/package/gh/${repo}@${version}/flat`;
  const base_url = `https://cdn.jsdelivr.net/gh/${repo}@${version}`;
  const response = await fetch(meta_url);
  const json = await response.json();
  const promises = [];
  const fetchedFiles = [];
  for (const f of json.files) {
    if (f.name.startsWith(`/${dir}/`) && /\.mo$/.test(f.name)) {
      const promise = (async () => {
        const content = await (await fetch(base_url + f.name)).text();
        const stripped = name + f.name.slice(dir.length + 1);
        fetchedFiles.push(stripped);
        Motoko.saveFile(stripped, content);
      })();
      promises.push(promise);
    }
  }
  Promise.all(promises).then(() => {
    Motoko.addPackage(name, name + "/");
  });
}

window.addEventListener('load', () => {
  if (document.getElementsByClassName('language-motoko').length > 0) {
    const script = document.createElement('script');
    script.async = true;
    script.src = '/moc-interpreter-0.6.27.js';
    script.addEventListener('load', () => {
      addPackage("base", "dfinity/motoko-base", "moc-0.6.27", "src");
      console.log("moc and base library loaded");
    });
    document.head.appendChild(script);
  }
});
