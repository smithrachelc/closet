import 'zone.js/node';
import * as express from 'express';
import { join } from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from '../dist/closet-cleanup/server/main';
import { APP_BASE_HREF } from '@angular/common';

export function createServer() {
  const app = express();
  const PORT = process.env.PORT || 4000;
  const BROWSER_DIST = join(process.cwd(), 'dist/closet-cleanup/browser');

  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));
  app.set('view engine', 'html');
  app.set('views', BROWSER_DIST);

  app.get('*.*', express.static(BROWSER_DIST, {
    maxAge: '1y'
  }));

  app.get('*', (req, res) => {
    res.render('index', {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl }
      ]
    });
  });

  return app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  createServer();
}
