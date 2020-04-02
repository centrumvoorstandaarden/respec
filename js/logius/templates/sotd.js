define(["exports", "hyperhtml"], function (_exports, _hyperhtml) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject9() {
    const data = _taggedTemplateLiteral([" Dit is de definitieve versie van de praktijkrichtlijn. Een praktijkrichtlijn is een product dat informatie geeft, vaak met een technisch karakter, dat nodig is voor het toepassen van een standaard. Een praktijkrichtlijn hoort altijd bij een standaard/norm."]);

    _templateObject9 = function _templateObject9() {
      return data;
    };

    return data;
  }

  function _templateObject8() {
    const data = _taggedTemplateLiteral([" De programmaraad van Logius beoordeelt dit definitief concept. Keurt zij het goed, dan is er een nieuwe standaard."]);

    _templateObject8 = function _templateObject8() {
      return data;
    };

    return data;
  }

  function _templateObject7() {
    const data = _taggedTemplateLiteral([" De programmaraad van Logius heeft deze standaard goedgekeurd."]);

    _templateObject7 = function _templateObject7() {
      return data;
    };

    return data;
  }

  function _templateObject6() {
    const data = _taggedTemplateLiteral(["\n    Dit is een document zonder offici\xEBle status.\n"]);

    _templateObject6 = function _templateObject6() {
      return data;
    };

    return data;
  }

  function _templateObject5() {
    const data = _taggedTemplateLiteral(["\n  Dit is een definitief concept van de nieuwe versie van ", " ", ". Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.\n"]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    const data = _taggedTemplateLiteral(["\n    Dit is een door de werkgroep goedgekeurde consultatieversie. Commentaar over dit document kan gestuurd worden naar\n    <a href='", "'>\n        ", "</a>.\n"]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    const data = _taggedTemplateLiteral(["\n  Dit is een werkversie die op elk moment kan worden gewijzigd, verwijderd of vervangen door andere documenten. Het is geen door de werkgroep goedgekeurde consultatieversie.\n"]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    const data = _taggedTemplateLiteral(["\n    Dit is de definitieve versie van ", " ", ". Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.\n"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["<h2>", "</h2><p>\n    <em>", "</em>\n  </p>\n  <p>\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n</p>\n", "\n", ""]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  // Thijs Brentjens: changed statusses and texts for the Geonovum specTypes
  var _default = conf => {
    const html = _hyperhtml.default; // handle the emailComments configuration

    if (!conf.emailComments) {
      conf.emailComments = "TODO";
    }

    conf.emailCommentsMailto = "mailto:" + conf.emailComments;
    conf.specType == "IM" ? conf.article = 'het ' : conf.article = 'de '; // Thijs Brentjens, https://github.com/Geonovum/respec/issues/138
    // change the text in more detail according to the specType and specStatus

    return html(_templateObject(), conf.l10n.sotd, [conf.l10n.status_at_publication], conf.isGNDEF ? html(_templateObject2(), conf.article, conf.typeStatus.toLowerCase()) : "", conf.isGNWV ? html(_templateObject3()) : "", conf.isGNCV ? html(_templateObject4(), conf.emailCommentsMailto, conf.emailComments) : "", conf.isGNVV ? html(_templateObject5(), conf.article, conf.typeStatus.toLowerCase()) : "", conf.isGNBASIS ? html(_templateObject6()) : "", conf.specType == "ST" && conf.isGNDEF ? html(_templateObject7()) : "", conf.specType == "ST" && conf.isGNVV ? html(_templateObject8()) : "", conf.specType == "PR" ? html(_templateObject9()) : "", [conf.additionalContent], [conf.additionalSections]);
  };

  _exports.default = _default;
});
//# sourceMappingURL=sotd.js.map