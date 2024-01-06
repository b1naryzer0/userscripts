// ==UserScript==
// @name        Bluesky Autorefresh
// @namespace   https://github.com/b1naryzer0
// @match       https://bsky.app/*
// @grant       none
// @version     1.2
// @author      80sKid
// @description Auto Refresh for Bluesky
// ==/UserScript==

const origSetInterval = window.setInterval.bind(window);

// refresh 15sec === refresh fn
const isBskyRefresh = (fn, ms) => {
  const source = fn.toString();
  return source.includes(".updateSessionState()") && ms === 15e3;
};

const addRefreshCallForPageVisible = (refreshFn) => {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      try {
        refreshFn();
        document.querySelector('[aria-label="Load new posts"]')?.click();
      } catch(error){
        console.error("[GM] refresh function call is falled", {
          error
        })
      } finally {
        console.log("[GM] call auto refresh")
      }
    }
  });
};
window.setInterval = (fn, ms) => {
  if(isBskyRefresh(fn,ms)){
    addRefreshCallForPageVisible(fn); // when page is shown, call refresh function
  }
  origSetInterval.call(this, fn, ms);
};
