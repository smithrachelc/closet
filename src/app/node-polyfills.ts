// Browser polyfills for Node.js modules
if (typeof window !== 'undefined') {
    // We're in a browser environment
    (window as any).global = window;
    (window as any).process = {
      env: { NODE_ENV: 'production' },
      browser: true,
      nextTick: (fn: Function) => setTimeout(fn, 0)
    };
    
    // Provide minimal implementations of common Node.js modules
    (window as any).path = {
      join: (...parts: string[]) => parts.join('/'),
      resolve: (...parts: string[]) => parts.join('/'),
      dirname: (p: string) => p.substring(0, p.lastIndexOf('/'))
    };
    
    // Mock other Node.js modules as needed
    (window as any).fs = {};
    (window as any).crypto = {};
  }