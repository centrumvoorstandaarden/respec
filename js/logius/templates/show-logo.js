define(["exports", "hyperhtml", "../../core/utils", "../../core/pubsubhub"], function (_exports, _hyperhtml, _utils, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["\n      <img\n        id=\"", "\"\n        alt=\"", "\"\n        width=\"", "\"\n        height=\"", "\">\n  "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  var _default = obj => {
    const a = document.createElement("a");

    if (!obj.alt) {
      const msg = "Found spec logo without an `alt` attribute. See dev console.";
      a.classList.add("respec-offending-element");
      (0, _pubsubhub.pub)("warn", msg);
      console.warn("warn", msg, a);
    }

    a.href = obj.url || "";
    a.classList.add("logo");

    _hyperhtml.default.bind(a)(_templateObject(), obj.id, obj.alt, obj.width, obj.height); // avoid triggering 404 requests from dynamically generated
    // hyperHTML attribute values


    a.querySelector("img").src = obj.src;
    return a;
  };

  _exports.default = _default;
});
//# sourceMappingURL=show-logo.js.map