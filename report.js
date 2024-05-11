function sortPages(pages) {
  const pagesArr = [];

  for (const key in pages) {
    pagesArr.push([key, pages[key]]);
  }

  pagesArr.sort((a, b) => b[1] - a[1]);

  return pagesArr;
}

function printReport(pages) {
  console.log("Report is starting");

  const sortedPagesArr = sortPages(pages);

  for (let page of sortedPagesArr) {
    console.log(`Found ${page[1]} internal link(s) to ${page[0]}`);
  }
}

export { printReport };