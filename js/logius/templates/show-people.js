define(["exports", "hyperhtml"], function (_exports, _hyperhtml) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject8() {
    const data = _taggedTemplateLiteral(["<a href='", "'></a>"]);

    _templateObject8 = function _templateObject8() {
      return data;
    };

    return data;
  }

  function _templateObject7() {
    const data = _taggedTemplateLiteral(["<span class='", "'></span>"]);

    _templateObject7 = function _templateObject7() {
      return data;
    };

    return data;
  }

  function _templateObject6() {
    const data = _taggedTemplateLiteral(["", ""]);

    _templateObject6 = function _templateObject6() {
      return data;
    };

    return data;
  }

  function _templateObject5() {
    const data = _taggedTemplateLiteral([", <a class='ed_mailto u-email email'\n        href='", "'>", "</a>"]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    const data = _taggedTemplateLiteral([", <a class='p-org org h-org h-card' href='", "'>", "</a>"]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["<span class='p-name fn'>", "</span>"]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["<a class='u-url url p-name fn'\n        href='", "'>", "</a>"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["<dd class='p-author h-card vcard'\n      data-editor-id='", "'></dd>"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  var _default = (conf, name, items = []) => {
    const html = _hyperhtml.default;
    const results = [];

    for (let i = 0; i < items.length; i++) {
      results.push(getItem(items[i], i));
    }

    return results;

    function getItem(p, i) {
      const editorid = p.w3cid ? parseInt(p.w3cid, 10) : null;
      const dd = html(_templateObject(), editorid);
      const span = document.createDocumentFragment();
      const contents = [];

      if (p.url) {
        contents.push(html(_templateObject2(), p.url, p.name));
      } else {
        contents.push(html(_templateObject3(), p.name));
      }

      if (p.company) {
        if (p.companyURL) {
          contents.push(html(_templateObject4(), p.companyURL, p.company));
        } else {
          contents.push(document.createTextNode(", ".concat(p.company)));
        }
      }

      if (p.mailto) {
        contents.push(html(_templateObject5(), "mailto:".concat(p.mailto), p.mailto));
      }

      if (p.note) contents.push(document.createTextNode(" (".concat(p.note, ")")));

      if (p.extras) {
        const results = p.extras // Remove empty names
        .filter(extra => extra.name && extra.name.trim()) // Convert to HTML
        .map(getExtra);

        for (const result of results) {
          contents.push(document.createTextNode(", "), result);
        }
      }

      _hyperhtml.default.bind(span)(_templateObject6(), contents);

      dd.appendChild(span);
      return dd;
    }

    function getExtra(extra) {
      const span = html(_templateObject7(), extra.class || null);
      let textContainer = span;

      if (extra.href) {
        textContainer = html(_templateObject8(), extra.href);
        span.appendChild(textContainer);
      }

      textContainer.textContent = extra.name;
      return span;
    }
  };

  _exports.default = _default;
});
//# sourceMappingURL=show-people.js.map