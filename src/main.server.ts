// src/main.server.ts
/*****************************************************************
 * Angular Universal SSR for a standalone AppComponent
 *****************************************************************/

import 'zone.js/dist/zone-node'; // 1️⃣ Zone.js server polyfills

import express from 'express'; // 2️⃣ Express
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

import {
  renderApplication,
  provideServerRendering
} from '@angular/platform-server'; // 3️⃣ SSR API

import { bootstrapApplication } from '@angular/platform-browser'; // 4️⃣ Bootstrap fn

import { AppComponent } from './app/app.component'; // 5️⃣ Your standalone root

import { APP_BASE_HREF } from '@angular/common'; // 6️⃣ Base‐href provider

export function app() {
  const server = express();
  const distFolder = join(
    process.cwd(),
    'dist/closet-cleanup/browser'
  );
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index.html';

  // Serve static assets
  server.get(
    '*.*',
    express.static(distFolder, { maxAge: '1y' })
  );

  // All other routes: SSR via renderApplication()
  server.get('*', async (req, res) => {
    try {
      const template = readFileSync(
        join(distFolder, indexHtml),
        'utf8'
      );

      const html = await renderApplication(
        () =>
          bootstrapApplication(AppComponent, {
            providers: [
              provideServerRendering(),
              { provide: APP_BASE_HREF, useValue: req.baseUrl },
            ],
          }),
        {
          document: template,
          url: req.url,
        }
      );

      res.status(200).send(html);
    } catch (err: any) {
      console.error('❌ SSR error:', err);
      res.status(500).send(err.message || 'Server Error');
    }
  });

  return server;
}
