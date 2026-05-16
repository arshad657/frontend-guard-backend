import { getCodeFiles } from "../filesystem/traverse.ts";
import { ingestRepository } from "../ingestion/ingestRepository.ts";
import { parseFile } from "../parser/parseFile.ts";
import { reportViolations } from "../reports/consoleReporter.ts";
import { rules } from "../rules/index.ts";
import { runRules } from "../runner/runRules.ts";

async function main() {
  const vol = await ingestRepository("arshad657", "Product-Sourcing-Frontend-New", "main");

  const tree = vol.toJSON();

  const files = getCodeFiles(tree);

  for (const file of files) {
    try {
      const code = vol.readFileSync(file, "utf8").toString();

      const ast = parseFile(code);

      const violations = runRules({
        ast,
        filePath: file,
        rules,
      });

      reportViolations(violations);
    } catch (error) {
      console.log(`Failed parsing: ${file}`);
    }
  }
}

main();
