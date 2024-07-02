import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { VistaXeralComponent } from './vista-xeral/vista-xeral.component';
import { ContenidoDataService } from './servicios/contenido-data.service';
import { LoginComponent } from './login/login.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieComponent } from './pie/pie.component';
import { LoginService } from './servicios/servizo-login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EntradasService } from './servicios/entradas.service';
import { MaterialesService } from './servicios/materiales.service';
import { ProductosService } from './servicios/productos.service';
import { SalidasService } from './servicios/salidas.service';
import { FormsModule } from '@angular/forms';  
import { EmpresasService } from './servicios/empresas.service';
import { UsuariosService } from './servicios/usuarios.service';


// Importamos el componente de vista xeral y como provider el servicio que nos facilitará los datos del archivo departamentos.json
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, VistaXeralComponent, LoginComponent, CabeceraComponent, PieComponent, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ ContenidoDataService, LoginService, EntradasService, MaterialesService, ProductosService, SalidasService, EmpresasService, UsuariosService]
})
export class AppComponent {
  title = 'Proxecto-VisualStock';
  
}