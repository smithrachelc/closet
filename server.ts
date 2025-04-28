import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import 'zone.js/node';

// this file is the output of your server build
const { renderApplication, AppComponent, APP_BASE_HREF } =
  require('./dist/closet-cleanup/server/main.server.js');

const app = express();
const BROWSER_DIST = join(process.cwd(), 'dist/closet-cleanup/browser');
const template = readFileSync(join(BROWSER_DIST, 'index.html'), 'utf8');

app.get('*.*', express.static(BROWSER_DIST, { maxAge: '1y' }));

app.get('*', (req, res) => {
  renderApplication(AppComponent, {
    document: template,
    url: req.url,
    providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl }
    ]
  })
  .then(html => res.send(html))
  .catch(err => res.status(500).send(err));
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`✔️  SSR ready on http://localhost:${port}`)
);
