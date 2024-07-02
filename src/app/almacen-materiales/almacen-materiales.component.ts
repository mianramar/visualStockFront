import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialesService } from '../servicios/materiales.service';
import { CommonModule } from '@angular/common';
import { Material } from '../modelos/material';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-almacen-materiales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './almacen-materiales.component.html',
  styleUrl: './almacen-materiales.component.css'
})
export class AlmacenMaterialesComponent implements OnInit{
  //Creamos el listado de materiales como un array de materiales
  listaxeMateriales: Material[];

  materialForm: FormGroup; //Formularios de crear y editar
  materialEditForm: FormGroup;
  idMaterialSeleccionado:number;

  formSubmitted: boolean = false; //flags para mostrar las validaciones
  formEditSubmitted: boolean = false;

  mensajeError:string;


  constructor(private servizoMateriales: MaterialesService, private direccionador: Router) { //Inicializamos formularios con sus validaciones
    this.materialForm = new FormGroup({
      metal: new FormControl('', [Validators.required]),
      dimensiones: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([^x]*x[^x]*){2}$/i) //Patrón con mínimo 2 "x"
      ])
    });

    this.materialEditForm = new FormGroup({
      metal: new FormControl('', [Validators.required]),
      dimensiones: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([^x]*x[^x]*){2}$/i)
      ])
    });
  }

  ngOnInit(): void {
      this.cargarMateriales();
  }

  cargarMateriales() {
    this.servizoMateriales.getMateriales$().subscribe((materiales) => { //Llamamos a servizoMateriales para obtener el listado y lo asignamos a listaxeMateriales
      this.listaxeMateriales = materiales;
    });
  }

  navegarProductos() { // Funcionalidad del botón para redireccionar a Almacén de productos
    this.direccionador.navigate(['/productos']); 
  }

  editarMaterial() {
    this.formEditSubmitted = true;
    if (this.materialEditForm.valid) { //Comprobamos formulario
      const formData = this.materialEditForm.value;

      this.servizoMateriales.editarMaterial(this.idMaterialSeleccionado, formData).subscribe({ //Llamamos a servizoMateriales, editar material pasando el id del material previamente escogido en escogerMaterial y el formulario
        next: (respuesta) => {
            window.alert("El material se ha modificado correctamente");
            this.cargarMateriales(); //Cargamos listado
            this.cerrarModalEdit(); //Cerramos modal
            this.formEditSubmitted = false;

        },
        error: (error) => {
          // Mostramos el error
          window.alert(error.error.errors);
          this.cerrarModalEdit();
          this.formEditSubmitted = false;
        }
      });
    } else {
      this.mensajeError = 'Por favor, corrija los errores en el formulario.';

    }


  }

  escogerMaterial(id:number){

    this.idMaterialSeleccionado = id; //Guardamos el id cuando pulsamos en "editar" en el listado
    const materialSeleccionado = this.listaxeMateriales.find(m => m.id === id); //guardamos el amterial seleccionado en materialSeleccionado
    if (materialSeleccionado) {
      this.materialEditForm.patchValue({
        metal: materialSeleccionado.metal,
        dimensiones: materialSeleccionado.dimensiones
      });
    }

  }

  eliminarMaterial(id: number) {
    const confirmacion = window.confirm('¿Está seguro de que quiere eliminar el material?');//pedimos confirmacion para eliminar
    if (confirmacion) {
      this.servizoMateriales.eliminarMaterial(id).subscribe({//Llamamos a servizoMateriales eliminarmaterial pasando el id
        next: (respuesta) => {
          if (respuesta && respuesta.error) {
            // Si la respuesta contiene un campo error, mostrar un alert
            window.alert('Error: ' + respuesta.error);
          } else if (respuesta) {
            //Eliminamos el material de la lista local
            this.listaxeMateriales = this.listaxeMateriales.filter(material => material.id !== id);
            window.alert(respuesta.mensaje);
          }
        },
        error: (error) => {
          // Mostramos el error
          window.alert(error.error.mensaje);
        }
      });
    }
  }

  nuevoMaterial(): void {
    this.formSubmitted = true;

    if (this.materialForm.valid) { //validamos formulario
      const formData = this.materialForm.value;
  
      this.servizoMateriales.nuevoMaterial(formData).subscribe({ //Llamamos a servizomateriales nuevoMaterial pasando el formulario
        next: (respuesta) => {
            window.alert("El material se ha creado correctamente");
            this.cargarMateriales(); //cargamos materiales
            this.cerrarModal(); //cerramos modal
            
        },
        error: (error) => {
          // Mostramos el error
          window.alert(error.error.errors);
          this.cerrarModal();
        }
      });
    } else {
      this.mensajeError = 'Por favor, corrija los errores en el formulario.';

    }

  }

  cerrarModal(): void {
    let botonCerrar:HTMLElement= document.getElementById('cerrarModal') as HTMLElement;
    //Simulamos el click del boton cerrar
    botonCerrar.click();
  }

  cerrarModalEdit(): void {
    let botonCerrar:HTMLElement= document.getElementById('cerrarModalEdit') as HTMLElement;
    //Simulamos el click del boton cerrar
    botonCerrar.click();
  }
}
