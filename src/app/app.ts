import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { FormularioRegistroComponent } from './formulario-registro/formulario-registro';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormularioRegistroComponent],
  templateUrl: './app.html',
  template: `
    <main>
      <h1>Mi Práctica de Formulario</h1>
      <hr>
      
      <app-formulario-registro></app-formulario-registro>
      
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Laboratorio2');
}
