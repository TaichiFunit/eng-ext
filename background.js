chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
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
  }
});

function getDownloadUrl() {
  console.log("getDownloadUrl");
  const button = document.querySelector("div.lecture-attachment button");
  return button ? button.getAttribute("data-href") : null;
}
