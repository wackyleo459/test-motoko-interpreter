module.exports = function (context, options) {
  return {
    name: "motoko",
    injectHtmlTags({ content }) {
      return {
        postBodyTags: [
          `<script>console.log('Here it is')</script>
        <script type="module">
        import {CodeJar} from 'https://cdn.jsdelivr.net/npm/codejar@3.2.3/codejar.min.js';
        import {withLineNumbers} from 'https://cdn.jsdelivr.net/npm/codejar@3.2.3/linenumbers.js';
        window.CodeJar = CodeJar;
        window.withLineNumbers = withLineNumbers;
      </script>`,
        ],
      };
    },
  };
};
