document.getElementById("downloadButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.scripting.executeScript(
      {
        target: { tabId: activeTab.id },
        function: getDownloadUrl,
      },
      (results) => {
        if (results && results[0] && results[0].result) {
          const url = results[0].result;
          chrome.runtime.sendMessage({ url: url });
        }
      }
    );
  });
});

function getDownloadUrl() {
  const button = document.querySelector("div.lecture-attachment button");
  return button ? button.getAttribute("data-href") : null;
}
