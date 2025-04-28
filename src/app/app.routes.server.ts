import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ngExpressEngine } from '@nguniversal/express-engine'; // Correct SSR import

@NgModule({
  imports: [
    ServerModule,
    // other imports
  ],
  providers: [],
})
export class AppServerModule {}
