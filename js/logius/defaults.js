define(["exports", "../core/linter-rules/check-punctuation", "../core/linter", "../core/linter-rules/local-refs-exist", "../core/linter-rules/no-headingless-sections", "../core/linter-rules/no-http-props", "./linter-rules/privsec-section"], function (_exports, _checkPunctuation, _linter, _localRefsExist, _noHeadinglessSections, _noHttpProps, _privsecSection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _linter = _interopRequireDefault(_linter);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Sets the defaults for Geonovum documents
   */
  const name = "logius/defaults";
  _exports.name = name;

  _linter.default.register(_noHttpProps.rule, _privsecSection.rule, _noHeadinglessSections.rule, _checkPunctuation.rule, _localRefsExist.rule); // const cgbg = new Set(["BG-DRAFT", "BG-FINAL", "CG-DRAFT", "CG-FINAL"]);


  const licenses = new Map([["cc0", {
    name: "Creative Commons 0 Public Domain Dedication",
    short: "CC0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
    image: "https://tools.geostandaarden.nl/respec/style/logos/CC-Licentie.svg"
  }], ["cc-by", {
    name: "Creative Commons Attribution 4.0 International Public License",
    short: "CC-BY",
    url: "https://creativecommons.org/licenses/by/4.0/legalcode",
    image: "https://tools.geostandaarden.nl/respec/style/logos/cc-by.svg"
  }], ["cc-by-nd", {
    name: "Creative Commons Attribution-NoDerivatives 4.0 International Public License",
    short: "CC-BY-ND",
    url: "https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl",
    image: "https://tools.geostandaarden.nl/respec/style/logos/cc-by-nd.svg"
  }]]);
  const logiusDefaults = {
    lint: {
      "no-headingless-sections": true,
      "privsec-section": true,
      "no-http-props": true
    },
    doJsonLd: true,
    license: "cc-by",
    specStatus: "GN-BASIS",
    logos: [{
      src: "https://centrumvoorstandaarden.github.io/respec-tools/resources/logius.png",
      alt: "Logius",
      id: "Logius",
      // height: 67,
      width: 200,
      url: "https://www.logius.nl/"
    }]
  };

  function computeProps(conf) {
    return {
      isCCBY: conf.license === "cc-by",
      licenseInfo: licenses.get(conf.license),
      isBasic: conf.specStatus === "GN-BASIS",
      isRegular: conf.specStatus === "GN-BASIS"
    };
  }

  function run(conf) {
    // assign the defaults
    Object.assign(conf, _objectSpread({}, logiusDefaults, conf)); //computed properties

    Object.assign(conf, computeProps(conf));
  }
});
//# sourceMappingURL=defaults.js.map