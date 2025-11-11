import { Component, OnInit } from '@angular/core';


// CommonModule nos da acceso a *ngIf y *ngFor
import { CommonModule } from '@angular/common'; 
// ReactiveFormsModule nos da FormBuilder, FormGroup y formControlName
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
// ----------------------------------------

import { NgxCaptchaModule } from 'ngx-captcha';


@Component({
  selector: 'app-formulario-registro',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule, NgxCaptchaModule
  ],
  templateUrl: './formulario-registro.html',
  styleUrls: ['./formulario-registro.css']
})


//Definicion de la clase
export class FormularioRegistroComponent implements OnInit {

  //Definimos key de captcha
  recaptchaSiteKey: string = "6LcEbAksAAAAAFgeN4Rk99P9OdV_A5okgb5FfsFR";


  registroForm!: FormGroup;
  paises: string[] = ['Ecuador', 'Colombia', 'Perú', 'Argentina', 'México'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Esta lógica de FormBuilder es idéntica
    this.registroForm = this.fb.group({
      nombreCompleto:   ['', Validators.required],
      numeroCedula:     ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      fechaNacimiento:  ['', Validators.required],
      correoElectronico:['', [Validators.required, Validators.email]],
      paisResidencia:   ['', Validators.required],
      sexo:             ['', Validators.required],
      biografia:        ['', [Validators.required, Validators.minLength(100), Validators.maxLength(1000)]],
      terminos:         [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required]
    });
  }



  get f() { return this.registroForm.controls; }


  onSubmit(): void {
    // Paso 1: Marcar todos los campos como "tocados"
    // Esto fuerza a que se muestren todos los mensajes de error
    // si el usuario intenta enviar el formulario vacío.
    this.registroForm.markAllAsTouched();

    // Paso 2: Validar si el formulario es inválido
    if (this.registroForm.invalid) {
      console.error("Formulario inválido. Revise los campos.");
      // No continuamos si hay errores
      return; 
    }

    // Si llegamos aquí, el formulario ES VÁLIDO.
    console.log("Formulario Válido. Guardando en LocalStorage...");
    
    try {
      // Paso 3: Guardar en LocalStorage
      // Usamos JSON.stringify para convertir el objeto del formulario en un string
      localStorage.setItem('registroUsuario', JSON.stringify(this.registroForm.value));
      
      // Paso 4: Dar retroalimentación al usuario
      alert('¡Registro guardado exitosamente en LocalStorage!');
      
      // Paso 5 (Opcional pero recomendado): Limpiar el formulario
      this.registroForm.reset();

    } catch (e) {
      console.error("Error al guardar en LocalStorage", e);
      alert('Hubo un error al guardar el registro.');
    }
  }
}