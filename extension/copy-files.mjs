import { copyFile } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const targetFolder = args[0] === "manifest.json" ? "build" : "build-prod";
const htmlFiles = ["popup.html"];

htmlFiles.forEach((file) => {
  const srcPath = join(__dirname, "src", file);
  const destPath = join(__dirname, targetFolder, file);

  copyFile(srcPath, destPath, (err) => {
    if (err) {
      console.error(`Error copying file ${file}:`, err);
    } else {
      console.log(`Copied ${file} to build folder.`);
    }
  });
});

const srcPath = join(__dirname, args[0]);
const destPath = join(__dirname, targetFolder, "manifest.json");
copyFile(srcPath, destPath, (err) => {
  if (err) {
    console.error(`Error copying manifest.json:`, err);
  } else {
    console.log(`Copied manifest.json to build folder.`);
  }
});
