import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { VistaXeralComponent } from './vista-xeral/vista-xeral.component';
import { ContenidoDataService } from './servicios/contenido-data.service';
import { LoginComponent } from './login/login.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieComponent } from './pie/pie.component';
import { LoginService } from './servicios/servizo-login.service';
import { MenuComponent } from './menu/menu.component';

// Importamos el componente de vista xeral y como provider el servicio que nos facilitará los datos del archivo departamentos.json
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, VistaXeralComponent, LoginComponent, CabeceraComponent, PieComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ ContenidoDataService, LoginService]
})
export class AppComponent {
  title = 'Proxecto-VisualStock';
  
}