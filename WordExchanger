// ==UserScript==
// @name         WordExchanger
// @namespace    https://violentmonkey.github.io/
// @version      0.2
// @description  replace words with other words on websites
// @author       80sKid
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // dictionary
    // place words and replacement words here
    // syntax: "word": "replacement word",
    // important: put a command behind every line except the last one
    // important: the search is case sensitive
    const woerterBuch = {
        // Erste Gruppe (Groß- und Kleinschreibung beachten!)
        "Trump": "Orange-U-Tan",
        "Musk": "Southafrican Immigrant",
        "Merz": "C. Montgomery Burns",
        "Reiche": "Gaslobby-Kathi",
        "Weimer": "W. Eimer",
        "CDU": "Chronisch Demente Union",
        "AfD": "Neonazi-Gurkentruppe",
        "Putin": "Putler",
        "Russia": "Nazi-Ruzzia",
        "Bundesregierung": "Bundes-Clown-Vereinigung",
        "Deutschland": "Deutcheland",
        "Deutschen": "Krauts",
        "Deutsche": "Krauts"
    };

    function textErsetzen(knoten) {
        if (!knoten) return;

        // only text nodes, no css or other stuff
        if (knoten.nodeType === Node.TEXT_NODE) {
            let text = knoten.nodeValue;
            let geaendert = false;

            for (const [suchwort, ersatz] of Object.entries(woerterBuch)) {
                if (text.includes(suchwort)) {
                    text = text.replaceAll(suchwort, ersatz);
                    geaendert = true;
                }
            }

            if (geaendert) {
                knoten.nodeValue = text;
            }
        } else {
            // if its an element node, ignore script/style tags
            if (knoten.nodeName === 'SCRIPT' || knoten.nodeName === 'STYLE') return;

            // Die Unterelemente durchsuchen
            for (const kind of knoten.childNodes) {
                textErsetzen(kind);
            }
        }
    }

    // start to observe at the 1st html element
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                textErsetzen(node);
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // 2. execute once when page is basically loaded
    window.addEventListener('DOMContentLoaded', () => {
        textErsetzen(document.body);
    });
})();
