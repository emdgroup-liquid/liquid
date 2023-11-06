/* eslint-disable @typescript-eslint/no-var-requires */
const { readFile, writeFile } = require("fs").promises;
const outputTarget = process.argv[2];

(async () => {
  const data =
    outputTarget === "angular"
      ? await readFile("./out/angular/angular-components.ts", "utf8")
      : await readFile(`./out/${outputTarget}.ts`, "utf8");

  let defineIncluded = data
    .replace(
      "import type { JSX } from '../dist/components'",
      "import type { JSX } from '../dist/types/components'",
    )
    .replace(
      "import { defineCustomElements } from '../dist/components/dist/loader/index.js';",
      "import { defineCustomElements } from '../dist/loader/index.es2017.js';",
    );

  if (outputTarget === "angular") {
    defineIncluded = defineIncluded.replaceAll(
      / from ['|"]\.\.\/dist\/components['|"]/g,
      " from '../../dist/types/components'",
    );
  }

  const defineExcluded = data
    .replace(
      "import type { JSX } from '../dist/components'",
      "import type { JSX } from '../dist/types/components'",
    )
    .split("\n")
    .filter((line) => !line.includes("defineCustomElements"))
    .join("\n");

  if (outputTarget === "angular") {
    await writeFile(
      "./out/angular/angular-components.ts",
      defineIncluded,
      "utf8",
    );
  } else {
    await Promise.all([
      writeFile(`./out/${outputTarget}.ts`, defineIncluded, "utf8"),
      writeFile(
        `./out/${outputTarget}-define-excluded.ts`,
        defineExcluded,
        "utf8",
      ),
    ]);
  }
})();
