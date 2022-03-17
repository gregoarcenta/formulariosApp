import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm
  nuevoFavorito: string = ''

  persona: Persona = {
    nombre: 'Alex',
    favoritos: [
      { id: 1, nombre: 'Metal' },
      { id: 2, nombre: 'Pop' }
    ]
  }

  guardar() {
    if (this.miFormulario.controls['nombre'].invalid) {
      console.log('Formulario no valido');
      this.miFormulario.control.markAllAsTouched()
      return
    }
    console.log('Guardando...');
  }

  agregarFavorito() {
    if (this.nuevoFavorito.trim() !== '') {
      const nuevoFavorito: Favorito = {
        id: this.persona.favoritos.length + 1,
        nombre: this.nuevoFavorito
      }
      this.persona.favoritos.push({ ...nuevoFavorito })
      this.nuevoFavorito = ''
      this.miFormulario.controls['favorito'].markAsUntouched()
    } else {
      this.miFormulario.controls['favorito'].markAsTouched()
    }
  }

  eliminarFavorito(indice: number) {
    this.persona.favoritos.splice(indice, 1)
  }

  validarInput(campo: string) {
    if (this.miFormulario?.controls[campo]?.touched && (this.miFormulario?.controls[campo]?.invalid || this.miFormulario?.controls[campo]?.value.trim() === '')) {
      return { msg: `EL campo ${campo} es requerido`, error: true }
    }
    return { msg: '', error: false }
  }

}
