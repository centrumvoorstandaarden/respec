define(["exports", "./templates/conformance", "../core/pubsubhub"], function (_exports, _conformance, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _conformance = _interopRequireDefault(_conformance);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // Module w3c/conformance
  // Handle the conformance section properly.
  const name = "logius/conformance";
  _exports.name = name;

  function run(conf, doc, cb) {
    var $confo = $("#conformance");
    if ($confo.length) $confo.prepend((0, _conformance.default)(conf).childNodes); // Added message for legacy compat with Aria specs
    // See https://github.com/w3c/respec/issues/793

    (0, _pubsubhub.pub)("end", "logius/conformance");
    cb();
  }
});
//# sourceMappingURL=conformance.js.map