(function (Prism) {
  Prism.languages.motoko = {
    string: [
      {
        pattern: /r(#*)"(.|\n)*?"\1(?!#)/,
      },
      {
        pattern: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/,
      },
    ],
    number: [
      {
        pattern: /[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)/,
        lookbehind: true,
      },
      {
        pattern: /[+-]?\\b0[xX]([A-Fa-f0-9_]+)/,
        lookbehind: true,
      },
    ],
    class: {
      aliase: "actor",
      pattern: /\\b(actor( class) ?| module | object) \\b/,
    },
  };

  Prism.languages.motoko = Prism.languages.motoko;
})(Prism);
