import type { Rule, RuleViolation } from "../rules/types";

interface Params {
  ast: any;
  filePath: string;
  rules: Rule[];
}

export function runRules({
  ast,
  filePath,
  rules,
}: Params): RuleViolation[] {
  const violations: RuleViolation[] = [];

  for (const rule of rules) {
    const result = rule.check({
      ast,
      filePath,
    });

    violations.push(...result);
  }

  return violations;
}