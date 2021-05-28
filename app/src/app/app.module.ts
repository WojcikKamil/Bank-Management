import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import RoutingConfig from './app.routing';
import AppComponent from './app.component';
import MaterialModule from './materials.module';
import ComponentsModule from './components/components.module';
import AuthGuard from './auth.guard';
import SessionStorage from './helpers/session-storage';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RoutingConfig,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
  ],
  providers: [
    AuthGuard,
    SessionStorage,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export default class AppModule { }
