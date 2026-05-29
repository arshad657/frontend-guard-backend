import { getCodeFiles } from "../filesystem/traverse.ts";
import { ingestRepository } from "../ingestion/ingestRepository.ts";
import { parseFile } from "../parser/parseFile.ts";
import { rules } from "../rules/index.ts";
import { runRules } from "../runner/runRules.ts";
import type { RuleViolation } from "../rules/types.ts";

export interface AnalyzeResult {
  owner: string;
  repo: string;
  branch: string;
  violations: RuleViolation[];
}

export class AnalyzeModel {
  static async analyzeUrl({
    owner,
    repo,
    branch,
  }: {
    owner: string;
    repo: string;
    branch: string;
  }): Promise<AnalyzeResult> {
    const vol = await ingestRepository(owner, repo, branch);
    const tree = vol.toJSON();
    const files = getCodeFiles(tree);

    let allViolations: RuleViolation[] = [];

    for (const file of files) {
      try {
        const code = vol.readFileSync(file, "utf8")?.toString() || "";
        const ast = parseFile(code);
        const violations = runRules({
          ast,
          filePath: file,
          rules,
        });
        allViolations = allViolations.concat(violations);
      } catch (error) {
        console.log(`Failed parsing: ${file}`);
      }
    }

    return { owner, repo, branch, violations: allViolations };
  }
}
