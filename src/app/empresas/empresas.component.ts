import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialesService } from '../servicios/materiales.service';
import { CommonModule } from '@angular/common';
import { Material } from '../modelos/material';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';
import { Empresa } from '../modelos/empresa';
import { EmpresasService } from '../servicios/empresas.service';


@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent implements OnInit{

    listaxeEmpresas: Empresa[]; //listado de empresas
    formularioEmpresa: FormGroup; // Definimos o FormGroup asociado ao noso formulario HTML
    formularioEmpresaEdit: FormGroup;
    mensajeError:string;
    idEmpresaSeleccionada: number;
    formSubmitted = false; // Bandera para rastrear si el formulario ha sido enviado
    formEditSubmitted = false;


    constructor(private servizoEmpresas: EmpresasService){ //Inicializamos los formularios con sus validaciones
        this.formularioEmpresaEdit = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
            telefono: new FormControl('', [Validators.required]),
            direccion: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
          });
          this.formularioEmpresa = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
            telefono: new FormControl('', [Validators.required]),
            direccion: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
          });
    }

    ngOnInit() {
        this.cargarEmpresas();
    }


    cargarEmpresas() {
        this.servizoEmpresas.getEmpresas$().subscribe((empresas) => { //Llamamos a servizoEmpresas getEmpresas para obtener el listado de empresas y lo asignamos en listaxeEmpresas
            this.listaxeEmpresas = empresas;
          });
      }
    
      // Método para borrar empresa
      borrarEmpresa(id: number){
        const confirmacion = window.confirm('¿Está seguro de que quiere eliminar la empresa?');//Confirmacion para eliminar
        if (confirmacion) {
          this.servizoEmpresas.eliminarEmpresa(id).subscribe({ //Llamamos a servizoEmpresa eliminarEmpresa pasando el id
            next: (respuesta) => {
              if (respuesta && respuesta.error) {
                // Si la respuesta contiene un campo error, mostrar un alert
                window.alert('Error: ' + respuesta.error);
              } else if (respuesta) {
                //Eliminamos la empresa de la lista local
                this.listaxeEmpresas = this.listaxeEmpresas.filter(empresa => empresa.id !== id);
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


      escogerEmpresa(id:number){ //seleccionamos la empresa al clicar en editar en el listado
        this.idEmpresaSeleccionada = id;
        const empresaSeleccionada = this.listaxeEmpresas.find(m => m.id === id);
        if (empresaSeleccionada) {
          this.formularioEmpresaEdit.patchValue({ // Seteamos los valores del formulario de editar con los de la empresa seleccionada
            nombre: empresaSeleccionada.nombre,
            email: empresaSeleccionada.email,
            telefono: empresaSeleccionada.telefono,
            direccion: empresaSeleccionada.direccion
          });
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
    
    
      editarEmpresa() {
        const formData = this.formularioEmpresaEdit.value;
        this.formEditSubmitted = true;
        if (this.formularioEmpresaEdit.valid) { //Si el formulario es valido
          this.servizoEmpresas.editarEmpresa(this.idEmpresaSeleccionada, formData).subscribe({ //llamamos a servizoEmpresa editarEmpresa pasando el id de la empresa previamente seleccionada y el formulario
            next: (respuesta) => {
                window.alert("La empresa se ha modificado correctamente");
                this.cargarEmpresas(); //cargamos empresas
                this.cerrarModalEdit(); //cerramos modal editar
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

    nuevaEmpresa(){
        this.formSubmitted = true;
         if (this.formularioEmpresa.valid) { //Si el form es valido
          const formData = this.formularioEmpresa.value;
          console.log(formData);
           this.servizoEmpresas.engadirEmpresa(formData).subscribe({ //Llamamos a servizo empresas engadirEmpresa pasando el formulario
            next: (respuesta) => {
                window.alert("La empresa se ha creado correctamente");
                this.cargarEmpresas(); //cargamos empresas
                this.cerrarModal(); //cerramos modal
                this.formSubmitted = false;
                this.formularioEmpresa.reset(); //reseteamos formulario
            },
            error: (error) => {
              // Mostramos el error
              window.alert(error.error.errors);
              this.cerrarModal();
              this.formSubmitted = false;
            }
          });
        } else {
          this.mensajeError = 'Por favor, corrija los errores en el formulario.';
        }
      } 

}