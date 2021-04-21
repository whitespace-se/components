import glob from "fast-glob";
import { build } from "esbuild";
import rimraf from "rimraf";
import { promisify } from "util";

const rimrafAsync = promisify(rimraf);

const entry = ["src/**/*.{js,css}"];
const outdir = "dist";

async function run() {
  await rimrafAsync(outdir);
  const entryPoints = await glob(entry);
  await build({
    entryPoints,
    outdir,
    bundle: false,
    loader: { ".js": "jsx" },
    watch: {
      onRebuild(error, result) {
        void result;
        if (error) console.error("watch build failed:", error);
        else console.log("watch build succeeded");
      },
    },
  });
}

run().catch(() => process.exit(1));
