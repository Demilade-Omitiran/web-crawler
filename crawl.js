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

export { normalizeURL, getUrlsFromHtml };