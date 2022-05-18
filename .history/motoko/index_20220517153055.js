module.exports = function (context, options) {
  return {
    name: "motoko",
    loadContent: async () => {
      return { remoteHeadTags: await fetchHeadTagsFromAPI() };
    },
    injectHtmlTags({ content }) {
      return {
        postBodyTags: [`<script>console.log('postBodyTag')</script>`],
      };
    },
  };
};
