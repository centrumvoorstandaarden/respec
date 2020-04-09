/**
 * Module core/markdown
 * Handles the optional markdown processing.
 *
 * Markdown support is optional. It is enabled by setting the `format`
 * property of the configuration object to "markdown."
 *
 * We use marked for parsing Markdown:
 * https://github.com/chjj/marked
 *
 * Note that the content of SECTION elements, and elements with a
 * class name of "note", "issue" or "req" are also parsed.
 *
 * The HTML created by the Markdown parser is turned into a nested
 * structure of SECTION elements, following the structure given by
 * the headings. For example, the following markup:
 *
 *     Title
 *     -----
 *
 *     ### Subtitle ###
 *
 *     Here's some text.
 *
 *     ### Another subtitle ###
 *
 *     More text.
 *
 * will be transformed into:
 *
 *     <section>
 *       <h2>Title</h2>
 *       <section>
 *         <h3>Subtitle</h3>
 *         <p>Here's some text.</p>
 *       </section>
 *       <section>
 *         <h3>Another subtitle</h3>
 *         <p>More text.</p>
 *       </section>
 *     </section>
 *
 * The whitespace of pre elements are left alone.
 */

import { markdownToHtml } from "../core/utils";
export const name = "logius/markdown";

function processElements(selector) {
  return element => {
    const elements = Array.from(element.querySelectorAll(selector));
    elements.reverse().forEach(element => {
      element.innerHTML = markdownToHtml(element.innerHTML);
    });
    return elements;
  };
}

class Builder {
  constructor(doc) {
    this.doc = doc;
    this.root = doc.createDocumentFragment();
    this.stack = [this.root];
    this.current = this.root;
  }
  findPosition(header) {
    return parseInt(header.tagName.charAt(1), 10);
  }
  findParent(position) {
    let parent;
    while (position > 0) {
      position--;
      parent = this.stack[position];
      if (parent) return parent;
    }
  }
  findHeader({ firstChild: node }) {
    while (node) {
      if (/H[1-6]/.test(node.tagName)) {
        return node;
      }
      node = node.nextSibling;
    }
    return null;
  }

  addHeader(header) {
    const section = this.doc.createElement("section");
    const position = this.findPosition(header);

    section.appendChild(header);
    this.findParent(position).appendChild(section);
    this.stack[position] = section;
    this.stack.length = position + 1;
    this.current = section;
  }

  addSection(node, process) {
    const header = this.findHeader(node);
    const position = header ? this.findPosition(header) : 1;
    const parent = this.findParent(position);

    if (header) {
      node.removeChild(header);
    }

    node.appendChild(process(node));

    if (header) {
      node.prepend(header);
    }

    parent.appendChild(node);
    this.current = parent;
  }

  addElement(node) {
    this.current.appendChild(node);
  }
}

function structure(fragment, doc) {
  function process(root) {
    const stack = new Builder(doc);
    while (root.firstChild) {
      const node = root.firstChild;
      if (node.nodeType !== Node.ELEMENT_NODE) {
        root.removeChild(node);
        continue;
      }
      switch (node.localName) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          stack.addHeader(node);
          break;
        case "section":
          stack.addSection(node, process);
          break;
        default:
          stack.addElement(node);
      }
    }
    return stack.root;
  }
  return process(fragment);
}

function substituteWithTextNodes(elements) {
  Array.from(elements).forEach(element => {
    const textNode = element.ownerDocument.createTextNode(element.textContent);
    element.parentElement.replaceChild(textNode, element);
  });
}

const processMDSections = processElements("[data-format='markdown']:not(body)");
const processBlockLevelElements = processElements(
  "[data-format=markdown]:not(body), section, div, address, article, aside, figure, header, main, body"
);

