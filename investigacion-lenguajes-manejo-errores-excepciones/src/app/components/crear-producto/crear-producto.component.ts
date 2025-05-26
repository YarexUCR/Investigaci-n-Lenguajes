import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [    CommonModule,               // ngIf, ngFor, etc.
    ReactiveFormsModule,        // [formGroup], formControlName
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  categorias = [
    { id: 1, nombre: 'Electrónica' },
    { id: 2, nombre: 'Alimentos' },
    { id: 999, nombre: 'Inválida (para demo)' } // prueba para excepciones
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      categoriaId: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.open('Complete todos los campos correctamente.', 'Cerrar');
      return;
    }

    this.productoService.crearProducto(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Producto creado exitosamente.', 'Cerrar');
        this.form.reset();
      },
      error: (error) => {
        if (error.status === 400) {
          if (Array.isArray(error.error.errors)) {
            const resumen = error.error.errors.join(', ');
            this.snackBar.open(`Errores: ${resumen}`, 'Cerrar', { duration: 5000 });
          } else if (error.error.message?.includes('categoría')) {
            this.snackBar.open('La categoría seleccionada no existe', 'Cerrar');
          } else {
            this.snackBar.open('Error de validación', 'Cerrar');
          }
        } else {
          this.snackBar.open('Error inesperado. Intente más tarde.', 'Cerrar');
        }
      }
    });
  }
}
