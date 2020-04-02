define(["exports", "../geonovum/deps/leaflet", "../core/pubsubhub"], function (_exports, _leaflet, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _leaflet = _interopRequireDefault(_leaflet);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * Module: geonovum/leafletfigures
   * Makes figures scalable via zoom and pan function
   */
  // import easyButton from "../geonovum/deps/easy-button";
  const name = "geonovum/leafletfigures";
  _exports.name = name;

  async function run(conf, doc, cb) {
    (0, _pubsubhub.sub)("beforesave", addLeafletOnSave);
    cb();
    await document.respecIsReady;
    processImages();
  }

  function processImages() {
    Array.from(document.querySelectorAll("figure.scalable img")).forEach(image => {
      const {
        width,
        height,
        src
      } = image;
      image.hidden = true;
      const div = document.createElement("div");
      div.classList.add("removeOnSave");

      const map = _leaflet.default.map(div, {
        maxZoom: 4,
        minZoom: -4,
        center: [0, 0],
        crs: _leaflet.default.CRS.Simple
      });

      const imageBounds = [[0, 0], [height, width]];
      image.insertAdjacentElement("beforebegin", div);
      map.setView([height / 2, width / 2], 1);
      [_leaflet.default.easyButton("fa-arrows-alt", () => window.open(src, "_blank")), _leaflet.default.easyButton("fa-globe", () => map.fitBounds(imageBounds)), _leaflet.default.imageOverlay(src, imageBounds)].forEach(item => item.addTo(map));
      map.fitBounds(imageBounds);
    });
  }

  const rawProcessImages = "\n  function processImages() {\n    Array.from(\n      document.querySelectorAll(\"figure.scalable img\")\n    ).forEach(image => {\n      const { width, height, src } = image;\n      image.hidden = true;\n      const div = document.createElement(\"div\");\n      const map = L.map(div, {\n        maxZoom: 4,\n        minZoom: -4,\n        center: [0, 0],\n        crs: L.CRS.Simple,\n      });\n      const imageBounds = [[0, 0], [height, width]];\n      image.insertAdjacentElement(\"beforebegin\", div);\n      map.setView([height / 2, width / 2], 1);\n      [\n        L.easyButton(\"fa-arrows-alt\", () => window.open(src, \"_blank\")),\n        L.easyButton(\"fa-globe\", () => map.fitBounds(imageBounds)),\n        L.imageOverlay(src, imageBounds),\n      ].forEach(item => item.addTo(map));\n      map.fitBounds(imageBounds);\n    });\n  }\n";

  function addLeafletOnSave(rootElem) {
    const doc = rootElem.ownerDocument;
    const head = rootElem.querySelector("head");

    if (rootElem.querySelector("figure.scalable img") === null) {
      return; // this document doesn't need leaflet
    } // this script loads leaflet


    const leafletScript = doc.createElement("script");
    leafletScript.src = "https://tools.geostandaarden.nl/respec/scripts/leaflet.js"; //Loads easy button

    const easyButtonScript = doc.createElement("script");
    easyButtonScript.src = "https://tools.geostandaarden.nl/respec/scripts/easy-button.js"; // This script handles actually doing the work

    const processImagesScript = doc.createElement("script");
    processImagesScript.textContent = "\n    ".concat(rawProcessImages, ";\n    // Calls processImages when the document loads\n    window.addEventListener(\"DOMContentLoaded\", processImages);\n  "); // add the CSS

    const leafletStyle = doc.createElement("link");
    leafletStyle.rel = "stylesheet";
    leafletStyle.href = "https://tools.geostandaarden.nl/respec/style/leaflet.css"; // add easyButton font-awesome CSS

    const easyButtonStyle = doc.createElement("link");
    easyButtonStyle.rel = "stylesheet";
    easyButtonStyle.href = "https://tools.geostandaarden.nl/respec/style/font-awesome.css"; // Finally, we add stylesheet and the scripts in order

    head.insertAdjacentElement("afterbegin", leafletStyle);
    head.insertAdjacentElement("afterbegin", easyButtonStyle);
    head.appendChild(leafletScript);
    head.appendChild(easyButtonScript);
    head.appendChild(processImagesScript);
  }
});
//# sourceMappingURL=leafletfigures.js.map