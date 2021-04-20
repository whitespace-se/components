import glob from "fast-glob";
import { build } from "esbuild";

const entry = ["pkg/src/**/*.{js,css}"];
const outdir = "pkg";

glob(entry)
  .then((entryPoints) => {
    return build({
      entryPoints,
      outdir,
      bundle: false,
      loader: { ".js": "jsx" },
    });
  })
  .catch(() => process.exit(1));
