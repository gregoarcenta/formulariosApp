import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  /* miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    existencias: new FormControl(''),
  }) */

  miFormulario: FormGroup = this.formB.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    existencias: [0, [Validators.required, Validators.min(0)]]
  })

  constructor(
    private formB: FormBuilder
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'RTX 4080 TI'
    })
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched()
      console.log('ERROR: Formulario no valido')
      return
    }
    console.log('Guardando..', this.miFormulario.value);
    this.miFormulario.reset()
  }

  validarInput(campo: string) {

    if (this.miFormulario.controls[campo]?.touched) {

      if (this.miFormulario.controls[campo].getError('required'))
        return { msg: `El campo ${campo} es requerido`, error: true }

      if (this.miFormulario.controls[campo].getError('minlength'))
        return { msg: `El campo ${campo} debe tener minimo 3 caracteres`, error: true }

      if (this.miFormulario.controls[campo].getError('min'))
        return { msg: `El campo ${campo} debe ser mayor o igual a 0`, error: true }

    }
    return { error: true }
  }

}
