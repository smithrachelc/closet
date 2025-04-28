/******************************************************************
 * src/server.ts — your Vercel “function” entry
 ******************************************************************/
import 'zone.js/node';
import express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { APP_BASE_HREF } from '@angular/common';

// ←— now points at dist/server/main.server.js
import { AppServerModule } from '../dist/server/main.server.js';

const app = express();

// your browser build output
const BROWSER_DIST = join(process.cwd(), 'dist/browser');
const INDEX_HTML   = existsSync(join(BROWSER_DIST, 'index.original.html'))
  ? 'index.original.html'
  : 'index';

app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
app.set('view engine', 'html');
app.set('views', BROWSER_DIST);

// serve static assets from the browser build
app.get('*.*', express.static(BROWSER_DIST, {
  maxAge: '1y'
}));

// all other routes render the Universal app
app.get('*', (req, res) => {
  res.render(INDEX_HTML, {
    req,
    providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl }
    ]
  });
});

// for @vercel/node
export default app;
