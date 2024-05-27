import { Component, OnInit } from '@angular/core';
import { MaterialesService } from '../servicios/materiales.service';
import { CommonModule } from '@angular/common';
import { Material } from '../modelos/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-almacen-materiales',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './almacen-materiales.component.html',
  styleUrl: './almacen-materiales.component.css'
})
export class AlmacenMaterialesComponent implements OnInit{
  //Creamos el listado de materiales como un array de materiales
  listaxeMateriales: Material[];

  constructor(private servizoMateriales: MaterialesService, private direccionador: Router, private ruta: ActivatedRoute) { //Activated route lo necesitamos para recuperar el parametro que le pasaremos cuando accedamos desde producción

  }

  ngOnInit(): void {
    this.servizoMateriales.getMateriales$().subscribe((materiales) => {
      this.listaxeMateriales = materiales;
    })
    this.ruta.params.subscribe(params => {
      if(params['tipo'] && params['tipo']=="productos"){ // si recibe parametro y es igual a producto
        this.direccionador.navigate(['/productos']); 
      } // Aquí obtenemos el valor del parámetro 'tipo' de la URL
    });
  }

  navegarProductos() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/productos']); 
  }

  navegarPortada() { // Funcionalidad del botón para redireccionar a Portada
    this.direccionador.navigate(['/portada']); 
  }

}
