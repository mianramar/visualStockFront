import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';

import { ContenidoDataService } from '../servicios/contenido-data.service';


@Component({
  selector: 'app-aemet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aemet.component.html',
  styleUrl: './aemet.component.css'
})
export class AemetComponent implements OnInit{
    constructor(private servizoDatos: ContenidoDataService){
    }

    texto:string;

    ngOnInit() {
          this.servizoDatos.getDatosAemet$().subscribe({ //Llamamos al servizodatos getdatos Aemet para obtener los datos de la API
            next: (respuesta) => {
                this.texto= respuesta;
            },
            error: (error) => {
              // Mostramos el error
              window.alert(error.message);
            }
          });
    }
}