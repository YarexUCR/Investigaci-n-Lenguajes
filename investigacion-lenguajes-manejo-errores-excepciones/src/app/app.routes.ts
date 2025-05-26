import { Routes } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CrearProductoDemoComponent } from './components/demo/crear-producto-demo.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/crearproducto',
        pathMatch: 'full'
      },
    { path: 'crearproducto', component: CrearProductoComponent },
    {path: 'demo', component: CrearProductoDemoComponent} // Para pruebas de manejo de errores
];
