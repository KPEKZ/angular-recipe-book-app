import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import {StoreModule} from "@ngrx/store";
import * as fromApp from './store/app.reducer';
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./Auth/store/auth.effects";
import  {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { environment } from 'src/environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import { RecipeEffects } from './recipes/store/recipes.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    
    CoreModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
