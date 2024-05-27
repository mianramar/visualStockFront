import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto';
import { Router } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-almacen-productos',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './almacen-productos.component.html',
  styleUrl: './almacen-productos.component.css'
})
export class AlmacenProductosComponent implements OnInit{
  //Creamos el listado de materiales como un array de materiales
  listaxeProductos: Producto[];

  constructor(private servizoProductos: ProductosService, private direccionador: Router) {

  }

  ngOnInit(): void {
    this.servizoProductos.getProductos$().subscribe((productos) => {
      this.listaxeProductos = productos;
    })
  }

  navegarMateriales() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/almacen','materiales']); 
  }

  navegarPortada() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/portada']); 
  }

}