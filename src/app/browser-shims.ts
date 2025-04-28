// Provide browser-compatible versions of Node.js globals

// Mimic Node's global object
(window as any).global = window;

// Mimic Node's process object
(window as any).process = {
  env: { NODE_ENV: 'production' },
  browser: true,
  nextTick: (fn: Function) => setTimeout(fn, 0)
};

// Mock Buffer for browser
(window as any).Buffer = {
  isBuffer: () => false,
  from: (data: any) => ({ data }),
  alloc: (size: number) => ({ size })
};

// Mock specific modules your app might use
(window as any).__dirname = '/';
(window as any).__filename = '/index.html';