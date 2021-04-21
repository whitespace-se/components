import { build } from "esbuild";
import { promisify } from "util";
import { readFile } from "fs";
import glob from "fast-glob";
import { resolve } from "path";
import rimraf from "rimraf";

const rimrafAsync = promisify(rimraf);
const readFileAsync = promisify(readFile);

async function run() {
  let packageJSON = await readFileAsync(resolve("./package.json"));
  const { main: outdir, source } = JSON.parse(packageJSON);
  const entry = `${source}/**/*.{js,css}`;
  console.log(`Transpiling from ${source} to ${outdir}`);
  await rimrafAsync(outdir);
  const entryPoints = await glob(entry);
  await build({
    entryPoints,
    outdir,
    bundle: false,
    loader: { ".js": "jsx" },
  });
}

run().catch(() => process.exit(1));
