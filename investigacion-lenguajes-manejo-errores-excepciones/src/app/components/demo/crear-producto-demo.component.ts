import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from  '../../services/producto.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-producto-demo',
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
  templateUrl: './crear-producto-demo.component.html',
  styleUrls: ['./crear-producto-demo.component.css']
})
export class CrearProductoDemoComponent {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private productoService = inject(ProductoService);

  form: FormGroup;
  categorias = [
    { id: 1, nombre: 'Tecnología' },
    { id: 2, nombre: 'Ropa' },
    { id: 999, nombre: 'Inexistente' } // para probar el error
  ];

  constructor() {
    // SIN validadores → permite envío de datos vacíos
    this.form = this.fb.group({
      nombre: [''],
      precio: [null],
      stock: [null],
      categoriaId: [null]
    });
  }

  onSubmit(): void {
    this.productoService.crearProducto(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Producto creado exitosamente.', 'Cerrar');
        this.form.reset();
      },
      error: (error) => {
        if (error.status === 400 && Array.isArray(error.error.errors)) {
          const errores = error.error.errors.join(', ');
          this.snackBar.open(`Errores: ${errores}`, 'Cerrar');
        } else if (error.status === 400 && error.error.message?.includes('categoría')) {
          this.snackBar.open('La categoría seleccionada no existe', 'Cerrar');
        } else {
          this.snackBar.open('Error inesperado. Ver consola.', 'Cerrar');
          console.error(error);
        }
      }
    });
  }
}
