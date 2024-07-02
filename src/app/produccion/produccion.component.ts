import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Material } from '../modelos/material';
import { MaterialProducto } from '../modelos/materialProducto';
import { MaterialesService } from '../servicios/materiales.service';
import { Producto } from '../modelos/producto';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.css'
})
export class ProduccionComponent implements OnInit{

  listaxeMaterials: MaterialProducto[]; //listado de materiales con relacion producto
  mensajeError:string;
  formSubmitted:boolean = false;


  nuevoProducto: Producto = { //Inicializamos un nuevo producto
    id: 0,
    nombre: '',
    tipo: 'intermedio',
    cantidad_producida: 0,
    tratamiento: '',
    garantia: '',
    materials: []
  };

  constructor(private direccionador: Router,
    private servizoMateriales: MaterialesService,
    private servizoProductos: ProductosService) {

  }
  consumir() {
    this.formSubmitted = true;
    // Filtrar los materiales seleccionados
    const materialesSeleccionados = this.listaxeMaterials.filter(material => material.seleccionado && material.cantidad_consumida > 0);
  
    // Validar que haya al menos un material seleccionado con cantidad mayor que 0
    if (materialesSeleccionados.length === 0) {
      this.mensajeError = "Debe seleccionar al menos un material con una cantidad consumida válida.";
      return;
    }
  
    this.nuevoProducto.materials = materialesSeleccionados; //Asignamos los materiales seleccionados al nuevo producto
  
    // Verificar que todos los campos del nuevo producto sean válidos
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.tipo || this.nuevoProducto.cantidad_producida <= 0 ||
        (this.nuevoProducto.tipo === 'intermedio' && !this.nuevoProducto.tratamiento) ||
        (this.nuevoProducto.tipo === 'terminado' && !this.nuevoProducto.garantia)) {
          this.mensajeError = "Por favor, complete todos los campos requeridos para el nuevo producto.";
      return;
    }
  
    this.servizoProductos.engadirProducto(this.nuevoProducto).subscribe({ //llamamos a servizoProducto engadirProducto pasando la variable nuevoProducto
      next: (respuesta) => {
        window.alert("La producción se ha procesado correctamente");
        this.direccionador.navigate(['/productos']);
      },
      error: (error) => {
        window.alert("Ha ocurrido un error al procesar el nuevo producto");
      }
    });
  }

  ngOnInit(): void {
    this.servizoMateriales.getMateriales$().subscribe((materials) => { //cargamos el listado de materiales
      this.listaxeMaterials = materials;
    });
  }

}
