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
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
          if (results && results[0] && results[0].result) {
            const url = results[0].result;
            chrome.downloads.download({ url: url }, (downloadId) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
              } else {
                console.log(`Download started with ID: ${downloadId}`);
              }
            });
          } else {
            console.error("No URL found in the active tab.");
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
