import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { L10nIntlModule, L10nLoader, L10nTranslationModule } from 'angular-l10n';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {
  initL10n,
  l10nConfig,
  L10nCustomMissingTranslationHandler,
  L10nCustomStorage,
  L10nCustomTranslationLoader
} from './l10n.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    L10nTranslationModule.forRoot(
      l10nConfig,
      {
        translationLoader: L10nCustomTranslationLoader,
        missingTranslationHandler: L10nCustomMissingTranslationHandler,
        storage: L10nCustomStorage
      }
    ),

    L10nIntlModule,

    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initL10n,
      deps: [L10nLoader],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
