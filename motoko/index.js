module.exports = function (context, options) {
  console.log("context from plugin access", context);
  return {
    name: "motoko",
    clientModules: [require.resolve("../src/run_Motoko/highlight.bundle.js")],
    injectHtmlTags({ content }) {
      return {
        // only gets loaded once, not run every time redirected to new page
        postBodyTags: [
          `<script src="/run_repl.js"></script>
          <script type="module">
            import {CodeJar} from 'https://cdn.jsdelivr.net/npm/codejar@3.2.3/codejar.min.js';
            import {withLineNumbers} from 'https://cdn.jsdelivr.net/npm/codejar@3.2.3/linenumbers.js';
            window.CodeJar = CodeJar;
            window.withLineNumbers = withLineNumbers;
          </script>
          <script src="/moc-interpreter-0.6.27.js" async></script>
          <script>console.log('Calling from postBodyTag in scripts')</script>`,
        ],
      };
    },
  };
};
