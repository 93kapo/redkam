import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the REDKAM portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /REDKAM/);
  assert.match(html, /Aftermovie/);
  assert.match(html, /Documental/);
  assert.doesNotMatch(html, /Entramos donde las c[aá]maras no/i);
  assert.doesNotMatch(html, /No vendemos conceptos/i);
});

test("includes the revised project labels and optimized media", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /title: "AFTERMOVIE"/);
  assert.match(page, /title: "LIVE SESSION"/);
  assert.match(page, /title: "BRAND EXPERIENCE"/);
  assert.match(page, /title: "FASHION"/);
  assert.match(page, /title: "MODELING"/);
  assert.match(page, /title: "YANDEL"/);
  assert.doesNotMatch(page, /CAMPAIGN 01|CAMPAIGN 04|YANDEL \+ KAPO/);
  assert.doesNotMatch(layout, /Entramos donde las c[aá]maras no/i);
  assert.match(packageJson, /"name": "redkam-cinema-portfolio"/);

  const media = [
    "../public/assets/new/aftermovie-live.mp4",
    "../public/assets/new/live-session.webm",
    "../public/assets/new/brand-experience.webm",
    "../public/assets/new/aftermovie-live.png",
    "../public/assets/new/live-session.png",
    "../public/assets/new/brand-experience.png",
    "../public/og.png",
  ];

  for (const relativePath of media) {
    const url = new URL(relativePath, import.meta.url);
    await access(url);
    assert.ok((await stat(url)).size > 0, `${relativePath} should not be empty`);
  }
});
