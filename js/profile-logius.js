"use strict";
// In case everything else fails, we always want to show the document
window.addEventListener("error", function(ev) {
  console.error(ev.error, ev.message, ev);
});

// this is only set in a build, not at all in the dev environment
require.config({
  shim: {
    shortcut: {
      exports: "shortcut",
    },
    highlight: {
      exports: "hljs",
    },
    beautify: {
      exports: "beautify",
    },
  },
  paths: {
    // Thijs: TODO: check for Geonovum if we still need these:
    "beautify-css": "deps/beautify-css",
    "beautify-html": "deps/beautify-html",
    "handlebars.runtime": "deps/handlebars",
    "deps/highlight": "https://www.w3.org/Tools/respec/respec-highlight",
    // end check for Geonovum
    clipboard: "deps/clipboard",
    hyperhtml: "deps/hyperhtml",
    idb: "deps/idb",
    jquery: "deps/jquery",
    marked: "deps/marked",
    pluralize: "deps/pluralize",
    text: "deps/text",
    leaflet: "logius/deps/leaflet",
    "leaflet-easybutton": "logius/deps/easy-button",
    // WebIDL is not needed for Geonovum
    // webidl2: "deps/webidl2",
  },
  // deps: ["deps/hyperhtml", "logius/deps/leaflet"],
  deps: ["logius/deps/leaflet"],
});

define(
  [
    // order is significant
    // "./deps/domReady",
    "./core/base-runner",
    "./core/ui",
    "./core/reindent",
    "./core/location-hash",
    "./core/l10n",
    // "w3c/defaults",
    "./logius/defaults",
    "./core/style",
    "./logius/style",
    "./logius/l10n",
    "./core/github",
    "./core/data-include",
    "./logius/markdown",
    "./logius/headers",
    "./w3c/abstract",
    "./logius/conformance",
    "./core/data-transform",
    // Thijs Brentjens Geonovum: use geonovum customized inlines, for RFC2119 in Dutch
    // "./core/inlines",
    "./logius/inlines",
    "./core/dfn",
    "./core/pluralize",
    "./core/examples",
    "./core/issues-notes",
    "./core/requirements",
    "./core/best-practices",
    "./core/figures",
    // "core/webidl",
    "./core/data-cite",
    "./core/biblio",
    // "core/webidl-index",
    "./core/link-to-dfn",
    "./core/render-biblio",
    "./core/contrib",
    "./core/fix-headers",
    "./core/structure",
    "./logius/informative", // TODO: check: voor een niet normatieve tekst is een apart script opgenomen. Is dit nog nodig? Of naar i10n vertalen?
    "./core/id-headers",
    "./core/caniuse",
    // "w3c/aria",
    "./logius/leafletfigures", // TODO: opnemen in docs: eigen Geonovum doc
    "./ui/save-html",
    "./ui/search-specref",
    "./ui/dfn-list",
    "./ui/about-respec",
    "./core/seo",
    "./logius/seo",
    "./core/highlight",
    // "core/webidl-clipboard",
    // "core/data-tests",
    "./core/list-sorter",
    "./core/highlight-vars",
    "./core/algorithms",
    /*Linter must be the last thing to run*/
    "./core/linter",
  ],(runner, { ui }, ...plugins) => {
    ui.show();
    domReady().then(async () => {
      try {
        await runner.runAll(plugins);
        await document.respecIsReady;
      } catch (err) {
        console.error(err);
      } finally {
        ui.enable();
      }
    });
  });

  async function domReady() {
    if (document.readyState === "loading") {
      await new Promise(resolve =>
        document.addEventListener("DOMContentLoaded", resolve)
      );
    }
  }
