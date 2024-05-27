import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoDataService } from '../servicios/contenido-data.service';
import { Router } from '@angular/router';
import { Departamento } from '../modelos/departamento';

//Importamos el servicio tanto en el import, como en el providers del componente, y se lo pasamos como parametro en el constructor para poder utilizar el servicio.
@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})

export class ContenidoComponent implements OnInit{

  //Creamos la variable datos como un array de Departamentos
  datos : Departamento[];
  //Creamos la variable usuarioParseado para poder obtener datos del usuario y conocer su rol
  usuarioParseado: any;

  //Pasamos como parametro el servicio para poder utilizarlo en el constructor
  constructor( private servizoJson : ContenidoDataService, private direccionador: Router){

    //Inicializamos nuestra variable datos con la variable datos del servicio (la que ya tiene cargada los datos del json)
    this.servizoJson.getDepartamentos$().subscribe((datos) => {
      this.datos = datos;
    }); // Facemos que o array datos sexa permanentemente igual ao array de departamentos que hai no servizo mediante unha suscripción
 
  }

  // Al cargar la página
  ngOnInit(): void {
    const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado
    this.usuarioParseado = JSON.parse(usuarioRecuperado); // Lo "parseamos" para poder trabajar con sus atributos 
  }

  navegarAdministracion() { // Funcionalidad del botón para redireccionar a Administracion
    this.direccionador.navigate(['/administracion']); 
  }

  navegarAlmacen() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/almacen','materiales']); 
  }

  navegarEntradas() { // Funcionalidad del botón para redireccionar a Entradas
    this.direccionador.navigate(['/entradas']); 
  }

  navegarProduccion() { // Funcionalidad del botón para redireccionar a Producción
    this.direccionador.navigate(['/produccion']); 
  }

  navegarSalidas() { // Funcionalidad del botón para redireccionar a Salidas
    this.direccionador.navigate(['/salidas']); 
  }
}
