import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Salida } from '../modelos/salida';
import { SalidasService } from '../servicios/salidas.service';
import { Router } from '@angular/router';
import { Empresa } from '../modelos/empresa';
import { EmpresasService } from '../servicios/empresas.service';

@Component({
  selector: 'app-salidas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './salidas.component.html',
  styleUrl: './salidas.component.css'
})
export class SalidasComponent implements OnInit{
  //Creamos el listado de salidas como un array de entradas
  listaxeSalidas: Salida[];
  //Iniciamos el listado de empresas para el selecccionable
  listaxeEmpresas: Empresa[];
  //Creamos la variable salidaSeleccionada para cuando queramos ver detalles, editar o eliminar
  salidaSeleccionada: Salida = null;
  // Creamos variables para usarla como bandera
  editar=false;
  mostrarSalidas=true;
  mostrarDetalle= false;
  // variables para mostrar los errores en el formulario
  mensajeError:string;
  total=0;

  constructor(private servizoSalidas: SalidasService, private direccionador: Router, private servizoEmpresas: EmpresasService) {

  }

  // Este método execútase cando a compoñente está lista para ser cargada. Vainos permitir suscribirnos aos cambios do array de módulos que hai no servizo
  ngOnInit(): void {
    this.servizoEmpresas.getEmpresas$().subscribe((empresas) => { //llamamos a servizoEmpresas get empresas para obtener el listado de empresas y asignarlo en listaxe empresas
      this.listaxeEmpresas = empresas;
    });
    this.cargarSalidas();
  }

  cargarSalidas(){
    this.servizoSalidas.getSalidas$().subscribe((salidas) => { //llamamos a servizoSalidas getSalidas para obtener el listado de salidas y asignarlo en listaxe salidas
      this.listaxeSalidas = salidas;
    }); 
  }

  verDetalle(id: number) {
    this.servizoSalidas.verDetalle(id).subscribe((salida) => { //llamamos a servizoSalidas verdetalle para obtener todos los datos de la salida     
     this.mostrarSalidas = false;
     this.editar=false;
     setTimeout(() => { //Timeout para coincidir con el final de la animacion
      this.mostrarDetalle = true;
    }, 500);
      this.salidaSeleccionada = salida;
      this.calcularTotal(); //calculamos el total

    });
  }

  calcularTotal() {
    this.total= 0;
    for (const producto of this.salidaSeleccionada.productos) {
      this.total += producto.pivot.cantidad * producto.pivot.precio;
    }
    return this.total;
  }


  editarOn() {
    this.editar=true; //flag para modo edicion
  }

  editarSalida(id: number) {
    // Marcar todos los controles como tocados para que se muestren los mensajes de error
    const formControls = (document.querySelector('#contenedorFormularioSalidas form') as HTMLFormElement).querySelectorAll('input, select');
    formControls.forEach((control: any) => control.dispatchEvent(new Event('blur')));
  
    // Verificar si el formulario es válido
    if (this.salidaSeleccionada.numero === '' || this.salidaSeleccionada.empresa_id === '' || this.salidaSeleccionada.fecha === '') {
      this.mensajeError = "Por favor, complete todos los campos requeridos.";
      return;
    }
  
    // Filtrar los productos seleccionados y verificar cantidad y precio
    const productosValidos = this.salidaSeleccionada.productos.filter(producto => {
      return producto.pivot.cantidad > 0 && producto.pivot.precio > 0;
    });
  
    if (productosValidos.length === 0) {
      this.mensajeError = "Debe ingresar una cantidad y un precio válidos para al menos un producto.";
      return;
    }
  
    this.editar = true;
    
    // Ajustar los valores de pivot a cantidad y precio en cada producto
    this.salidaSeleccionada.productos.forEach(producto => {
      producto.cantidad = producto.pivot.cantidad;
      producto.precio = producto.pivot.precio;
    });
  
    this.servizoSalidas.editarSalida(id, this.salidaSeleccionada).subscribe({//llamamos a servizoSalidas editarSalida pasando el id y la variable salidaSeleccionada
      next: (respuesta) => {
        window.alert("La salida se ha modificado correctamente");
        this.cargarSalidas(); //cargamos salidas
        this.cancelar(); //reseteamos flags
      },
      error: (error) => {
        window.alert(error.error.error);
        this.cancelar();
      }
    });
  }

  eliminarSalida(id: number) {
    const confirmacion = window.confirm('¿Está seguro de que quiere eliminar la salida?'); //pedimos confirmacion para eliminar la salida
    if (confirmacion) {
      this.servizoSalidas.eliminarSalida(id).subscribe({ //llamamos a servizoSalida eliminarSalida pasando el id
        next: (respuesta) => {
          if (respuesta && respuesta.error) {
            // Si la respuesta contiene un campo error, mostrar un alert
            window.alert('Error: ' + respuesta.error);
          } else if (respuesta) { 
            // Eliminamos la salida del listado local
            this.listaxeSalidas = this.listaxeSalidas.filter(salida => salida.id !== id);

            window.alert(respuesta.mensaje);
            this.cancelar();
          }
        },
        error: (error) => {
          // Mostramos el error
          window.alert(error.error.error);
          this.cancelar();
        }
      });
    }
  } 

  cancelar(){
    this.mostrarSalidas=true; 
    this.mostrarDetalle=false; 
    this.mensajeError = null; 
    this.editar=false;
  }

  nuevaSalida() {
    this.direccionador.navigate(['/nueva-salida']); 
  }
}