export function run(conf) {
  const hasMDSections = !!document.querySelector(
    "[data-format=markdown]:not(body)"
  );
  const isMDFormat = conf.format === "markdown";
  if (!isMDFormat && !hasMDSections) {
    return; // Nothing to be done
  }

  // Pieter Hering, Logius
  // xformat is a Logius specific config property set in config.js
  if (isMDFormat && conf.xformat) {
    document.body.innerHTML = splitH1sections("[data-format=markdown]:not(body)"); 
  }
  // end addition

  // Only has markdown-format sections
  if (!isMDFormat) {
    processMDSections(document.body)
      .map(elem => {
        const structuredInternals = structure(elem, elem.ownerDocument);
        return {
          structuredInternals,
          elem,
        };
      })
      .forEach(({ elem, structuredInternals }) => {
        elem.setAttribute("aria-busy", "true");
        if (
          structuredInternals.firstElementChild.localName === "section" &&
          elem.localName === "section"
        ) {
          const section = structuredInternals.firstElementChild;
          section.remove();
          elem.append(...section.childNodes);
        } else {
          elem.innerHTML = "";
        }
        elem.appendChild(structuredInternals);
        elem.setAttribute("aria-busy", "false");
      });
    return;
  }
  // We transplant the UI to do the markdown processing
  const rsUI = document.getElementById("respec-ui");
  rsUI.remove();
  // The new body will replace the old body
  const newHTML = document.createElement("html");
  const newBody = document.createElement("body");
  newBody.innerHTML = document.body.innerHTML;
  // Marked expects markdown be flush against the left margin
  // so we need to normalize the inner text of some block
  // elements.
  newHTML.appendChild(newBody);
  processBlockLevelElements(newHTML);
  // Process root level text nodes
  const cleanHTML = newBody.innerHTML
    // Markdown parsing sometimes inserts empty p tags
    .replace(/<p>\s*<\/p>/gm, "");
  newBody.innerHTML = cleanHTML;
  // Remove links where class .nolinks
  substituteWithTextNodes(newBody.querySelectorAll(".nolinks a[href]"));
  // Restructure the document properly
  const fragment = structure(newBody, document);
  // Frankenstein the whole thing back together
  newBody.appendChild(fragment);
  newBody.prepend(rsUI);
  document.body.parentNode.replaceChild(newBody, document.body);
}


// Pieter Hering, Logius
// this script splits markdown level 1 headers ("#") in seperate sections
// in order to (temporary) fix a problem with respec
// below an example what this fix is actually doing 
// 
// original content (can be inline or a 'data-included' document) 
// (note: newlines as required by markdown are removed for readibility)
// <section data-format="markdown">
//   # Hoofdstuk 1
//   ## This is level 1.2
//   This is a paragraph with some `code`.
//   # Hoofdstuk 2
//   ## This is level 2.2
// </section>
//
// will be replaced by
//
// <section data-format="markdown">
//   # Hoofdstuk 1
//   ## This is level 1.2
//   This is a paragraph with some `code`.
// </section>
// <section data-format="markdown">
//   # Hoofdstuk 2
//   ## This is level 2.2
// </section>
//

// splitH1Sections performs the following steps
// 1. select all nodes  according to selector filter
// 2. call filterH1lines for each node
// 3. mark original node whith a (bogus) 'killme' class
// 4. insert each node from nodes set returned by filterH1lines before orignal node  
// 5. remove the marked original nodes
function splitH1sections(selector) {
  var bodyCopy = document.body.cloneNode(true);
  var elements = bodyCopy.querySelectorAll(selector);
  
  elements.forEach(element => {
    var newNode = filterH1lines(element);

    // mark the original section element for deletion when finished
    element.classList.add("killme");

    var beforeNode = element;
    for (let i = newNode.childNodes.length - 1; i >= 0; i--) {
      // insert the node backwards, to avoid some side effects when inserting childnodes 
      beforeNode = element.parentNode.insertBefore(newNode.childNodes[i], beforeNode);
    }
  });
  // the selector is  using '~=' in query to retrieve all node that contains the killme attribute
  // this fixes a bug where 'normative killme'was not recognized 
  elements = bodyCopy.querySelectorAll("[class~=killme]:not(body)");
  // remove original elements
  elements.forEach(el => {
    var pn = el.parentNode;
    pn.removeChild(el);
  });

  return bodyCopy.innerHTML;
}

// filterH1lines searches for a pattern like '# <section name>' (Markdown H1 section) in the node's innerhtml 
// and generates new sections for each part that starts with a H1 section  
// see example above for an overview
function filterH1lines(element) {
  var attrs = element.attributes;
  const regex = /^[ ]*# [\w ]+/gm;
  const matches = element.innerHTML.matchAll(regex);
  const pos = [0];

  for (const match of matches) {
  // skip first match since Respec starts a new section by default 
    if (match.index > 0) {
      pos.push(match.index);
    }
  }


  // add position of last character to have correct pairs for the substring operation    
  pos.push(element.innerHTML.length - 1);

  // create a div element as a container for the split sections
  // the div itself will/should not be used by the caller   
  var div = document.createElement("div");
  for (var j = 0; j < pos.length - 1; j++) {

    // copy element name from original node
    var newEl = document.createElement(element.localName);
    // copy attributes from original node
    for (var k = attrs.length - 1; k >= 0; k--) {
      newEl.setAttribute(attrs[k].name, attrs[k].value);
    }
    // insert  the part that starts at H1 section until next H1 section
    newEl.innerHTML = element.innerHTML.substring(pos[j], pos[j + 1])
    div.appendChild(newEl);
  }
  return div;
}