import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Entrada } from '../modelos/entrada';
import { EntradasService } from '../servicios/entradas.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { EmpresasService } from '../servicios/empresas.service';
import { Empresa } from '../modelos/empresa';
import { Material } from '../modelos/material';
import { MaterialesService } from '../servicios/materiales.service';


@Component({
  selector: 'app-nueva-entrada',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nueva-entrada.component.html',
  styleUrl: './nueva-entrada.component.css'
})
export class NuevaEntradaComponent implements OnInit{

  entradaSeleccionada: Entrada = {
    id: 0,
    empresa_id: '',
    numero: '',
    tipo: 'entrada',
    fecha: '',
    empresa_nome: '',
    materials: []
  };

   // variables para mostrar los errores en el formulario
   mensajeError:string;
     //Iniciamos el listado de empresas para el seleccionable
  listaxeEmpresas: Empresa[];
  listaxeMaterials: Material[];//Inicializamos el listado de materiales

   constructor(private servizoEntradas: EntradasService,
    private direccionador: Router,
    private servizoEmpresas: EmpresasService,
    private servizoMaterials: MaterialesService) {
 }


 ngOnInit(): void {
  this.servizoEmpresas.getEmpresas$().subscribe((empresas) => { //Llamamos a servizoEmpresa getEmpresas para obtener el listado de las empresas y asignaro a listaxeEmpresas
    this.listaxeEmpresas = empresas;
  });

  this.servizoMaterials.getMateriales$().subscribe((materials) => { //Llamamos a servizoMaterials getMaterials para obtener el listado de los materiales y asignarlo a listaxeMaterials
    this.listaxeMaterials = materials;
  });
}


guardarEntrada(entradaForm: NgForm) {
  // Marcar todos los controles como tocados para que se muestren los mensajes de error
  if (entradaForm.invalid) {
    Object.keys(entradaForm.controls).forEach(controlName => {
      entradaForm.controls[controlName].markAsTouched();
    });
    this.mensajeError= "Por favor, complete todos los campos requeridos.";
    return;
  }

  // Filtrar los materiales seleccionados
  const materialesSeleccionados = this.listaxeMaterials.filter(material => material.seleccionado);
  
  if (materialesSeleccionados.length === 0) {
    this.mensajeError= "Debe seleccionar al menos un material.";
    return;
  }

  // Validar que cada material seleccionado tenga cantidad y precio válidos
  for (let material of materialesSeleccionados) {
    if (!material.cantidad || material.cantidad <= 0 || !material.precio || material.precio <= 0) {
      this.mensajeError= "Todos los materiales seleccionados deben tener una cantidad y un precio válidos."
      return;
    }
  }

  this.entradaSeleccionada.materials = materialesSeleccionados; //asignamos los materiales seleccionados a la nueva entrada

  this.servizoEntradas.engadirEntrada(this.entradaSeleccionada).subscribe({ //llamamos a servizoEntradas engadirEntrada pasando la variable entradaseleccionada
    next: (respuesta) => {
      window.alert("La entrada se ha creado correctamente");
      this.direccionador.navigate(['/entradas']); //Redireccionamos a entradas
    },
    error: (error) => {
      // Mostramos el error
      window.alert("Ha ocurrido un error al intentar crear el albarán. Por favor, revise los datos");
    }
  });
}
}
