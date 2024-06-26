import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  const numberOfParams = process.argv.length - 2;
  let url;

  if (numberOfParams != 1) {
    console.log("Invalid number of params");
    return;
  } else {
    url = process.argv[2];
    console.log(`crawler starting at ${url}`);
  }

  const pages = await crawlPage(url, url);
  printReport(pages);
}

main();