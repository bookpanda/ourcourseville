import type { Browser, Page } from "playwright";
import { chromium } from "playwright";

(async () => {
  let browser: Browser | null = null;
  try {
    // Launch browser
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // Navigate to the website
    await page.goto("https://alpha.mycourseville.com");

    // Inject refresh token into localStorage
    const refreshToken = process.env.REFRESH_TOKEN ?? ""; // Replace with your actual refresh token
    console.log("Refresh Token:", refreshToken);

    await page.evaluate((token) => {
      localStorage.setItem("refresh_token", token);
    }, refreshToken);

    // Reload or go to the course page to ensure you're authenticated
    await page.goto("https://alpha.mycourseville.com/course/0000-KMh/");

    // Scrape the data from the course page
    const scrapedData = await page.evaluate(() => {
      // Adjust this according to the structure of the page you want to scrape
      const courseTitle = document.querySelector("h1")?.textContent;
      const courseDetails =
        document.querySelector(".course-details")?.textContent;

      return {
        title: courseTitle,
        details: courseDetails,
      };
    });

    console.log("Scraped Data:", scrapedData);
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
