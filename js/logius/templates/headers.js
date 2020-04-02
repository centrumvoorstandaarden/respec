define(["exports", "hyperhtml", "../../core/pubsubhub", "./show-link", "./show-logo", "./show-people"], function (_exports, _hyperhtml, _pubsubhub, _showLink, _showLogo, _showPeople) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);
  _showLink = _interopRequireDefault(_showLink);
  _showLogo = _interopRequireDefault(_showLogo);
  _showPeople = _interopRequireDefault(_showPeople);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject16() {
    const data = _taggedTemplateLiteral(["\n        <dl>\n          <dt>Rechtenbeleid:</dt>\n          <dd>\n            <div class='copyright' style=\"margin: 0.25em 0;\">\n              <abbr title='", "'>\n              <a href='", "'><img src='", "' alt='", "' width='115' height='40'></a>\n            </abbr>\n              <div style=\"display:inline-block; vertical-align:top\">\n                <p style=\"font-size: small;\">", "<br>(", ")</p>\n              </div>\n            </div>\n          </dd>\n        </dl>\n      "]);

    _templateObject16 = function _templateObject16() {
      return data;
    };

    return data;
  }

  function _templateObject15() {
    const data = _taggedTemplateLiteral(["\n      ", "\n    "]);

    _templateObject15 = function _templateObject15() {
      return data;
    };

    return data;
  }

  function _templateObject14() {
    const data = _taggedTemplateLiteral(["\n      <p class='copyright'>", "</p>\n    "]);

    _templateObject14 = function _templateObject14() {
      return data;
    };

    return data;
  }

  function _templateObject13() {
    const data = _taggedTemplateLiteral(["\n    <p>\n      ", "\n      ", "\n    </p>\n  "]);

    _templateObject13 = function _templateObject13() {
      return data;
    };

    return data;
  }

  function _templateObject12() {
    const data = _taggedTemplateLiteral(["\n    <p>\n      Er zijn errata aanwezig. Zie de <a href=\"", "\"><strong>errata</strong></a> voor fouten en problemen die gerapporteerd zijn na publicatie.\n    </p>\n  "]);

    _templateObject12 = function _templateObject12() {
      return data;
    };

    return data;
  }

  function _templateObject11() {
    const data = _taggedTemplateLiteral(["\n      <dt>", "</dt>\n      ", "\n    "]);

    _templateObject11 = function _templateObject11() {
      return data;
    };

    return data;
  }

  function _templateObject10() {
    const data = _taggedTemplateLiteral(["", ""]);

    _templateObject10 = function _templateObject10() {
      return data;
    };

    return data;
  }

  function _templateObject9() {
    const data = _taggedTemplateLiteral(["", ""]);

    _templateObject9 = function _templateObject9() {
      return data;
    };

    return data;
  }

  function _templateObject8() {
    const data = _taggedTemplateLiteral(["\n      <dt>", "</dt>\n      <dd><a href='", "'>", "</a></dd>\n    "]);

    _templateObject8 = function _templateObject8() {
      return data;
    };

    return data;
  }

  function _templateObject7() {
    const data = _taggedTemplateLiteral(["\n      <dt>Vorige versie:</dt>\n      <dd><a href='", "'>", "</a></dd>\n    "]);

    _templateObject7 = function _templateObject7() {
      return data;
    };

    return data;
  }

  function _templateObject6() {
    const data = _taggedTemplateLiteral(["\n      <dt>", "</dt>\n      <dd>", "</dd>\n    "]);

    _templateObject6 = function _templateObject6() {
      return data;
    };

    return data;
  }

  function _templateObject5() {
    const data = _taggedTemplateLiteral(["<a href='", "'>", "</a>"]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    const data = _taggedTemplateLiteral(["\n      <dt>", "</dt>\n      <dd><a class='u-url' href='", "'>", "</a></dd>\n      <dt>", "</dt>\n      <dd>", "</dd>\n    "]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["\n    ", "<br/>\n    "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["\n    <h2 id='subtitle'>", "</h2>\n  "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["<div class='head'>\n  ", "\n  <h1 class='title p-name' id='title'>", "</h1>\n  ", "\n  <h2>Logius ", "\n  ", " <time class='dt-published' datetime='", "'>", "</time></h2>\n  <dl>\n    ", "\n    ", "\n    ", "\n    ", "\n    <dt>", "</dt>\n    ", "\n    ", "\n    ", "\n  </dl>\n  ", "\n  ", "\n    ", "\n  <hr title=\"Separator for header\">\n</div>"]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  var _default = conf => {
    const html = _hyperhtml.default;
    return html(_templateObject(), conf.logos.map(_showLogo.default), conf.title, conf.subtitle ? html(_templateObject2(), conf.subtitle) : "", conf.isRegular ? html(_templateObject3(), conf.typeStatus) : "", conf.textStatus, conf.dashDate, conf.publishHumanDate, !conf.isNoTrack ? html(_templateObject4(), conf.l10n.this_version, conf.thisVersion, conf.thisVersion, conf.l10n.latest_published_version, conf.latestVersion ? html(_templateObject5(), conf.latestVersion, conf.latestVersion) : "geen") : "", conf.bugTrackerHTML ? html(_templateObject6(), conf.l10n.bug_tracker, [conf.bugTrackerHTML]) : "", conf.showPreviousVersion ? html(_templateObject7(), conf.prevVersion, conf.prevVersion) : "", conf.edDraftURI ? html(_templateObject8(), conf.l10n.latest_editors_draft, conf.edDraftURI, conf.edDraftURI) : "", conf.multipleEditors ? html(_templateObject9(), conf.l10n.editors) : html(_templateObject10(), conf.l10n.editor), (0, _showPeople.default)(conf, "Editor", conf.editors), conf.authors ? html(_templateObject11(), conf.multipleAuthors ? [conf.l10n.authors] : [conf.l10n.author], (0, _showPeople.default)(conf, "Author", conf.authors)) : "", conf.otherLinks ? conf.otherLinks.map(_showLink.default) : "", conf.errata ? html(_templateObject12(), conf.errata) : "", conf.alternateFormats ? html(_templateObject13(), conf.multipleAlternates ? "Dit document is ook beschikbaar in deze niet-normatieve formaten:" : "Dit document is ook beschikbaar in dit niet-normatieve formaat:", [conf.alternatesHTML]) : "", conf.additionalCopyrightHolders ? html(_templateObject14(), [conf.additionalCopyrightHolders]) : html(_templateObject15(), conf.overrideCopyright ? [conf.overrideCopyright] : html(_templateObject16(), [conf.licenseInfo.name], [conf.licenseInfo.url], [conf.licenseInfo.image], [conf.licenseInfo.name], [conf.licenseInfo.name], [conf.licenseInfo.short])));
  };

  _exports.default = _default;
});
//# sourceMappingURL=headers.js.map