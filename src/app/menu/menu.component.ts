import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  // Input que pasamos desde las secciones, para introducirle una clase que marque la seccion en la que estamos en el menu superior
  @Input() selector: string;

  constructor(private direccionador: Router){

  }

  navegarAlmacen() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/almacen']); 
  }

  navegarEntradas() { // Funcionalidad del botón para redireccionar a Entradas
    this.direccionador.navigate(['/entradas']); 
  }

  navegarProduccion() { // Funcionalidad del botón para redireccionar a Producción
    this.direccionador.navigate(['/produccion']); 
  }

  navegarSalidas() { // Funcionalidad del botón para redireccionar a Salidas
    this.direccionador.navigate(['/salidas']); 
  }
}
