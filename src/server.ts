// src/server.ts

import 'zone.js/node';
import express, { Request, Response } from 'express';
import { join } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './app/app.server.module';
import { existsSync } from 'fs';
import multer from 'multer';

// Create express server
const app = express();
const upload = multer();

const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// Set the view engine (manual wrapper for older Angular Universal)
app.engine('html', (_, options, callback) => {
  const engine = ngExpressEngine({
    bootstrap: AppServerModule,
  });
  return engine(_, options as any, callback);
});

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Serve static files
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// Universal route handler (SSR)
app.get('*', (req: Request, res: Response) => {
  res.render('index', { req });
});

// Start the server
const PORT = process.env['PORT'] || 4000;
app.listen(PORT, () => {
  console.log(`Node Express server listening at http://localhost:${PORT}`);
});
