import { getRecord, saveRecord } from "./api";
import { fillin } from "./scripts/fillin";
import { scrape } from "./scripts/scrape";

async function share(url: string) {
  const warnings: string[] = [];

  const res = scrape(url);

  await saveRecord(res);

  return { res, warnings };
}

async function load(recordID: string) {
  const warnings: string[] = [];

  const record = await getRecord(recordID);
  //warnings when cannot load
  const res = fillin(record);

  return { res, warnings };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  async function runHandler() {
    try {
      console.log({ message });

      if (message.action !== "share") {
        throw new Error(`Unknown action: ${message.action}`);
      }

      const url: string | undefined = message.url;
      if (!url) {
        throw new Error("no url provided");
      }

      const { res, warnings } = await share(url!);

      sendResponse({
        status: "success",
        message: `Shared assignment: ${res.assignment} (${res.problems.length} problems)`,
        warning: warnings.join("\n"),
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
