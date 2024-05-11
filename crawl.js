function normalizeURL(url) {
  const parsedUrl = new URL(url);
  const normalizedUrl = `${parsedUrl.hostname}/${parsedUrl.pathname.split("/").filter(el => el).join("/")}`;
  return normalizedUrl;
}

export { normalizeURL };