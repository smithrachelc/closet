// Platform detection utility
export const isBrowser = typeof window !== 'undefined';
export const isServer = !isBrowser;

// Safe import function for Node.js modules
export function getNodeModule(name: string) {
  return isServer ? require(name) : null;
}

// Generic file reading function that works in both environments
export async function readFile(path: string): Promise<string> {
  if (isServer) {
    const fs = getNodeModule('fs');
    return fs.readFileSync(path, 'utf8');
  } else {
    // In browser, use fetch API for assets
    const response = await fetch(path);
    return await response.text();
  }
}