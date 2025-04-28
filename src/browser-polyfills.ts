// Browser polyfills for Node.js modules

// Polyfill globals
(window as any).global = window;
(window as any).process = {
  env: { NODE_ENV: 'production' },
  browser: true,
  nextTick: (fn: Function) => setTimeout(fn, 0)
};

// Other polyfills
(window as any).Buffer = {
  isBuffer: () => false
};

// Path polyfill
(window as any).path = {
  join: (...parts: string[]) => parts.join('/'),
  resolve: (...parts: string[]) => parts.join('/'),
  dirname: (p: string) => p.substring(0, p.lastIndexOf('/'))
};

// FS polyfill (minimal)
(window as any).fs = {
  readFileSync: () => { throw new Error('fs.readFileSync is not available in the browser'); }
};