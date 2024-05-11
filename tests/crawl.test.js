
import { test, expect } from "@jest/globals";
import { normalizeURL } from "../crawl.js";

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