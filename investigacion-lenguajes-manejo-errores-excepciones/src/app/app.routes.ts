import { Routes } from '@angular/router';
import { ProductoInsertComponent } from './productos/producto-insert/producto-insert.component';

export const routes: Routes = [
  { path: '', redirectTo: 'producto/insertar', pathMatch: 'full' },
  { path: 'producto/insertar', component: ProductoInsertComponent }
];