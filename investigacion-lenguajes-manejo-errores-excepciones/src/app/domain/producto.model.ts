import { Categoria } from './categoria.model';

export interface Producto {
  idProducto?: number; // opcional porque se genera en el backend
  nombre: string;
  precio: number;
  stock: number;
  categoria: Categoria;
}
