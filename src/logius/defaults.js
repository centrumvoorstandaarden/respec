/**
 * Sets the defaults for Geonovum documents
 */
export const name = "logius/defaults";
import { rule as checkPunctuation } from "../core/linter-rules/check-punctuation";
import linter from "../core/linter";
import { rule as localRefsExist } from "../core/linter-rules/local-refs-exist";
import { rule as noHeadinglessSectionsRule } from "../core/linter-rules/no-headingless-sections";
import { rule as noHttpPropsRule } from "../core/linter-rules/no-http-props";
import { rule as privsecSectionRule } from "./linter-rules/privsec-section";


linter.register(noHttpPropsRule, privsecSectionRule, noHeadinglessSectionsRule, checkPunctuation,
localRefsExist);

// const cgbg = new Set(["BG-DRAFT", "BG-FINAL", "CG-DRAFT", "CG-FINAL"]);
const licenses = new Map([
  [
    "cc0",
    {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
      image: "https://tools.geostandaarden.nl/respec/style/logos/CC-Licentie.svg",
    },
  ],
  [
    "cc-by",
    {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
      image: "https://tools.geostandaarden.nl/respec/style/logos/cc-by.svg",
    },
  ],
  [
    "cc-by-nd",
    {
      name: "Creative Commons Attribution-NoDerivatives 4.0 International Public License",
      short: "CC-BY-ND",
      url: "https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl",
      image: "https://tools.geostandaarden.nl/respec/style/logos/cc-by-nd.svg",
    },
  ]
]);

const logiusDefaults = {
  lint: {
    "no-headingless-sections": true,
    "privsec-section": true,
    "no-http-props": true,
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
    isRegular: conf.specStatus === "GN-BASIS",
  };
}

export function run(conf) {
  // assign the defaults
  Object.assign(conf, { ...logiusDefaults, ...conf });
  //computed properties
  Object.assign(conf, computeProps(conf));
}
