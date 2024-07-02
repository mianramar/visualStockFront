import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Salida } from '../modelos/salida';
import { Empresa } from '../modelos/empresa';
import { Producto } from '../modelos/producto';
import { SalidasService } from '../servicios/salidas.service';
import { Router } from '@angular/router';
import { EmpresasService } from '../servicios/empresas.service';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-nueva-salida',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nueva-salida.component.html',
  styleUrl: './nueva-salida.component.css'
})
export class NuevaSalidaComponent implements OnInit{

  salidaSeleccionada: Salida = {
    id: 0,
    empresa_id: '',
    numero: '',
    tipo: 'salida',
    fecha: '',
    empresa_nome: '',
    productos: []
  };


   // variables para mostrar los errores en el formulario
   mensajeError:string;
     //Iniciamos el listado de empresas para el selecccionable
  listaxeEmpresas: Empresa[];
  listaxeProductos: Producto[];//Iniciamos el listado de productos

   constructor(private servizoSalidas: SalidasService,
    private direccionador: Router,
    private servizoEmpresas: EmpresasService,
    private servizoProductos: ProductosService) {
 }


 ngOnInit(): void {
  this.servizoEmpresas.getEmpresas$().subscribe((empresas) => { //Llamamos a servizoEmpresas getEmpresas para obtener un listado de empresas
    this.listaxeEmpresas = empresas;
  });

  this.servizoProductos.getProductos$().subscribe((productos) => { //Llamamos a servizoProductos getProductos para obtener un listado de productos
    this.listaxeProductos = productos;
  });
}


guardarSalida(salidaForm: NgForm) {
  // Marcar todos los controles como tocados para que se muestren los mensajes de error
  if (salidaForm.invalid) {
    Object.keys(salidaForm.controls).forEach(controlName => {
      salidaForm.controls[controlName].markAsTouched();
    });
    this.mensajeError = "Por favor, complete todos los campos requeridos.";
    return;
  }

  // Filtrar los productos seleccionados y verificar cantidad y precio
  const productosSeleccionados = this.listaxeProductos.filter(producto => {
    return producto.seleccionado && producto.cantidad > 0 && producto.precio > 0;
  });

  if (productosSeleccionados.length === 0) {
    this.mensajeError = "Debe seleccionar al menos un producto con una cantidad y precio válidos.";
    return;
  }

  this.salidaSeleccionada.productos = productosSeleccionados;//Asignamos los productos seleccionados a la nueva salida

  this.servizoSalidas.engadirSalida(this.salidaSeleccionada).subscribe({ //Llamamos a servizoSalida engadirSalida pasando la variable salidaSeleccionada
    next: (respuesta) => {
      window.alert("La salida se ha creado correctamente");
      this.direccionador.navigate(['/salidas']); //Redireccionamos a salidas
    },
    error: (error) => {
      // Mostramos el error
      window.alert("Ha ocurrido un error al intentar crear el albarán. Por favor, revise los datos");
    }
  });
}

}
