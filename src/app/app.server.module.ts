// src/app.server.module.ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component'; // assume you have it here

@NgModule({
  imports: [
    ServerModule,
    AppComponent, // ✅ Standalone components go into imports, NOT bootstrap
  ],
})
export class AppServerModule {}
