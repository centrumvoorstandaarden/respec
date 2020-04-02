define(["exports", "hyperhtml"], function (_exports, _hyperhtml) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["<p><em>Dit onderdeel is niet normatief.</em></p>"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  const name = "logius/informative";
  _exports.name = name;

  function run() {
    Array.from(document.querySelectorAll("section.informative")).map(informative => informative.querySelector("h2, h3, h4, h5, h6")).filter(heading => heading).forEach(heading => {
      heading.parentNode.insertBefore((0, _hyperhtml.default)(_templateObject()), heading.nextSibling);
    });
  }
});
//# sourceMappingURL=informative.js.map