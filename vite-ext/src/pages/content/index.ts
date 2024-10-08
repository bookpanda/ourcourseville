async function share() {
  console.log("Share button clicked");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  async function runHandler() {
    try {
      console.log({ message });

      if (message.action !== "share") {
        throw new Error(`Unknown action: ${message.action}`);
      }

      await share();

      sendResponse({
        status: "success",
        message: `Total Prompt Tokens:`,
        warning: "no",
      });
    } catch (e) {
      console.error(e);
      sendResponse({ status: "error", message: `${e}` });
    }
  }

  runHandler();
  return true;
});

console.log("ourcourseville content script loaded");
