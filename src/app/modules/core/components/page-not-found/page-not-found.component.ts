import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
