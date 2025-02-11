chrome.commands.onCommand.addListener((command) => {
  if (command === "trigger_download") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: getDownloadUrl,
        },
        (results) => {
          console.log("before if");
          if (results && results[0] && results[0].result) {
            console.log("in if");
            const url = results[0].result;
            chrome.runtime.sendMessage({ url: url });
          }
        }
      );
    });
  }
});

function getDownloadUrl() {
  console.log("getDownloadUrl");
  const button = document.querySelector("div.lecture-attachment button");
  return button ? button.getAttribute("data-href") : null;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.url) {
    chrome.downloads.download({
      url: request.url,
    });
  }
});
