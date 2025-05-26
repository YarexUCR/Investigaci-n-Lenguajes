import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { environment } from '../../../environments/environment';
import { Categoria } from '../../domain/categoria.model';
import { Producto } from '../../domain/producto.model';

@Component({
  selector: 'app-producto-insert',
  standalone: true,
  templateUrl: './producto-insert.component.html',
  styleUrl: './producto-insert.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule
  ]
})
export class ProductoInsertComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private productoService = inject(ProductoService);
  private http = inject(HttpClient);

  form: FormGroup = this.fb.group({
    nombre: [''],
    precio: [null],
    stock: [null],
    idCategoria: [null]
  });

  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.http.get<Categoria[]>(`${environment.apiBaseUrl}/categorias`).subscribe({
      next: (cats) => this.categorias = cats,
      error: () => this.snackBar.open('Error al cargar categorías.', 'Cerrar', { duration: 3000 })
    });
  }

  insertar(): void {
    const producto: Producto = {
      nombre: this.form.value.nombre,
      precio: this.form.value.precio,
      stock: this.form.value.stock,
      categoria: {
        idCategoria: this.form.value.idCategoria,
        nombre: ''
      }
    };

    this.productoService.insertar(producto).subscribe({
      next: () => {
        this.snackBar.open('Producto insertado correctamente.', 'Cerrar', { duration: 3000 });
        this.form.reset();
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Cerrar', { duration: 4000 });
      }
    });
  }
}
