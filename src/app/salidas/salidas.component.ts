import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Salida } from '../modelos/salida';
import { SalidasService } from '../servicios/salidas.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-salidas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './salidas.component.html',
  styleUrl: './salidas.component.css'
})
export class SalidasComponent implements OnInit{
  //Creamos el listado de salidas como un array de salidas
  listaxeSalidas: Salida[];
  // Creamos variables para usarla como bandera
  editar=false;
  mostrarSalidas=true;
  // variables para mostrar los errores en el formulario
  mensajeError:string;
  // Creamos variable para guardar el nombre antiguo en caso de cambiarlo
  nombreAntiguo='';
  formularioSalida: FormGroup; // Definimos o FormGroup asociado ao noso formulario HTML

  constructor(private servizoSalidas: SalidasService, private direccionador: Router) {
    this.formularioSalida = new FormGroup({
      numero: new FormControl(),
      empresa: new FormControl(),
      fecha: new FormControl(),
      total: new FormControl()
    })
  }

  // Este método execútase cando a compoñente está lista para ser cargada. Vainos permitir suscribirnos aos cambios do array de módulos que hai no servizo
  ngOnInit(): void {
    this.servizoSalidas.getSalidas$().subscribe((salidas) => {
      this.listaxeSalidas = salidas;
    }); // Facemos que o array listaxeSalidas sexa permanentemente igual ao array de salidas que hai no servizo mediante unha suscripción
  }


  // Método para guardar un nuevo salida
  nuevaSalida(){
    this.mensajeError = this.servizoSalidas.engadirSalida(this.formularioSalida.value);
    if(this.mensajeError == null) { // Si no hay errores volvemos a la tabla de salidas
      this.mostrarSalidas = !this.mostrarSalidas;
    }
  }


  // Método para mostrar el formulario para crear un nuevo salida
  mostrarFormularioCrear(){
    this.editar = false;
    this.formularioSalida.reset(); // reseteamos el form, para eliminar datos anteriores
    this.mostrarSalidas = false;
  }

  navegarPortada() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/portada']); 
  }

  eliminarAlbaran(pNumero: number){
    this.servizoSalidas.eliminarSalida(pNumero);
  }
}
