import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css'
})
export class ConfirmationDialog {
  message: string = 'Are you sure?';
  confirmButton: string = 'Yes';
  cancelButton: string = 'No';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialog>) {
      if (data) {
        this.message = data.message || this.message;
        this.confirmButton = data.confirmButton || this.confirmButton;
        this.cancelButton = data.cancelButton || this.cancelButton;
      }
    }
  
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
