
import { test, expect } from "@jest/globals";
import { normalizeURL, getUrlsFromHtml } from "../crawl.js";

test("normalizes the http url with slash ending", () => {
  const url = "http://blog.boot.dev/path/";
  expect(normalizeURL(url)).toBe("blog.boot.dev/path");
});

test("normalizes the http url without slash ending", () => {
  const url = "http://blog.boot.dev/path";
  expect(normalizeURL(url)).toBe("blog.boot.dev/path");
});

test("normalizes the https url with slash ending", () => {
  const url = "https://blog.boot.dev/path/";
  expect(normalizeURL(url)).toBe("blog.boot.dev/path");
});

test("normalizes the https url without slash ending", () => {
  const url = "https://blog.boot.dev/path";
  expect(normalizeURL(url)).toBe("blog.boot.dev/path");
});

test("throws an error for an invalid url", () => {
  const url = "abeehdgftkkas";
  expect(() => {
    normalizeURL(url);
  }).toThrow();
});

test("fetches all the links in an html doc", () => {
  const htmlDoc = `
    <html>
      <body>
          <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
          <a href="https://blog.boot.dev/second"><span>Go to Boot.dev</span></a>
          <a href=""><span>Go to Boot.dev</span></a>
          <a href="/other-path"><span>Go to Boot.dev</span></a>
      </body>
    </html>
  `;
  expect(getUrlsFromHtml(htmlDoc, "http://google.com/")).toStrictEqual(["https://blog.boot.dev/", "https://blog.boot.dev/second", "http://google.com/", "http://google.com/other-path"]);
  expect(getUrlsFromHtml(htmlDoc, "http://google.com")).toStrictEqual(["https://blog.boot.dev/", "https://blog.boot.dev/second", "http://google.com", "http://google.com/other-path"]);
});

test("fetches an empty array in the html doc that has no links", () => {
  const htmlDoc = `
    <html>
      <body>
          <p><span>Go to Boot.dev</span></p>
          <p><span>Go to Boot.dev</span></p>
      </body>
    </html>
  `;
  expect(getUrlsFromHtml(htmlDoc)).toStrictEqual([]);
});

test("fetches an empty array in the html doc that has only text", () => {
  const htmlDoc = `
    This is just text.
    Nothing else.
  `;
  expect(getUrlsFromHtml(htmlDoc)).toStrictEqual([]);
});