define(["exports", "../core/utils", "hyperhtml", "../core/inline-idl-parser", "../core/pubsubhub"], function (_exports, _utils, _hyperhtml, _inlineIdlParser, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["\n              <abbr title=\"", "\">", "</abbr>"]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["<cite><a class=\"bibref\" href=\"", "\">", "</a></cite>"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["<em class=\"rfc2119\" title=\"", "\">", "</em>"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  const name = "logius/inlines";
  _exports.name = name;

  function run(conf) {
    document.normalize();
    if (!conf.normativeReferences) conf.normativeReferences = new Set();
    if (!conf.informativeReferences) conf.informativeReferences = new Set();
    if (!conf.respecRFC2119) conf.respecRFC2119 = {}; // PRE-PROCESSING

    const abbrMap = new Map();
    /** @type {NodeListOf<HTMLElement>} */

    const abbrs = document.querySelectorAll("abbr[title]");

    for (const abbr of abbrs) {
      abbrMap.set(abbr.textContent, abbr.title);
    }

    const aKeys = [...abbrMap.keys()];
    aKeys.sort((a, b) => b.length - a.length);
    const abbrRx = aKeys.length ? "(?:\\b".concat(aKeys.join("\\b)|(?:\\b"), "\\b)") : null; // PROCESSING

    const txts = (0, _utils.getTextNodes)(document.body, ["pre"]);
    const rx = new RegExp("(".concat(["\\bMOET(?:\\s+NIET)?\\b", "\\bMOETEN(?:\\s+NIET)?\\b", "\\bZOU(?:\\s+NIET)?\\b", "\\bZOUDEN(?:\\s+NIET)?\\b", "\\bMAG\\b", "\\bMOGEN\\b", "\\b(?:NIET\\s+)?VEREIST\\b", "\\b(?:NIET\\s+)?AANBEVOLEN\\b", "\\bOPTIONEEL\\b", "(?:{{3}\\s*.*\\s*}{3})", // inline IDL references,
    "(?:\\[\\[(?:!|\\\\|\\?)?[A-Za-z0-9\\.-]+\\]\\])", ...(abbrRx ? [abbrRx] : [])].join("|"), ")"));

    for (const txt of txts) {
      const subtxt = txt.data.split(rx);
      if (subtxt.length === 1) continue;
      const df = document.createDocumentFragment();

      while (subtxt.length) {
        const t = subtxt.shift();
        let matched = null;
        if (subtxt.length) matched = subtxt.shift();
        df.appendChild(document.createTextNode(t));

        if (matched) {
          // RFC 2119
          if (/MOET(?:\s+NIET)?|MOETEN(?:\s+NIET)?|ZOU(?:\s+NIET)?|ZOUDEN(?:\s+NIET)?|MAG|MOGEN|(?:NIET\s+)?VEREIST|(?:NIET\s+)?AANBEVOLEN|OPTIONEEL/.test(matched)) {
            // Thijs Brentjens, Geonovum: TODO: map the terms to a Geonovum/NL list?
            matched = matched.split(/\s+/).join(" ");
            df.appendChild((0, _hyperhtml.default)(_templateObject(), matched, matched)); // remember which ones were used

            conf.respecRFC2119[matched] = true;
          } else if (matched.startsWith("{{{")) {
            // External IDL references (xref)
            const ref = matched.replace(/^\{{3}/, "").replace(/\}{3}$/, "").trim();

            if (ref.startsWith("\\")) {
              df.appendChild(document.createTextNode("{{{".concat(ref.replace(/^\\/, ""), "}}}")));
            } else {
              df.appendChild((0, _inlineIdlParser.idlStringToHtml)(ref));
            }
          } else if (matched.startsWith("[[")) {
            // BIBREF
            let ref = matched;
            ref = ref.replace(/^\[\[/, "");
            ref = ref.replace(/\]\]$/, "");

            if (ref.startsWith("\\")) {
              df.appendChild(document.createTextNode("[[".concat(ref.replace(/^\\/, ""), "]]")));
            } else {
              const {
                type,
                illegal
              } = (0, _utils.refTypeFromContext)(ref, txt.parentNode);
              ref = ref.replace(/^(!|\?)/, "");
              df.appendChild(document.createTextNode("["));
              const refHref = "#bib-".concat(ref.toLowerCase());
              const cite = (0, _hyperhtml.default)(_templateObject2(), refHref, ref);
              df.appendChild(cite);
              df.appendChild(document.createTextNode("]"));

              if (illegal && !conf.normativeReferences.has(ref)) {
                (0, _utils.showInlineWarning)(cite, "Normative references in informative sections are not allowed. " + "Remove '!' from the start of the reference `[[!".concat(ref, "]]`"));
              }

              if (type === "informative" && !illegal) {
                conf.informativeReferences.add(ref);
              } else {
                conf.normativeReferences.add(ref);
              }
            }
          } else if (abbrMap.has(matched)) {
            // ABBR
            if (txt.parentElement.tagName === "ABBR") df.appendChild(document.createTextNode(matched));else df.appendChild((0, _hyperhtml.default)(_templateObject3(), abbrMap.get(matched), matched));
          } else {
            // FAIL -- not sure that this can really happen
            (0, _pubsubhub.pub)("error", "Found token '".concat(matched, "' but it does not correspond to anything"));
          }
        }
      }

      txt.parentNode.replaceChild(df, txt);
    }
  }
});
//# sourceMappingURL=inlines.js.map