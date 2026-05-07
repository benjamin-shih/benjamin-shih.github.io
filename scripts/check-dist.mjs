import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const siteUrl = "https://benjamin-shih.github.io";
const requiredPages = ["index.html", "research/index.html", "background/index.html", "contact/index.html"];
const requiredAssets = [
  "assets/profile-photo.jpg",
  "assets/temporal-learning-capacity-thesis.pdf",
  "assets/temporal-learning-capacity-slides.pdf",
];
const requiredRootFiles = ["favicon.svg", "og.svg", "robots.txt", "sitemap.xml"];

function fail(message) {
  console.error(`check-dist: ${message}`);
  process.exitCode = 1;
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  });
}

function resolveLocalReference(reference, htmlFile) {
  const cleaned = reference.split("#")[0].split("?")[0];
  if (!cleaned || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(cleaned)) return null;

  const absolutePath = cleaned.startsWith("/")
    ? path.join(dist, cleaned.slice(1))
    : path.resolve(path.dirname(htmlFile), cleaned);

  if (existsSync(absolutePath) && statSync(absolutePath).isFile()) return absolutePath;
  if (existsSync(absolutePath) && statSync(absolutePath).isDirectory()) {
    return path.join(absolutePath, "index.html");
  }
  if (!path.extname(absolutePath)) return path.join(absolutePath, "index.html");
  return absolutePath;
}

if (!existsSync(dist)) fail("dist directory is missing; run npm run build first");

for (const page of requiredPages) {
  if (!existsSync(path.join(dist, page))) fail(`required page missing: ${page}`);
}

for (const asset of requiredAssets) {
  if (!existsSync(path.join(dist, asset))) fail(`required asset missing: ${asset}`);
}

for (const file of requiredRootFiles) {
  if (!existsSync(path.join(dist, file))) fail(`required root file missing: ${file}`);
}

if (existsSync(path.join(dist, "robots.txt"))) {
  const robots = readFileSync(path.join(dist, "robots.txt"), "utf8");
  if (!robots.includes(`${siteUrl}/sitemap.xml`)) fail("robots.txt is missing the sitemap URL");
}

if (existsSync(path.join(dist, "sitemap.xml"))) {
  const sitemap = readFileSync(path.join(dist, "sitemap.xml"), "utf8");
  for (const urlPath of ["/", "/research/", "/background/", "/contact/"]) {
    if (!sitemap.includes(`${siteUrl}${urlPath}`)) fail(`sitemap.xml is missing ${urlPath}`);
  }
}

const htmlFiles = existsSync(dist) ? walk(dist).filter((file) => file.endsWith(".html")) : [];
const attrPattern = /\b(?:href|src)=["']([^"']+)["']/g;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(attrPattern)) {
    const target = resolveLocalReference(match[1], file);
    if (target && !existsSync(target)) {
      fail(`${path.relative(dist, file)} references missing local file: ${match[1]}`);
    }
  }
}

if (!process.exitCode) {
  console.log(`check-dist: ${requiredPages.length} pages, ${requiredAssets.length} assets, ${requiredRootFiles.length} root files, and ${htmlFiles.length} html files passed`);
}
