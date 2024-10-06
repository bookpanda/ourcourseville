export const load = (recordID: string) => {
  console.log("load", recordID);
  const mainElements = document.querySelectorAll("main");
  const innerMain = mainElements[1];
  const form = innerMain.querySelectorAll("form")[0];
};
