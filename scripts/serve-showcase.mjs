import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number.parseInt(process.env.SIMPLE_BUSINESS_SHOWCASE_PORT ?? "4173", 10);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

createServer((request, response) => {
  const requestPath = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
  if (requestPath === "/") {
    response.writeHead(302, { Location: "/showcase/" });
    response.end();
    return;
  }
  const relativePath =
    requestPath === "/showcase/" ? "showcase/index.html" : requestPath.slice(1);
  const candidate = path.resolve(root, relativePath);
  if (!candidate.startsWith(`${root}${path.sep}`) || !existsSync(candidate) || !statSync(candidate).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found\n");
    return;
  }
  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": mimeTypes[path.extname(candidate)] ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff"
  });
  createReadStream(candidate).pipe(response);
}).listen(port, "127.0.0.1", () => {
  process.stdout.write(`Simple Business showcase: http://127.0.0.1:${port}\n`);
});
