import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto';
import { Router } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-almacen-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './almacen-productos.component.html',
  styleUrl: './almacen-productos.component.css'
})
export class AlmacenProductosComponent implements OnInit{
  //Creamos el listado de productos como un array de productos
  listaxeProductos: Producto[];
    //Creamos la variable productoSeleccionado para cuando queramos ver detalles, editar o eliminar
    productoSeleccionado: Producto = null;
    // Creamos variables para usarla como bandera
    editar=false;
    mostrarProductos=true;
    mostrarDetalle= false;
    // variables para mostrar los errores en el formulario
    mensajeError:string;

  constructor(private servizoProductos: ProductosService, private direccionador: Router) {

  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.servizoProductos.getProductos$().subscribe((productos) => { //Llamamos a servizoProductos para obtener el listado y lo asignamos a listaxeProductos
      this.listaxeProductos = productos;
    })
  }

  navegarMateriales() { // Funcionalidad del botón para redireccionar a Almacén de materiales
    this.direccionador.navigate(['/almacen']); 
  }

  navegarProduccion() { // Funcionalidad del botón para redireccionar a Produccion
    this.direccionador.navigate(['/produccion']); 
  }

  editarOn() {
    this.editar=true; //cambiamos el flag para editar
  }

  editarProducto(productoForm: NgForm, id: number) {
    // Marcar todos los controles como tocados para que se muestren los mensajes de error
    if (productoForm.invalid) {
      Object.keys(productoForm.controls).forEach(controlName => {
        productoForm.controls[controlName].markAsTouched();
      });
      this.mensajeError = "Por favor, complete todos los campos requeridos.";
      return;
    }
  
    // Validar los campos adicionales según el tipo
    if (!this.productoSeleccionado.adicional || this.productoSeleccionado.adicional.trim() === '') {
      this.mensajeError = this.productoSeleccionado.tipo === 'intermedio' ? "El tratamiento es requerido." : "La garantía es requerida.";
      return;
    }
  
    this.servizoProductos.editarProducto(id, this.productoSeleccionado).subscribe({ //llamamos a servizoProductos editarProducto pasando el id y la variable productoSleleccionado
      next: (respuesta) => {
        window.alert("El producto se ha modificado correctamente");
        this.cargarProductos(); //cargamos productos
        this.cancelar(); //reseteamos flags
      },
      error: (error) => {
        // Mostramos el error
        window.alert("Ha ocurrido un error al modificar el producto");
        this.cancelar();
      }
    });
  }

  verDetalleProducto(id: number) {
    this.servizoProductos.verDetalle(id).subscribe((producto) => { //llamamos a sertvizoproductos verdetalle para obtener los campos del producto
      //Timeout para coincidir con el final de la animacion
      this.mostrarProductos = false;
      this.editar=false;
      setTimeout(() => { //seteamos un timeOut  para mostrar el detalleProducto cuando termina la animacion
       this.mostrarDetalle = true;
     }, 500);
       this.productoSeleccionado = producto;
       if (producto.intermedio) {
        this.productoSeleccionado.adicional = producto.intermedio.tratamiento;
       }
       if (producto.terminado) {
        this.productoSeleccionado.adicional = producto.terminado.garantia;
       }


     });
  }

  eliminarProducto(id: number) {
    const confirmacion = window.confirm('¿Está seguro de que quiere deshacer la producción?'); //pedimos confirmacion para eliminar el producto
    if (confirmacion) {
      this.servizoProductos.eliminarProducto(id).subscribe({ //llamamos a servizoproducto eliminarproducto pasando el id
        next: (respuesta) => {
          if (respuesta && respuesta.error) {
            // Si la respuesta contiene un campo error, mostrar un alert
            window.alert('Error: ' + respuesta.error);
          } else if (respuesta) {
            //Eliminamos el producto de la lista local
            this.listaxeProductos = this.listaxeProductos.filter(producto => producto.id !== id);
            window.alert(respuesta.mensaje);
          }
        },
        error: (error) => {
          // Mostramos el error
          window.alert(error.error.error);
        }
      });
    }
  }

  cancelar(){ //toggleamos flags
    this.mostrarProductos=!this.mostrarProductos; 
    this.mostrarDetalle=!this.mostrarDetalle; 
    this.mensajeError = null; 
    this.editar=false;
  }
}