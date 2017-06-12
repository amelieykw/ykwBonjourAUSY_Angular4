import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HotesseComponent } from './hotesse/hotesse.component';
import { HotesseListRdvComponent } from './hotesse/hotesse-list-rdv/hotesse-list-rdv.component';
import { HotesseFormComponent } from './hotesse/hotesse-form/hotesse-form.component';
import {ServerService} from "./services/server.service";

@NgModule({
  declarations: [
    AppComponent,
    HotesseComponent,
    HotesseListRdvComponent,
    HotesseFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
