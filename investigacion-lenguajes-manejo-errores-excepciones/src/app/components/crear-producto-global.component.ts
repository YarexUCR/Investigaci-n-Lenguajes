import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-producto-global',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './crear-producto-global.component.html',
  styleUrls: ['./crear-producto-global.component.css']
})
export class CrearProductoGlobalComponent {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);

  form: FormGroup;
  categorias = [
    { id: 1, nombre: 'Tecnología' },
    { id: 2, nombre: 'Ropa' },
    { id: 999, nombre: 'Inexistente' } // para forzar un error 400 o 500
  ];

  constructor() {
    this.form = this.fb.group({
      nombre: [''],
      precio: [null],
      stock: [null],
      categoriaId: [null]
    });
  }

  onSubmit(): void {
    // ❌ No hay manejo de errores local, se propaga al GlobalErrorHandler
    this.productoService.crearProducto(this.form.value).subscribe({
      next: () => {
        console.log('Producto creado con éxito.');
        this.form.reset();
      }
      // error: NO DEFINIDO → será capturado por GlobalErrorHandler
    });
  }
}
