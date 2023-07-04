import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LocationPermissionComponent } from "./location-permission.component";
import { CanvasMapComponent } from "./canvas-map/canvas-map.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    LocationPermissionComponent,
    CanvasMapComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
