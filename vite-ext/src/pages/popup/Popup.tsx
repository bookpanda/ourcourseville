import { RecordDTO } from "@src/types";
import { useState } from "react";
import { FaFileSignature } from "react-icons/fa6";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Tile } from "./components/Tile";

export default function Popup(): JSX.Element {
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");

  const [recordID, setRecordID] = useState("");
  const [sharedRecord, setSharedRecord] = useState<RecordDTO | null>(null);

  async function share() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab || tab.id === undefined) {
      setError("Tab not found");
      throw new Error("Tab not found");
    }

    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "share",
      url: tab.url,
    });

    console.log({ response });
    const record: RecordDTO = response.record;
    setSharedRecord(record);

    if (response.status === "error") {
      setError(response.message);
      return;
    }

    setSuccess(response.message);
    setWarning(response.warning);
  }

  async function load() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab || tab.id === undefined) {
      setError("Tab not found");
      throw new Error("Tab not found");
    }

    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "share",
      recordID: recordID,
    });

    console.log({ response });

    if (response.status === "error") {
      setError(response.message);
      return;
    }

    setSuccess(response.message);
    setWarning(response.warning);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecordID(e.target.value);
  };

  return (
    <div className="m-4 flex flex-col gap-4 bg-white p-2 lg:mx-8 lg:my-6 lg:p-6">
      <div className="flex items-center gap-2 border-0 pb-0 font-semibold">
        <FaFileSignature
          size={25}
          className="text-secondary-default lg:text-lg"
        />
        <p className="h4 lg:h3 text-high">Assignments</p>
      </div>
      <Tile>
        <div className="grid items-center gap-2 lg:grid-cols-[auto,188px,188px]">
          <p className="text-high">Both buttons only works in Alpha MCV</p>
          <p className="text-high">
            Make sure you are on the assignment page (assignment tab, not detail
            tab)
          </p>
          <hr className="my-1" />
          <Button text="Share solution" onClick={share} />
          {sharedRecord && <p>{sharedRecord.url}</p>}
          <hr className="my-1" />
          <div className="h6 text-medium flex justify-center text-center">
            Load solutions using record ID
          </div>
          <Input
            value={recordID}
            onChange={(e) => handleChange(e)}
            placeholder="input recordID here..."
          />
          <Button text="Load solution" onClick={load} />
        </div>
      </Tile>
      {success && <p className="text-green-500">{success}</p>}
      {warning && <p className="text-yellow-500">{warning}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
