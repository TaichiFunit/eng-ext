document.querySelectorAll("div.lecture-attachment").forEach((div) => {
  const button = div.querySelector("button");
  if (button) {
    const url = button.getAttribute("data-href");
    chrome.runtime.sendMessage({ url: url });
  }
});
