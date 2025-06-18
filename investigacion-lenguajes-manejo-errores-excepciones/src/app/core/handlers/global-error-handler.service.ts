// src/app/core/handlers/global-error-handler.service.ts
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any): void {
    console.error('Error global capturado:', error);

    this.snackBar.open('Ocurrió un error inesperado. Por favor, intente nuevamente. De GlobalErrorHandler', 'Cerrar', {
      duration: 5000
    });
  }
}
