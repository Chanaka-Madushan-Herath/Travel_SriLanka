import fs from "node:fs";

const input = process.argv[2];
if (!input) {
  console.error("Usage: npm run apply-content -- path/to/ceylon-trails-backup.json");
  process.exit(1);
}

const json = JSON.parse(fs.readFileSync(input, "utf8"));
for (const key of ["settings", "destinations", "trips", "reviews"]) {
  if (!(key in json)) {
    console.error(`Missing ${key} in ${input}`);
    process.exit(1);
  }
}

const file = `import type { Database } from "@/lib/types";\n\nexport const content = ${JSON.stringify(json, null, 2)} satisfies Database;\n`;
fs.writeFileSync(new URL("../src/data/content.ts", import.meta.url), file);
console.log("Updated src/data/content.ts");
