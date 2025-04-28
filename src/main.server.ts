import 'zone.js/dist/zone-node';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Direct requires for Node.js modules
const express = require('express');
const fs = require('fs');
const path = require('path');

export function app() {
  const server = express();
  const browserDist = path.join(process.cwd(), 'dist/closet-cleanup/browser');
  const template = fs.readFileSync(path.join(browserDist, 'index.html'), 'utf8');

  server.get('*.*', express.static(browserDist, { maxAge: '1y' }));

  server.get('*', async (req, res) => {
    try {
      const html = await renderApplication(
        () => bootstrapApplication(AppComponent, appConfig),
        { document: template, url: req.url }
      );
      res.send(html);
    } catch (err) {
      console.error('Error rendering application:', err);
      res.status(500).send('Server error');
    }
  });

  return server;
}

if (require.main === module) {
  const port = process.env['PORT'] ? +process.env['PORT'] : 4000;
  app().listen(port, () =>
    console.log(`SSR server listening on http://localhost:${port}`)
  );
}