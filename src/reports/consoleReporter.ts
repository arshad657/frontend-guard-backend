import type { RuleViolation } from "../rules/types";

export function reportViolations(
  violations: RuleViolation[]
) {
  for (const violation of violations) {
    console.log("");

    console.log(
      `${violation.file}:${violation.line}:${violation.column}`
    );

    console.log(`→ ${violation.message}`);
  }
}