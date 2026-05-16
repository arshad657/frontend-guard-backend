export interface RuleViolation {
  file: string;
  line: number;
  column: number;
  message: string;
}

export interface Rule {
  name: string;
  description: string;

  check(params: {
    ast: any;
    filePath: string;
  }): RuleViolation[];
}