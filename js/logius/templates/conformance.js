define(["exports", "hyperhtml"], function (_exports, _hyperhtml) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["<h2>Conformiteit</h2>\n<p>\nNaast onderdelen die als niet normatief gemarkeerd zijn, zijn ook alle diagrammen, voorbeelden, en noten in dit document niet normatief. Verder is alles in dit document normatief.\n</p>\n<p>\nInformatief en normatief.\n</p>"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  var _default = () => {
    const html = _hyperhtml.default;
    return html(_templateObject());
  };

  _exports.default = _default;
});
//# sourceMappingURL=conformance.js.map