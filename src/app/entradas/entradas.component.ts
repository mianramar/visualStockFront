import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Entrada } from '../modelos/entrada';
import { EntradasService } from '../servicios/entradas.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent implements OnInit{
  //Creamos el listado de usuarios como un array de usuarios
  listaxeEntradas: Entrada[];
  // Creamos variables para usarla como bandera
  editar=false;
  mostrarEntradas=true;
  // variables para mostrar los errores en el formulario
  mensajeError:string;
  // Creamos variable para guardar el nombre antiguo en caso de cambiarlo
  nombreAntiguo='';
  formularioEntrada: FormGroup; // Definimos o FormGroup asociado ao noso formulario HTML

  constructor(private servizoEntradas: EntradasService, private direccionador: Router) {
    this.formularioEntrada = new FormGroup({
      numero: new FormControl(),
      empresa: new FormControl(),
      fecha: new FormControl(),
      total: new FormControl()
    })
  }

  // Este método execútase cando a compoñente está lista para ser cargada. Vainos permitir suscribirnos aos cambios do array de módulos que hai no servizo
  ngOnInit(): void {
    this.servizoEntradas.getEntradas$().subscribe((entradas) => {
      this.listaxeEntradas = entradas;
    }); // Facemos que o array listaxeUsuarios sexa permanentemente igual ao array de usuarios que hai no servizo mediante unha suscripción
  }


  // Método para guardar un nuevo usuario
  nuevaEntrada(){
    this.mensajeError = this.servizoEntradas.engadirEntrada(this.formularioEntrada.value);
    if(this.mensajeError == null) { // Si no hay errores volvemos a la tabla de usuarios
      this.mostrarEntradas = !this.mostrarEntradas;
    }
  }


  // Método para mostrar el formulario para crear un nuevo usuario
  mostrarFormularioCrear(){
    this.editar = false;
    this.formularioEntrada.reset(); // reseteamos el form, para eliminar datos anteriores
    this.mostrarEntradas = false;
  }

  navegarPortada() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/portada']); 
  }

  eliminarAlbaran(pNumero: number){ // Para "eliminar" el albaran
    this.servizoEntradas.eliminarEntrada(pNumero);
  }
}
