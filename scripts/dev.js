import { build } from "esbuild";
import { watch } from "chokidar";
import { promisify } from "util";
import { readFileSync } from "fs";
import glob from "fast-glob";
import { resolve } from "path";
import rimraf from "rimraf";

const rimrafAsync = promisify(rimraf);

let packageJSON = readFileSync(resolve("./package.json"));
const { main: outdir, source, esbuild = {} } = JSON.parse(packageJSON);
const entry = `${source}/**/*.{js,css}`;

/**
 * Builds the code in no time
 */
const run = async () => {
  //Start build service
  try {
    await rimrafAsync(outdir);
    const entryPoints = await glob(entry);

    // // Get time before build starts
    const timerStart = Date.now();

    // Build code
    await build({
      entryPoints,
      outdir,
      bundle: false,
      loader: { ".js": "jsx" },
      ...esbuild,
    });

    // Get time after build ends
    const timerEnd = Date.now();
    console.log(`Built in ${timerEnd - timerStart}ms.`);
  } catch (e) {
    // OOPS! ERROR!
  }
};

const watcher = watch([entry]);
run();
console.log(`Watching ${entry}...`);
watcher.on("all", () => {
  run();
});
