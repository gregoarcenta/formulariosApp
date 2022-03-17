import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm

  constructor() { }

  ngOnInit(): void { }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.control.markAllAsTouched()
      console.log('Formulario no valido');
      return
    } else {
      this.miFormulario.reset()
      console.log('Guardando...');
    }
  }

  validarInput(campo: string) {
    switch (campo) {
      case 'producto':
        return this.validarInputProducto(campo);
      case 'precio':
        return this.validarInputPrecio(campo);
      case 'existencias':
        return this.validarInputExistencias(campo);
      default:
        return;
    }
  }

  validarRequerido(campo: string) {
    if (this.miFormulario?.controls[campo]?.errors?.['required'] && this.miFormulario?.controls[campo]?.touched) {
      return { msg: `El campo ${campo} es requerido`, error: true }
    }
    return { msg: '', error: false }
  }

  validarInputProducto(campo: string) {
    if (this.validarRequerido(campo).error === true) {
      return this.validarRequerido(campo)
    }

    if (this.miFormulario?.controls[campo]?.errors?.['minlength'] && this.miFormulario?.controls[campo]?.touched) {
      return { msg: `El campo ${campo} debe tener al menos 3 caracteres`, error: true }
    }
    return { msg: '', error: false }
  }

  validarInputPrecio(campo: string) {
    if (this.validarRequerido(campo).error === true) {
      return this.validarRequerido(campo)
    }

    if (this.miFormulario?.value.precio <= 0 && this.miFormulario?.controls[campo]?.touched) {
      return { msg: `El campo ${campo} debe ser mayor a 0`, error: true }
    }
    return { msg: '', error: false }
  }

  validarInputExistencias(campo: string) {
    if (this.validarRequerido(campo).error === true) {
      return this.validarRequerido(campo)
    }

    if (this.miFormulario?.value.existencias <= 0 && this.miFormulario?.controls[campo]?.touched) {
      return { msg: `El campo ${campo} debe ser mayor a 0`, error: true }
    }
    return { msg: '', error: false }
  }

}
