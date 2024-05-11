import { JSDOM } from 'jsdom';

function normalizeURL(url) {
  const parsedUrl = new URL(url);
  const normalizedUrl = `${parsedUrl.hostname}/${parsedUrl.pathname.split("/").filter(el => el).join("/")}`;
  return normalizedUrl;
}

function getUrlsFromHtml(htmlDoc, baseURL) {
  const dom = new JSDOM(htmlDoc);
  const links = dom.window.document.querySelectorAll('a');
  const hrefLinks = [...links].map((link) => link.href);

  for (let i = 0; i < hrefLinks.length; i++) {
    if (hrefLinks[i].startsWith("/")) {
      hrefLinks[i] = `${baseURL.endsWith("/") ? baseURL : `${baseURL}/`}${hrefLinks[i].split("/").filter((el) => el).join("/")}`;
    } else if (hrefLinks[i] == "") {
      hrefLinks[i] = baseURL;
    }
  }

  return hrefLinks;
}

async function getHtmlTextFromUrl(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });

    if (response.status >= 400) {
      console.log(`Couldn't crawl ${url}`);
      return;
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      console.log("Content-Type must be text/html");
      return;
    }

    const pageText = await response.text();

    return pageText
  } catch (error) {
    console.log(`Couldn't crawl ${url}`);
    return "";
  }
}

async function crawlPage(baseURL, currentURL, pages = {}) {
  if (!currentURL.includes(baseURL)) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);

  if (pages[normalizedCurrentURL]) {
    pages[normalizedCurrentURL]++;
    return pages;
  } else {
    pages[normalizedCurrentURL] = 1;
  }

  const htmlText = await getHtmlTextFromUrl(currentURL);
  const urls = getUrlsFromHtml(htmlText, baseURL);

  for (let i = 0; i < urls.length; i++) {
    const urlIsBaseURL = normalizeURL(urls[i]) == normalizeURL(baseURL);
    const urlIsCurrentURL = normalizeURL(urls[i]) == normalizedCurrentURL;

    if (urlIsBaseURL) {
      pages[normalizeURL(baseURL)]++;
      continue;
    }

    if (urlIsCurrentURL) {
      pages[normalizedCurrentURL]++;
      continue;
    }

    pages = await crawlPage(baseURL, urls[i], pages);
  }

  return pages;
}

export { normalizeURL, getUrlsFromHtml, crawlPage };