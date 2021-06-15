import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-consultation-result',
  templateUrl: './submit-consultation-result.component.html',
  styleUrls: ['./submit-consultation-result.component.scss']
})
export class SubmitConsultationResultComponent {

  constructor(
    public dialogRef: MatDialogRef<SubmitConsultationResultComponent>
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
