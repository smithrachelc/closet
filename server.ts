// server.ts
import 'zone.js/node';
import * as express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './dist/closet-cleanup/server/main.js';  // ← correct path!!

import { APP_BASE_HREF } from '@angular/common';

export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/closet-cleanup/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));
  server.set('view engine', 'html');
  server.set('views', distFolder);

  // serve static files
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // all regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl }
      ]
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;
  app().listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

declare const __non_webpack_require__: any;
const mainModule = typeof __non_webpack_require__ !== 'undefined'
  ? __non_webpack_require__.main
  : require.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}
