'use strict'

function update(modifier) {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    const newIdx = modifier(tabs.find((tab) => tab.active).index);

    if (newIdx < 0 || newIdx >= tabs.length) return;

    const newTab = tabs.find((tab) => tab.index === newIdx);
    if (newTab) chrome.tabs.update(newTab.id, {active: true});
  });
}

const next = update.bind(null, (x) => x + 1);
const prev = update.bind(null, (x) => x - 1);

chrome.commands.onCommand.addListener((command) => {
  if (command === 'switchTabLeft') {
    prev();
  } else if (command === 'switchTabRight') {
    next();
  }
});
