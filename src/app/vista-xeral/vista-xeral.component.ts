import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ContenidoComponent } from '../contenido/contenido.component';
import { PieComponent } from '../pie/pie.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Importamos los componentes que llama la vista general
@Component({
  selector: 'app-vista-xeral',
  standalone: true,
  imports: [CabeceraComponent, ContenidoComponent, PieComponent],
  templateUrl: './vista-xeral.component.html',
  styleUrl: './vista-xeral.component.css'
})
export class VistaXeralComponent {

  
}
