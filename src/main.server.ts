import 'zone.js/dist/zone-node';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import express, { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

export function app(): express.Application {
  const server = express();
  const browserDist = join(process.cwd(), 'dist/closet-cleanup/browser');
  const template = readFileSync(join(browserDist, 'index.html'), 'utf8');

  // Serve static assets
  server.get('*.*', express.static(browserDist, { maxAge: '1y' }));

  // SSR: render your standalone AppComponent
  server.get('*', async (req: Request, res: Response) => {
    const html = await renderApplication(
      () => bootstrapApplication(AppComponent, appConfig),
      {
        document: template,
        url: req.url
      }
    );
    res.send(html);
  });

  return server;
}

// Local debugging: `ts-node src/main.server.ts`
if (require.main === module) {
  const portEnv = process.env['PORT'];
  const port = portEnv ? parseInt(portEnv, 10) : 4000;
  app().listen(port, () =>
    console.log(`SSR server listening on http://localhost:${port}`)
  );
}
