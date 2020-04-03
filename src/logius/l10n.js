// Module w3c/l10n
// Looks at the lang attribute on the root element and uses it to manage the config.l10n object so
// that other parts of the system can localise their text
import { l10n } from "../core/l10n";
export const name = "logius/l10n";
const additions = {
  en: {
    status_at_publication:
      "This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current Logius publications and the latest revision of this document can be found via <a href='TODO'>TODO</a>(in Dutch).",
  },
  nl: {
    status_at_publication:
      "Deze paragraaf beschrijft de status van dit document ten tijde van publicatie. Het is mogelijk dat er actuelere versies van dit document bestaan. Een lijst van Logius publicaties en de laatste gepubliceerde versie van dit document zijn te vinden op <a href='TODO'>TODO</a>.",
  },
};

Object.keys(additions).reduce((l10n, key) => {
  Object.assign(l10n[key], additions[key]);
  return l10n;
}, l10n);
