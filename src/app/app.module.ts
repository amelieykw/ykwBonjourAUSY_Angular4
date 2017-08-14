import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MdAutocompleteModule, MdTableModule, MdCheckboxModule, MdDialogModule, MdSnackBarModule, MdButtonModule, MdSortModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HotesseComponent } from './hotesse/hotesse.component';
import { HotesseListRdvComponent, DialogAlterComponent } from './hotesse/hotesse-list-rdv/hotesse-list-rdv.component';
import { HotesseFormComponent } from './hotesse/hotesse-form/hotesse-form.component';
import { LoginComponent } from './login/login.component';
import { ServerService } from './services/server.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth-guard.service';

import 'hammerjs';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'hotesse', canActivate: [AuthGuard], component: HotesseComponent, children:[
    {path: 'create_nouveau_rdv', component: HotesseFormComponent},
    {path: 'liste_des_rdvs', component: HotesseListRdvComponent}
  ]}, 
];

@NgModule({
  declarations: [
    AppComponent,
    HotesseComponent,
    HotesseListRdvComponent,
    HotesseFormComponent,
    DialogAlterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    JsonpModule,
    MdAutocompleteModule,
    MdTableModule,
    CdkTableModule,
    MdCheckboxModule,
    MdDialogModule,
    MdSnackBarModule,
    MdButtonModule,
    MdSortModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  entryComponents: [DialogAlterComponent],
  providers: [ServerService, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
