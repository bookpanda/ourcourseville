import { copyFile } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlFiles = ["popup.html"];

htmlFiles.forEach((file) => {
  const srcPath = join(__dirname, "src", file);
  const destPath = join(__dirname, "build", file);

  copyFile(srcPath, destPath, (err) => {
    if (err) {
      console.error(`Error copying file ${file}:`, err);
    } else {
      console.log(`Copied ${file} to build folder.`);
    }
  });
});
