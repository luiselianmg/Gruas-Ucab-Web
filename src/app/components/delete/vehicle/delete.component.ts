import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    MatDialogModule,
    MaterialModule,
  ],
  templateUrl: './delete.component.html',
})
export class AppDeleteComponent{
  constructor(
    public dialogRef: MatDialogRef<AppDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
