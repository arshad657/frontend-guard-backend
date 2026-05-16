import * as parser from "@babel/parser";

export function parseFile(code: string) {
  return parser.parse(code, {
    sourceType: "module",

    plugins: [
      "typescript",
      "jsx",
    ],

    errorRecovery: true,
  });
}