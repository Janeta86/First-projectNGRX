import {ApplicationConfig, importProvidersFrom, InjectionToken, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {UsersEffect} from "./store/users.effect";
import {reducer} from "./store/users.reducer";
import {USERS_FEATURE_KEY} from "./store/users.reducer";

// export const LOCAL_STORAGE_USERS_KEY = new InjectionToken<string>('LOCAL_STORAGE_USERS_KEY');
let UserEffect;
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideEffects(UsersEffect),
    provideStore({
      [USERS_FEATURE_KEY]: reducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(),
    {
      provide:  USERS_FEATURE_KEY,
      useValue: 'users'
    }
  ],
}
