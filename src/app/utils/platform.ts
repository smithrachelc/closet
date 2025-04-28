export const isBrowser = typeof window !== 'undefined';
export const isServer = !isBrowser;

// Safely import Node.js modules
export function safeRequire(moduleName: string) {
  if (isServer) {
    try {
      return require(moduleName);
    } catch (e) {
      console.error(`Failed to require ${moduleName}`, e);
      return null;
    }
  }
  return null;
}