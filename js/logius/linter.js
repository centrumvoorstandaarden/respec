define(["exports", "../core/linter", "w3c/linter-rules/privsec-section"], function (_exports, _linter, _privsecSection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.name = void 0;
  _linter = _interopRequireDefault(_linter);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * Module w3c/linter
   * Registers linter rules for w3c specs.
   */
  const name = "logius/linter";
  _exports.name = name;

  _linter.default.register(_privsecSection.lint);
});
//# sourceMappingURL=linter.js.map