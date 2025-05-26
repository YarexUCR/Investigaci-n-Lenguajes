import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private baseUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  crearProducto(producto: any) {
    return this.http.post<void>(this.baseUrl, producto).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
