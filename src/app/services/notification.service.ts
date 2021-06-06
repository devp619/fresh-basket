import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  info(text: string) {
    this.snackBar.open(text, 'Dismiss', { duration: 3000 });
  }
}
