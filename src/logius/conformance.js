// Module w3c/conformance
// Handle the conformance section properly.
import confoTmpl from "./templates/conformance";
import { pub } from "../core/pubsubhub";

export const name = "logius/conformance";

export function run(conf, doc, cb) {
  var $confo = $("#conformance");
  if ($confo.length) $confo.prepend(confoTmpl(conf).childNodes);
  // Added message for legacy compat with Aria specs
  // See https://github.com/w3c/respec/issues/793
  pub("end", "logius/conformance");
  cb();
}
