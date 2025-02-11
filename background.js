chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.url) {
    chrome.downloads.download({
      url: request.url,
    });
  }
});
