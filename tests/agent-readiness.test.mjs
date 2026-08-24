import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { test } from "node:test";

const port = 8789;
const origin = `http://127.0.0.1:${port}`;

function waitForServer(process) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timeout = setTimeout(() => {
      reject(new Error(`Timed out waiting for wrangler dev. Output:\n${output}`));
    }, 30000);

    const onData = (chunk) => {
      output += chunk.toString();
      if (output.includes(`http://127.0.0.1:${port}`) || output.includes("Ready on")) {
        clearTimeout(timeout);
        resolve();
      }
    };

    process.stdout.on("data", onData);
    process.stderr.on("data", onData);
    process.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`wrangler dev exited before ready with code ${code}. Output:\n${output}`));
    });
  });
}

async function withWorker(fn) {
  const child = spawn("npx", ["wrangler", "dev", "--local", "--port", String(port)], {
    cwd: process.cwd(),
    shell: process.platform === "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    await waitForServer(child);
    await fn();
  } finally {
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      child.kill("SIGTERM");
    }
  }
}

test("agent-readable endpoints and unknown routes behave correctly", async () => {
  await withWorker(async () => {
    const missing = await fetch(`${origin}/definitely-not-a-real-agent-path`, {
      headers: { Accept: "text/markdown" },
    });
    assert.equal(missing.status, 404);
    assert.match(await missing.text(), /sitemap\.xml/);

    const markdown = await fetch(`${origin}/`, {
      headers: { Accept: "text/markdown" },
    });
    assert.equal(markdown.status, 200);
    assert.match(markdown.headers.get("content-type") ?? "", /text\/markdown/);
    assert.match(markdown.headers.get("vary") ?? "", /Accept/);
    assert.match(await markdown.text(), /^# Monfily Digital/m);

    const html = await fetch(`${origin}/`, {
      headers: { Accept: "text/html" },
    });
    const htmlBody = await html.text();
    assert.equal(html.status, 200);
    assert.match(html.headers.get("content-type") ?? "", /text\/html/);
    assert.match(htmlBody, /<div id="root">\s*<main>\s*<h1>Marketing para Home Services nos EUA \| Monfily<\/h1>/);
    assert.match(htmlBody, /application\/ld\+json/);
    assert.ok(htmlBody.length > 500);

    const llms = await fetch(`${origin}/llms.txt`);
    const llmsBody = await llms.text();
    assert.match(llmsBody, /\[Sitemap\]\(https:\/\/monfily\.com\/sitemap\.xml\)/);

    for (const path of ["/llms.txt", "/sitemap.xml", "/robots.txt", "/about", "/contact", "/privacy"]) {
      const response = await fetch(`${origin}${path}`);
      assert.equal(response.status, 200, `${path} should return 200`);
      await response.text();
    }

    for (const path of ["/about", "/contact", "/privacy"]) {
      const response = await fetch(`${origin}${path}`);
      assert.ok((await response.text()).length > 500, `${path} should be substantive`);
    }
  });
});
