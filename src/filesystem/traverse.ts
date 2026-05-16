export function getCodeFiles(tree: Record<string, any>) {
  return Object.keys(tree).filter(path =>
    /\.(js|jsx|ts|tsx)$/.test(path)
  );
}