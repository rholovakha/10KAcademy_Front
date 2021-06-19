import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';

@Component({
  selector: 'app-submit-consultation-result',
  templateUrl: './submit-consultation-result.component.html',
  styleUrls: ['./submit-consultation-result.component.scss']
})
export class SubmitConsultationResultComponent {

  constructor(
    public dialogRef: MatDialogRef<SubmitConsultationResultComponent>,
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
