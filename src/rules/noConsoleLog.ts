// To this
import _traverse from "@babel/traverse";
const traverse = (_traverse as any).default || _traverse;
import type { Rule, RuleViolation } from "./types";

export const noConsoleLogRule: Rule = {
  name: "no-console-log",

  description: "Disallow console.log",

  check({ ast, filePath }) {
    const violations: RuleViolation[] = [];

    traverse(ast, {
      CallExpression(path: any) {
        const callee = path.node.callee;

        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "console" &&
          callee.property.type === "Identifier" &&
          callee.property.name === "log"
        ) {
          violations.push({
            file: filePath,
            line: path.node.loc?.start.line || 0,
            column: path.node.loc?.start.column || 0,
            message: "Avoid using console.log",
          });
        }
      },
    });

    return violations;
  },
};
