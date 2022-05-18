// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "My Site",
  tagline: "Dinosaurs are cool",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "My Site",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  ssrTemplate: `<% #if (document.getElementsByClassName('language-motoko').length > 0) { %>
  <script src="{{uiRootPath}}/js/vendor/run_repl.js"></script>
  <script type="module">
    import {CodeJar} from 'https://cdn.jsdelivr.net/npm/codejar@3.2.3/codejar.min.js';
    import {withLineNumbers} from 'https://cdn.jsdelivr.net/npm/codejar@3.2.3/linenumbers.js';
    window.CodeJar = CodeJar;
    window.withLineNumbers = withLineNumbers;
  </script>
  <script type="text/javascript">
    async function addPackage(name, repo, version, dir) {
      const meta_url = "https://data.jsdelivr.com/v1/package/gh/${repo}@${version}/flat";
      const base_url = "https://cdn.jsdelivr.net/gh/${repo}@${version}";
      const response = await fetch(meta_url);
      const json = await response.json()
      const promises = [];
      const fetchedFiles = [];
      for (const f of json.files) {
        if (f.name.startsWith(```/${dir}/```) && /\.mo$/.test(f.name)) {
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
        console.log(``Loaded motoko library "${name}"``);
        changeCodeBlock(); // from run_repl.js
      });
    }
    function loadBase() {
      addPackage('base', 'dfinity/motoko-base', '{{page.attributes.moc-base-tag}}', 'src');
    }
  </script>
  <script async src="{{uiRootPath}}/js/moc/moc-interpreter-0.6.11.js" onload="loadBase()">
  </script>
  <% } %>`,
};

module.exports = config;
