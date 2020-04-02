define(["exports", "hyperhtml", "../../core/pubsubhub"], function (_exports, _hyperhtml, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["\n            <a href=\"", "\">", "</a>\n          "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["\n    <dd class=\"", "\">\n      ", "\n    </dd>\n  "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["\n    <dt class=\"", "\">", ":</dt>\n    ", "\n  "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  const html = _hyperhtml.default;

  var _default = link => {
    if (!link.key) {
      const msg = "Found a link without `key` attribute in the configuration. See dev console.";
      (0, _pubsubhub.pub)("warn", msg);
      console.warn("warn", msg, link);
      return;
    }

    return html(_templateObject(), link.class ? link.class : null, link.key, link.data ? link.data.map(showLinkData) : showLinkData(link));
  };

  _exports.default = _default;

  function showLinkData(data) {
    return html(_templateObject2(), data.class ? data.class : null, data.href ? html(_templateObject3(), data.href, data.value || data.href) : "");
  }
});
//# sourceMappingURL=show-link.js.map