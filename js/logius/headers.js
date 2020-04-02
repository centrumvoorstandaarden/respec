define(["exports", "../core/utils", "../core/pubsubhub", "hyperhtml", "./templates/sotd", "./templates/headers"], function (_exports, _utils, _pubsubhub, _hyperhtml, _sotd, _headers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _hyperhtml = _interopRequireDefault(_hyperhtml);
  _sotd = _interopRequireDefault(_sotd);
  _headers = _interopRequireDefault(_headers);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _templateObject() {
    const data = _taggedTemplateLiteral(["", ""]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

  const name = "logius/headers";
  _exports.name = name;
  const GNVMDate = new Intl.DateTimeFormat(["nl"], {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "2-digit"
  }); // Thijs: clean this up, for Geonovum
  // added statusses and types for Geonovum

  const status2maturity = {}; // Thijs Brentjens: added Geonovum statusses
  // https://github.com/Geonovum/respec/wiki/specStatus

  const status2text = {
    "GN-WV": "Werkversie",
    "GN-CV": "Consultatieversie",
    "GN-VV": "Versie ter vaststelling",
    "GN-DEF": "Vastgestelde versie",
    "GN-BASIS": "Document"
  }; // Thijs Brentjens: added Geonovum types
  // https://github.com/Geonovum/respec/wiki/specType

  const type2text = {
    NO: "Norm",
    ST: "Standaard",
    IM: "Informatiemodel",
    PR: "Praktijkrichtlijn",
    HR: "Handreiking",
    WA: "Werkafspraak",
    // 2019-05-10 extend with 2 new types
    AL: "Algemeen",
    BD: "Beheerdocumentatie"
  };
  const status2long = {// "FPWD-NOTE": "First Public Working Group Note",
    // "LC-NOTE": "Last Call Working Draft",
  };
  const noTrackStatus = []; // empty? or only "GN-BASIS"?
  // Thijs Brentjens: default licenses for Geonovum to version 4.0

  const licenses = {
    cc0: {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
      image: "https://tools.geostandaarden.nl/respec/style/logos/CC-Licentie.svg"
    },
    "cc-by": {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
      image: "https://tools.geostandaarden.nl/respec/style/logos/cc-by.svg"
    },
    "cc-by-nd": {
      name: "Creative Commons Naamsvermelding-GeenAfgeleideWerken 4.0 Internationaal",
      short: "CC-BY-ND",
      url: "https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl",
      image: "https://tools.geostandaarden.nl/respec/style/logos/cc-by-nd.svg"
    }
  };

  function validateDateAndRecover(conf, prop, fallbackDate = new Date()) {
    const date = conf[prop] ? new Date(conf[prop]) : new Date(fallbackDate); // if date is valid

    if (Number.isFinite(date.valueOf())) {
      const formattedDate = _utils.ISODate.format(date);

      return new Date(formattedDate);
    }

    const msg = "[`".concat(prop, "`](https://github.com/w3c/respec/wiki/").concat(prop, ") ") + "is not a valid date: \"".concat(conf[prop], "\". Expected format 'YYYY-MM-DD'.");
    (0, _pubsubhub.pub)("error", msg);
    return new Date(_utils.ISODate.format(new Date()));
  }

  function run(conf) {
    // Thijs Brentjens: TODO: decide by default unofficial?
    // conf.isUnofficial = conf.specStatus === "unofficial";
    conf.isUnofficial = true;

    if (!conf.logos) {
      // conf.isUnofficial
      conf.logos = [];
    }

    conf.specStatus = conf.specStatus ? conf.specStatus.toUpperCase() : "";
    conf.specType = conf.specType ? conf.specType.toUpperCase() : "";
    conf.pubDomain = conf.pubDomain ? conf.pubDomain.toLowerCase() : "";
    conf.hasBeenPublished = conf.publishDate ? true : false; // Thijs Brentjens: TODO: document license types for Geonovum

    conf.isCCBY = conf.license === "cc-by";
    conf.isCCBYND = conf.license === "cc-by-nd";
    conf.licenseInfo = licenses[conf.license];
    conf.isBasic = conf.specStatus === "base"; // Thijs Brentjens: TODO: for a GN-BASIS document, is it neceassry to deal differently with URIs? Especially for "Laatst gepubliceerde versie"
    // Deal with all current GN specStatusses the same. This is mostly seen in the links in the header for Last editor's draft etc
    // conf.isRegular = conf.specStatus !== "GN-BASIS";

    conf.isRegular = true;
    conf.isOfficial = conf.specStatus === "GN-DEF";

    if (!conf.specStatus) {
      (0, _pubsubhub.pub)("error", "Missing required configuration: `specStatus`");
    }

    if (conf.isRegular && !conf.shortName) {
      (0, _pubsubhub.pub)("error", "Missing required configuration: `shortName`");
    }

    conf.title = document.title || "No Title";
    if (!conf.subtitle) conf.subtitle = "";
    conf.publishDate = validateDateAndRecover(conf, "publishDate", document.lastModified);
    conf.publishYear = conf.publishDate.getUTCFullYear();
    conf.publishHumanDate = GNVMDate.format(conf.publishDate);
    conf.isNoTrack = noTrackStatus.includes(conf.specStatus);

    if (!conf.edDraftURI) {
      conf.edDraftURI = ""; // Thijs Brentjens: deal with editors draft links based on Github URIs

      if (conf.github) {
        // parse the org and repo name to construct a github.io URI if a github URI is provided
        // https://github.com/Geonovum/respec/issues/141
        // https://github.com/{org}/{repo} should be rewritten to https://{org}.github.io/{repo}/
        var githubParts = conf.github.split('github.com/')[1].split('/');
        conf.edDraftURI = "https://" + githubParts[0] + ".github.io/" + githubParts[1];
      }

      if (conf.specStatus === "ED") (0, _pubsubhub.pub)("warn", "Editor's Drafts should set edDraftURI.");
    } // Version URLs
    // Thijs Brentjens: changed this to Geonovum specific format. See https://github.com/Geonovum/respec/issues/126


    if (conf.isRegular && conf.specStatus !== "GN-WV") {
      conf.thisVersion = "TODO" + conf.pubDomain + "/" + conf.specStatus.substr(3).toLowerCase() + "-" + conf.specType.toLowerCase() + "-" + conf.shortName + "-" + (0, _utils.concatDate)(conf.publishDate) + "/";
    } else {
      conf.thisVersion = conf.edDraftURI;
    } // Only show latestVersion if a publishDate has been set. see issue https://github.com/Geonovum/respec/issues/93


    if (conf.isRegular && conf.hasBeenPublished) // Thijs Brentjens: see
      conf.latestVersion = "TODO" + conf.pubDomain + "/" + conf.shortName + "/"; // Thijs Brentjens: support previousMaturity as previousStatus

    if (conf.previousMaturity && !conf.previousStatus) conf.previousStatus = conf.previousMaturity; // Thijs Brentjens: default to current specStatus if previousStatus is not provided

    if (conf.previousPublishDate && !conf.previousStatus) conf.previousStatus = conf.specStatus;

    if (conf.previousPublishDate && conf.previousStatus) {
      conf.previousPublishDate = validateDateAndRecover(conf, "previousPublishDate");
      var prevStatus = conf.previousStatus.substr(3).toLowerCase(); // Thijs Brentjens: default to current spectype
      // TODO: should the prev-/spectype always be in the WP URL too?

      var prevType = "";

      if (conf.previousType) {
        prevType = conf.previousType.toLowerCase();
      } else {
        prevType = conf.specType.toLowerCase();
      }

      conf.prevVersion = "None" + conf.previousPublishDate;
      conf.prevVersion = "TODO" + conf.pubDomain + "/" + prevStatus + "-" + prevType + "-" + conf.shortName + "-" + (0, _utils.concatDate)(conf.previousPublishDate) + "/";
    }

    var peopCheck = function peopCheck(it) {
      if (!it.name) (0, _pubsubhub.pub)("error", "All authors and editors must have a name.");
    };

    if (conf.editors) {
      conf.editors.forEach(peopCheck);
    }

    if (conf.authors) {
      conf.authors.forEach(peopCheck);
    }

    conf.multipleEditors = conf.editors && conf.editors.length > 1;
    conf.multipleAuthors = conf.authors && conf.authors.length > 1;
    $.each(conf.alternateFormats || [], function (i, it) {
      if (!it.uri || !it.label) (0, _pubsubhub.pub)("error", "All alternate formats must have a uri and a label.");
    });
    conf.multipleAlternates = conf.alternateFormats && conf.alternateFormats.length > 1;
    conf.alternatesHTML = conf.alternateFormats && (0, _utils.joinAnd)(conf.alternateFormats, function (alt) {
      var optional = alt.hasOwnProperty("lang") && alt.lang ? " hreflang='" + alt.lang + "'" : "";
      optional += alt.hasOwnProperty("type") && alt.type ? " type='" + alt.type + "'" : "";
      return "<a rel='alternate' href='" + alt.uri + "'" + optional + ">" + alt.label + "</a>";
    });

    if (conf.bugTracker) {
      if (conf.bugTracker["new"] && conf.bugTracker.open) {
        conf.bugTrackerHTML = "<a href='" + conf.bugTracker["new"] + "'>" + conf.l10n.file_a_bug + "</a> " + conf.l10n.open_parens + "<a href='" + conf.bugTracker.open + "'>" + conf.l10n.open_bugs + "</a>" + conf.l10n.close_parens;
      } else if (conf.bugTracker.open) {
        conf.bugTrackerHTML = "<a href='" + conf.bugTracker.open + "'>open bugs</a>";
      } else if (conf.bugTracker["new"]) {
        conf.bugTrackerHTML = "<a href='" + conf.bugTracker["new"] + "'>file a bug</a>";
      }
    }

    if (conf.copyrightStart && conf.copyrightStart == conf.publishYear) conf.copyrightStart = "";

    for (var k in status2text) {
      if (status2long[k]) continue;
      status2long[k] = status2text[k];
    }

    conf.longStatus = status2long[conf.specStatus];
    conf.textStatus = status2text[conf.specStatus]; // Thijs: added typeStatus

    conf.typeStatus = type2text[conf.specType];
    conf.showThisVersion = !conf.isNoTrack; // || conf.isTagFinding;
    // Thijs Brentjens: adapted for Geonovum document tyoes
    // TODO: add an extra check, because now it seems that showPreviousVersion is true in (too) many cases?

    conf.showPreviousVersion = !conf.isNoTrack && !conf.isSubmission; // Thijs Brentjens: only show if prevVersion is available

    if (!conf.prevVersion) conf.showPreviousVersion = false; // Thijs: get specStatus from Geonovum list https://github.com/Geonovum/respec/wiki/specStatus

    conf.isGNDEF = conf.specStatus === "GN-DEF";
    conf.isGNWV = conf.specStatus === "GN-WV";
    conf.isGNCV = conf.specStatus === "GN-CV";
    conf.isGNVV = conf.specStatus === "GN-VV";
    conf.isGNBASIS = conf.specStatus === "GN-BASIS";
    conf.dashDate = _utils.ISODate.format(conf.publishDate);
    conf.publishISODate = conf.publishDate.toISOString();
    conf.shortISODate = _utils.ISODate.format(conf.publishDate);
    Object.defineProperty(conf, "wgId", {
      get() {
        if (!this.hasOwnProperty("wgPatentURI")) {
          return "";
        } // it's always at "pp-impl" + 1


        const urlParts = this.wgPatentURI.split("/");
        const pos = urlParts.findIndex(item => item === "pp-impl") + 1;
        return urlParts[pos] || "";
      }

    }); // configuration done - yay!
    // insert into document

    const header = (0, _headers.default)(conf);
    document.body.insertBefore(header, document.body.firstChild);
    document.body.classList.add("h-entry"); // handle SotD

    var sotd = document.getElementById("sotd") || document.createElement("section");

    if (!conf.isNoTrack && !sotd.id) {
      (0, _pubsubhub.pub)("error", "A custom SotD paragraph is required for your type of document.");
    }

    sotd.id = sotd.id || "stod";
    sotd.classList.add("introductory"); // NOTE:
    //  When arrays, wg and wgURI have to be the same length (and in the same order).
    //  Technically wgURI could be longer but the rest is ignored.
    //  However wgPatentURI can be shorter. This covers the case where multiple groups
    //  publish together but some aren't used for patent policy purposes (typically this
    //  happens when one is foolish enough to do joint work with the TAG). In such cases,
    //  the groups whose patent policy applies need to be listed first, and wgPatentURI
    //  can be shorter — but it still needs to be an array.

    var wgPotentialArray = [conf.wg, conf.wgURI, conf.wgPatentURI];

    if (wgPotentialArray.some(item => Array.isArray(item)) && !wgPotentialArray.every(item => Array.isArray(item))) {
      (0, _pubsubhub.pub)("error", "If one of '`wg`', '`wgURI`', or '`wgPatentURI`' is an array, they all have to be.");
    }

    if (Array.isArray(conf.wg)) {
      conf.multipleWGs = conf.wg.length > 1;
      conf.wgHTML = (0, _utils.joinAnd)(conf.wg, function (wg, idx) {
        return "the <a href='" + conf.wgURI[idx] + "'>" + wg + "</a>";
      });
      var pats = [];

      for (var i = 0, n = conf.wg.length; i < n; i++) {
        pats.push("a <a href='" + conf.wgPatentURI[i] + "' rel='disclosure'>" + "public list of any patent disclosures  (" + conf.wg[i] + ")</a>");
      }

      conf.wgPatentHTML = (0, _utils.joinAnd)(pats);
    } else {
      conf.multipleWGs = false;
      conf.wgHTML = "the <a href='" + conf.wgURI + "'>" + conf.wg + "</a>";
    }

    if (conf.specStatus === "PR" && !conf.crEnd) {
      (0, _pubsubhub.pub)("error", "`specStatus` is \"PR\" but no `crEnd` is specified (needed to indicate end of previous CR).");
    }

    if (conf.specStatus === "CR" && !conf.crEnd) {
      (0, _pubsubhub.pub)("error", "`specStatus` is \"CR\", but no `crEnd` is specified in Respec config.");
    }

    conf.crEnd = validateDateAndRecover(conf, "crEnd");
    conf.humanCREnd = GNVMDate.format(conf.crEnd);

    if (conf.specStatus === "PR" && !conf.prEnd) {
      (0, _pubsubhub.pub)("error", "`specStatus` is \"PR\" but no `prEnd` is specified.");
    }

    conf.prEnd = validateDateAndRecover(conf, "prEnd");
    conf.humanPREnd = GNVMDate.format(conf.prEnd);

    if (conf.specStatus === "PER" && !conf.perEnd) {
      (0, _pubsubhub.pub)("error", "Status is PER but no perEnd is specified");
    }

    conf.perEnd = validateDateAndRecover(conf, "perEnd");
    conf.humanPEREnd = GNVMDate.format(conf.perEnd);
    if (conf.subjectPrefix !== "") conf.subjectPrefixEnc = encodeURIComponent(conf.subjectPrefix);

    _hyperhtml.default.bind(sotd)(_templateObject(), populateSoTD(conf, sotd));

    if (!conf.implementationReportURI && (conf.isCR || conf.isPR || conf.isRec)) {
      (0, _pubsubhub.pub)("error", "CR, PR, and REC documents need to have an `implementationReportURI` defined.");
    } // Requested by https://github.com/w3c/respec/issues/504
    // Makes a record of a few auto-generated things.


    (0, _pubsubhub.pub)("amend-user-config", {
      publishISODate: conf.publishISODate,
      generatedSubtitle: "".concat(conf.longStatus, " ").concat(conf.publishHumanDate)
    });
  }

  function populateSoTD(conf, sotd) {
    const sotdClone = sotd.cloneNode(true);
    const additionalNodes = document.createDocumentFragment();
    const additionalContent = document.createElement("temp"); // we collect everything until we hit a section,
    // that becomes the custom content.

    while (sotdClone.hasChildNodes()) {
      if (sotdClone.firstChild.nodeType !== Node.ELEMENT_NODE || sotdClone.firstChild.localName !== "section") {
        additionalNodes.appendChild(sotdClone.firstChild);
        continue;
      }

      break;
    }

    additionalContent.appendChild(additionalNodes);
    conf.additionalContent = additionalContent.innerHTML; // Whatever sections are left, we throw at the end.

    conf.additionalSections = sotdClone.innerHTML;
    return (0, _sotd.default)(conf);
  }
});
//# sourceMappingURL=headers.js.map