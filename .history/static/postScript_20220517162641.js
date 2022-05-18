const postScript = function () {
  if (document.getElementsByClassName('language-motoko').length > 0) {
    console.log("hello from PostScript!");

    return (
      <script src="{{uiRootPath}}/js/vendor/run_repl.js"></script>
      <script type="module">
        import {CodeJar} from 'https://cdn.jsdelivr.net/npm/codejar@3.2.3/codejar.min.js';
        import {withLineNumbers} from 'https://cdn.jsdelivr.net/npm/codejar@3.2.3/linenumbers.js';
        window.CodeJar = CodeJar;
        window.withLineNumbers = withLineNumbers;
      </script>
      <script type="text/javascript">
        function consoleFunction(input) {
          console.log(input);
        };
        async function addPackage(name, repo, version, dir) {
          const meta_url = "https://data.jsdelivr.com/v1/package/gh/dfinity/motoko-base@0.6.27/flat";
          const base_url = "https://cdn.jsdelivr.net/gh/dfinity/motoko-base@0.6.27";
          const response = await fetch(meta_url);
          const json = await response.json()
          const promises = [];
          const fetchedFiles = [];
          for (const f of json.files) {
            if (f.name.startsWith("/src/") && /\.mo$/.test(f.name)) {
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
            Motoko.addPackage(name, name + '/');
            console.log("Loaded motoko library base");
            changeCodeBlock(); // from run_repl.js
          });
        }
        function loadBase() {
          addPackage('base', 'dfinity/motoko-base', '{{page.attributes.moc-base-tag}}', 'src');
        }
      </script>
      <script async src="{{uiRootPath}}/js/moc/moc-interpreter-0.6.27.js" onload="loadBase()">
      </script>
      <script>console.log('Sue inside a script tag')</script>
    )
  }
}


module.exports = postScript;
