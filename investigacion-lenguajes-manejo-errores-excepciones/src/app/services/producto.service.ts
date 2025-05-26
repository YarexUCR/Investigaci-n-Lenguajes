import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = environment.apiUrl + '/productos';

  constructor(private http: HttpClient) {}

  crearProducto(producto: any) {
    return this.http.post(this.baseUrl, producto).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
