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
import { NuevaEntradaComponent } from './nueva-entrada/nueva-entrada.component';
import { NuevaSalidaComponent } from './nueva-salida/nueva-salida.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AemetComponent } from './aemet/aemet.component';
import { EmpresasComponent } from './empresas/empresas.component';

// Las diferentes rutas que tenemos en nuestra aplicación protegidas por el UsuarioGuard, menos la pantalla de administracion que estará protegida por el administracionGuard
export const routes: Routes = [
    { path: 'portada', title:'Portada', component: VistaXeralComponent, canActivate: [UsuarioGuard]},
    { path: 'perfil', title:'Perfil', component: PerfilComponent, canActivate: [UsuarioGuard]},
    { path: 'aemet', title:'AEMET', component: AemetComponent, canActivate: [UsuarioGuard]},
    { path: 'administracion', title: 'Administracion', component: AdministracionComponent, canActivate: [AdministracionGuard] }, // Esta ruta leva un "guard" que controla o acceso á mesma
    { path: 'empresas', title: 'Empresas', component: EmpresasComponent, canActivate: [AdministracionGuard] },
    { path: 'login', title: 'Login', component: LoginComponent},
    { path: 'almacen', title: 'Almacen', component: AlmacenMaterialesComponent, canActivate: [UsuarioGuard]},
    { path: 'entradas', title: 'Entradas', component: EntradasComponent, canActivate: [UsuarioGuard]},
    { path: 'nueva-entrada', title: 'NuevaEntrada', component: NuevaEntradaComponent, canActivate: [UsuarioGuard]},
    { path: 'nueva-salida', title: 'NuevaSalida', component: NuevaSalidaComponent, canActivate: [UsuarioGuard]},
    { path: 'productos', title: 'Productos', component: AlmacenProductosComponent, canActivate: [UsuarioGuard]},
    { path: 'salidas', title: 'NuevaSalida', component: SalidasComponent, canActivate: [UsuarioGuard]},
    { path: 'produccion', title: 'produccion', component: ProduccionComponent, canActivate: [UsuarioGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' } // Si no se escribe nada, nos lleva a login
];
