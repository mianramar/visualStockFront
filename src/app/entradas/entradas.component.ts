import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Entrada } from '../modelos/entrada';
import { EntradasService } from '../servicios/entradas.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { EmpresasService } from '../servicios/empresas.service';
import { Empresa } from '../modelos/empresa';


@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent implements OnInit{
  //Creamos el listado de entradas como un array de entradas
  listaxeEntradas: Entrada[];
  //Iniciamos el listado de empresas para el selecccionable
  listaxeEmpresas: Empresa[];
  //Creamos la variable entradaSeleccionada para cuando queramos ver detalles, editar o eliminar
  entradaSeleccionada: Entrada = null;
  // Creamos variables para usarla como bandera
  editar=false;
  mostrarEntradas=true;
  mostrarDetalle= false;
  // variables para mostrar los errores en el formulario
  mensajeError:string;
  total=0;

  constructor(private servizoEntradas: EntradasService,
     private direccionador: Router,
     private servizoEmpresas: EmpresasService) {
  }

  ngOnInit(): void { //Llamamos a servizoEmpresas  getempresas para completar el desplegable
    this.servizoEmpresas.getEmpresas$().subscribe((empresas) => {
      this.listaxeEmpresas = empresas;
    });
    this.cargarEntradas();
  }

  cargarEntradas(){
    this.servizoEntradas.getEntradas$().subscribe((entradas) => { //Llamamos a servizoentradas getentradas para el listado de entradas y lo asignamos en listaxeEntradas
      this.listaxeEntradas = entradas;
    }); 
  }

  verDetalle(id: number) {
    this.servizoEntradas.verDetalle(id).subscribe((entrada) => { //Llamamos a servizoEntradas ver detalle para obtener todos los datos de la entrada
     this.mostrarEntradas = false;
     this.editar=false;
     setTimeout(() => { //Timeout para coincidir con el final de la animacion
      this.mostrarDetalle = true;
    }, 500);
      this.entradaSeleccionada = entrada;
      this.calcularTotal();

    });
  }

  calcularTotal() { //Método para calcular el total del albaran
    this.total= 0;
    for (const material of this.entradaSeleccionada.materials) {
      this.total += material.pivot.cantidad * material.pivot.precio;
    }
    return this.total;
  }

  editarOn() {
    this.editar=true;
  }

  editarEntrada(entradaForm: NgForm, id: number) {
    // Marcar todos los controles como tocados para que se muestren los mensajes de error
    if (entradaForm.invalid) {
      Object.keys(entradaForm.controls).forEach(controlName => {
        entradaForm.controls[controlName].markAsTouched();
      });
      this.mensajeError = "Por favor, complete todos los campos requeridos.";
      return;
    }
  
    // Ajustar los valores de pivot a cantidad y precio en cada material
    this.entradaSeleccionada.materials.forEach(material => {
      if (!material.pivot.cantidad || material.pivot.cantidad <= 0 || !material.pivot.precio || material.pivot.precio <= 0) {
        this.mensajeError = "Todos los materiales deben tener una cantidad y un precio válidos.";
        return;
      }
      material.cantidad = material.pivot.cantidad;
      material.precio = material.pivot.precio;
    });
  
    this.servizoEntradas.editarEntrada(id, this.entradaSeleccionada).subscribe({ //Llamamos a servizoEntrada editarEntrada pasando el id de la entrada y la variable entrada seleccionada
      next: (respuesta) => {
        window.alert("La entrada se ha modificado correctamente");
        this.cargarEntradas(); //cargamos entradas
        this.cancelar(); //Reseteamos flags
      },
      error: (error) => {
        // Mostramos el error
        window.alert(error.error.error);
        this.cancelar();
      }
    });
  }

  eliminarEntrada(id: number) {
    const confirmacion = window.confirm('¿Está seguro de que quiere eliminar la entrada?'); //Confirmacion para eliminar
    if (confirmacion) {
      this.servizoEntradas.eliminarEntrada(id).subscribe({ //Llamamos a servizo entradas eliminarEntrada pasando el id
        next: (respuesta) => {
          if (respuesta && respuesta.error) {
            // Si la respuesta contiene un campo error, mostrar un alert
            window.alert('Error: ' + respuesta.error);
            this.cancelar();
          } else if (respuesta) {
            // Eliminamos la entrada del listado local
            this.listaxeEntradas = this.listaxeEntradas.filter(entrada => entrada.id !== id);
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
    this.mostrarEntradas= true; 
    this.mostrarDetalle=false; 
    this.mensajeError = null; 
    this.editar=false;
  }

  nuevaEntrada() { //navegamos a nueva entrada
    this.direccionador.navigate(['/nueva-entrada']); 
  }
}
