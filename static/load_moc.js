const MOC_VERSION = "0.6.27";

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
  if (document.getElementsByClassName('run-button').length > 0) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `/moc-interpreter-${MOC_VERSION}.js`;
    script.addEventListener('load', () => {
      addPackage("base", "dfinity/motoko-base", `moc-${MOC_VERSION}`, "src");
      console.log(`moc ${MOC_VERSION} loaded`);
      // Run code
      const btns = document.getElementsByClassName('run-button run');
      for (var i = 0; i < btns.length; i++) {
        btns[i].click();
      };
    });
    document.head.appendChild(script);
  }
});
