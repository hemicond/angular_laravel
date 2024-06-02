import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-formularios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css',
})
export default class FormulariosComponent implements OnInit {
  
  formulario!: FormGroup;
  // Definición de los campos del formulario
  nombreControl!: FormControl; // Nuevo: Creamos un FormControl para el campo "nombre"
  emailControl!: FormControl; // Nuevo: Creamos un FormControl para el campo "email"
  telefonoControl!: FormControl; // Nuevo: Creamos un FormControl para el campo "telefono"
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    // Creación de los controles del formulario
    this.nombreControl = new FormControl('', Validators.required); // Nuevo: Asignamos un FormControl al campo "nombre" con validación requerida
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]); // Nuevo: Asignamos un FormControl al campo "email" con validaciones requerida y de email
    this.telefonoControl = new FormControl('', Validators.pattern('[0-9]{10}')); // Nuevo: Asignamos un FormControl al campo "telefono" con validación de patrón
    // Agrupación de los controles en el formulario
    this.formulario = this.formBuilder.group({
      nombre: this.nombreControl, // Modificado: Asignamos el FormControl correspondiente al campo "nombre"
      email: this.emailControl, // Modificado: Asignamos el FormControl correspondiente al campo "email"
      telefono: this.telefonoControl, // Modificado: Asignamos el FormControl correspondiente al campo "telefono"
    });
  }

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const datosFormulario = {
        nombre: this.nombreControl.value,
        email: this.emailControl.value,
        telefono: this.telefonoControl.value,
      };
      // Continuar con el envío de los datos...
    } else {
      // Manejar caso de formulario inválido
    }
  }
}
