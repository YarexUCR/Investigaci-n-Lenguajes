import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Producto } from '../domain/producto.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = `${environment.apiBaseUrl}/productos`;

  constructor(private http: HttpClient) {}

  // 📥 Obtener producto por ID
  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // 📤 Insertar producto
  insertar(producto: Producto): Observable<void> {
    return this.http.post<void>(this.baseUrl, producto).pipe(
      catchError(this.handleError)
    );
  }

  // 🛑 Manejo de errores HTTP
  private handleError(error: HttpErrorResponse) {
    let mensaje = 'Error inesperado';

    if (error.error?.message) {
      mensaje = error.error.message;
    } else if (error.status === 0) {
      mensaje = 'No se pudo conectar con el servidor.';
    } else if (error.status === 400) {
      mensaje = 'Error en la solicitud: ' + error.status;
    } else if (error.status === 404) {
      mensaje = 'Recurso no encontrado.';
    }

    return throwError(() => new Error(mensaje));
  }
}
