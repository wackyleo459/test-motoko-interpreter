module.exports = function (context, options) {
  return {
    name: "motoko",
    injectHtmlTags({ content }) {
      return {
        postBodyTags: [`<script>console.log('Here it is')</script>`],
      };
    },
  };
};
