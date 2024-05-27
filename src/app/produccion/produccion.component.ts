import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Material } from '../modelos/material';
import { MaterialesService } from '../servicios/materiales.service';
import { ProductosService } from '../servicios/productos.service';
import { Producto } from '../modelos/producto';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.css'
})
export class ProduccionComponent implements OnInit{

  formularioProduccion: FormGroup;

   //Creamos el listado de materiales como un array de materiales
  listaxeMateriales: Material[];
  materialesSeleccionados: any[] = [];
  materialesConsumidos: any[] = [];
   // variables para mostrar los errores en el formulario
   mensajeError:string;

  constructor(private servizoMateriales: MaterialesService,
    private direccionador: Router,
    private servizoProductos: ProductosService) {

this.elaborarFormulario();
      /*this.formularioProduccion = new FormGroup({
        nome: new FormControl(),
        tipo: new FormControl(),
        cantidad: new FormControl()
      });*/
    
  }

  elaborarFormulario():void{
    /*this.formularioProduccion = this.elaborador.group({
    nombre : ['', Validators.required]
    });*/
  }
  ngOnInit(): void {
    this.servizoMateriales.getMateriales$().subscribe((materiales) => {
      this.listaxeMateriales = materiales;
    })
  }


  toggleMaterialSeleccionado(material: any) {
    const index = this.materialesSeleccionados.findIndex(mat => mat.id === material.id);
    if (index === -1) {
      this.materialesSeleccionados.push(material);
    } else {
      this.materialesSeleccionados.splice(index, 1);
    }
  }

  estaSeleccionado(material: any): boolean {
    return this.materialesSeleccionados.some(mat => mat.id === material.id);
  }

  // Método para guardar un nuevo producto
  nuevoProducto(pProducto: Producto){
    this.mensajeError = this.servizoProductos.engadirProducto(pProducto);
    if(this.mensajeError == null) { // Si no hay errores volvemos a almacén
      this.direccionador.navigate(['/almacen','productos']); 
    }
  }

  consumir(formulario: HTMLFormElement){ 

    const nombre = (formulario.elements.namedItem('nombre') as HTMLInputElement).value;
    const tipo = (formulario.elements.namedItem('tipo') as HTMLInputElement).value;
    const cantidad = (formulario.elements.namedItem('cantidad') as HTMLInputElement).value;

    console.log(this.materialesSeleccionados);
    for (const material of this.materialesSeleccionados) {
      const campoCantidad = 'cantidad' + material.id;
      const materialConsumido = (formulario.elements.namedItem(campoCantidad) as HTMLInputElement).value;
      this.materialesConsumidos.push({id: material.id, cantidad_consumida: materialConsumido });
    }

    const pProducto: Producto = {
      id: 0,
      nombre: nombre,
      fecha_alta: new Date().toDateString(),
      tipo: tipo,
      cantidad_disponible: parseInt(cantidad),
      materiales: this.materialesSeleccionados
    };

    this.nuevoProducto(pProducto);

  }

  navegarPortada() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/portada']); 
  }
}