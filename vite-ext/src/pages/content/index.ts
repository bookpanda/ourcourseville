import { getRecord, saveRecord } from "./api";
import { fillin } from "./scripts/fillin";
import { scrape } from "./scripts/scrape";

async function share(url: string) {
  const warnings: string[] = [];

  const scrapeRecord = scrape(url);

  const record = await saveRecord(scrapeRecord);

  return { record, scrapeRecord, warnings };
}

async function load(recordID: string) {
  const warnings: string[] = [];

  const record = await getRecord(recordID);
  //warnings when cannot load
  await fillin(record);

  return { record, warnings };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  async function runHandler() {
    try {
      console.log({ message });

      if (message.action !== "share" && message.action !== "load") {
        throw new Error(`Unknown action: ${message.action}`);
      }

      if (message.action === "share") {
        const url: string | undefined = message.url;
        if (!url) {
          throw new Error("no url provided");
        }

        const { record, scrapeRecord, warnings } = await share(url!);

        sendResponse({
          status: "success",
          message: `Shared assignment: ${scrapeRecord.assignment} (${record.problems.length} problems)`,
          record: record,
          warning: warnings.join("\n"),
        });
      } else if (message.action === "load") {
        const recordID: string | undefined = message.recordID;
        if (!recordID) {
          throw new Error("no recordID provided");
        }

        const { record, warnings } = await load(recordID!);

        sendResponse({
          status: "success",
          message: `Loaded assignment with record ${record.id} (${record.problems.length} problems)`,
          warning: warnings.join("\n"),
        });

        return;
      }
    } catch (e) {
      console.error(e);
      sendResponse({ status: "error", message: `${e}` });
    }
  }

  runHandler();
  return true;
});

console.log("ourcourseville content script loaded");
