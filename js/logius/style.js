define(["exports", "../core/utils", "../core/pubsubhub"], function (_exports, _utils, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;

  /*jshint strict: true, browser:true, jquery: true*/

  /*globals define*/
  // Module w3c/style
  // Inserts a link to the appropriate W3C style for the specification's maturity level.
  // CONFIGURATION
  //  - specStatus: the short code for the specification's maturity level or type (required)
  const name = "logius/style";
  _exports.name = name;

  function attachFixupScript(doc, version) {
    const script = doc.createElement("script");
    script.addEventListener("load", function () {
      if (window.location.hash) {
        window.location = window.location;
      }
    }, {
      once: true
    });
    script.src = "https://www.w3.org/scripts/TR/".concat(version, "/fixup.js");
    doc.body.appendChild(script);
  } // Make a best effort to attach meta viewport at the top of the head.
  // Other plugins might subsequently push it down, but at least we start
  // at the right place. When ReSpec exports the HTML, it again moves the
  // meta viewport to the top of the head - so to make sure it's the first
  // thing the browser sees. See js/ui/save-html.js.


  function createMetaViewport() {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    const contentProps = {
      width: "device-width",
      "initial-scale": "1",
      "shrink-to-fit": "no"
    };
    meta.content = (0, _utils.toKeyValuePairs)(contentProps).replace(/\"/g, "");
    return meta;
  }

  function createStyle(css_name) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://centrumvoorstandaarden.github.io/respec-tools/media/{0}.css".replace("{0}", css_name);
    link.classList.add("removeOnSave");
    return link;
  } // add favicon


  const favicon = document.createElement("link");
  favicon.rel = "shortcut icon";
  favicon.type = "image/x-icon";
  favicon.href = "https://centrumvoorstandaarden.github.io/respec-tools/media/Geonovum.ico"; // function createBaseStyle() {
  //   const link = document.createElement("link");
  //   link.rel = "stylesheet";
  //   link.href = "https://www.w3.org/StyleSheets/TR/2016/base.css";
  //   link.classList.add("removeOnSave");
  //   return link;
  // }
  // function selectStyleVersion(styleVersion) {
  //   let version = "";
  //   switch (styleVersion) {
  //     case null:
  //     case true:
  //       version = "2016";
  //       break;
  //     default:
  //       if (styleVersion && !isNaN(styleVersion)) {
  //         version = styleVersion.toString().trim();
  //       }
  //   }
  //   return version;
  // }

  function createResourceHints() {
    const resourceHints = [{
      hint: "preconnect",
      // for W3C styles and scripts.
      href: "https://www.w3.org"
    }, {
      hint: "preload",
      // all specs need it, and we attach it on end-all.
      href: "https://www.w3.org/scripts/TR/2016/fixup.js",
      as: "script"
    }, {
      hint: "preload",
      // all specs include on base.css.
      href: "https://www.w3.org/StyleSheets/TR/2016/base.css",
      as: "style"
    }, {
      hint: "preload",
      // all specs show the logo.
      href: "https://www.w3.org/StyleSheets/TR/2016/logos/W3C",
      as: "image"
    }].map(_utils.createResourceHint).reduce(function (frag, link) {
      frag.appendChild(link);
      return frag;
    }, document.createDocumentFragment());
    return resourceHints;
  }

  function run(conf, doc, cb) {
    if (!conf.specStatus) {
      const warn = "`respecConfig.specStatus` missing. Defaulting to 'base'.";
      conf.specStatus = "GN-BASIS";
      (0, _pubsubhub.pub)("warn", warn);
    }

    let styleFile = ""; // Figure out which style file to use.

    switch (conf.specStatus.toUpperCase()) {
      case "GN-WV":
        styleFile += "GN-WV.css";
        break;

      case "GN-CV":
        styleFile += "GN-CV.css";
        break;

      case "GN-VV":
        styleFile += "GN-VV.css";
        break;

      case "GN-DEF":
        styleFile += "GN-DEF.css";
        break;

      case "GN-BASIS":
        styleFile += "GN-BASIS.css";
        break;

      default:
        styleFile = "base.css";
    }

    if (!conf.noToc) {
      (0, _pubsubhub.sub)("end-all", function () {
        attachFixupScript(doc, "2016");
      }, {
        once: true
      });
    } // const finalStyleURL = `https://raw.githubusercontent.com/centrumvoorstandaarden/respec/develop/media/${styleFile}`;


    const finalStyleURL = "https://centrumvoorstandaarden.github.io/respec-tools/media/".concat(styleFile);
    (0, _utils.linkCSS)(doc, finalStyleURL);
    const head = doc.querySelector("head");
    head.appendChild(favicon); // Collect elements for insertion (document fragment)

    const elements = createResourceHints();

    if (document.body.querySelector("figure.scalable")) {
      // Apply leaflet style if class scalable is present
      elements.appendChild(createStyle("leaflet"));
      elements.appendChild(createStyle("font-awesome"));
    } // Opportunistically apply base style
    // elements.appendChild(createBaseStyle());


    if (!document.head.querySelector("meta[name=viewport]")) {
      // Make meta viewport the first element in the head.
      elements.insertBefore(createMetaViewport(), elements.firstChild);
    }

    document.head.insertBefore(elements, document.head.firstChild);
    cb();
  }
});
//# sourceMappingURL=style.js.map