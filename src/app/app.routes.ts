import { Routes } from '@angular/router';
import { VistaXeralComponent } from './vista-xeral/vista-xeral.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { LoginComponent } from './login/login.component';
import { AdministracionGuard } from './guards/administracion.guard';
import { UsuarioGuard } from './guards/usuario.guard';
import { AlmacenMaterialesComponent } from './almacen-materiales/almacen-materiales.component';
import { EntradasComponent } from './entradas/entradas.component';
import { SalidasComponent } from './salidas/salidas.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { AlmacenProductosComponent } from './almacen-productos/almacen-productos.component';

// Las diferentes rutas que tenemos en nuestra aplicación protegidas por el UsuarioGuard, menos la pantalla de administracion que estará protegida por el administracionGuard
export const routes: Routes = [
    { path: 'portada', title:'Portada', component: VistaXeralComponent, canActivate: [UsuarioGuard]},
    { path: 'administracion', title: 'Administracion', component: AdministracionComponent, canActivate: [AdministracionGuard] }, // Esta ruta leva un "guard" que controla o acceso á mesma
    { path: 'login', title: 'Login', component: LoginComponent},
    { path: 'almacen/:tipo', title: 'Almacen', component: AlmacenMaterialesComponent, canActivate: [UsuarioGuard]}, /*Le indicamos que esta ruta recibirá un parámetro para mostrar el almacén de productos en lugar de el de materiales si accedemos desde Producción*/
    { path: 'entradas', title: 'Entradas', component: EntradasComponent, canActivate: [UsuarioGuard]},
    { path: 'productos', title: 'Productos', component: AlmacenProductosComponent, canActivate: [UsuarioGuard]},
    { path: 'salidas', title: 'NuevaSalida', component: SalidasComponent, canActivate: [UsuarioGuard]},
    { path: 'produccion', title: 'Produccion', component: ProduccionComponent, canActivate: [UsuarioGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' } // Si no se escribe nada, nos lleva a login
];
