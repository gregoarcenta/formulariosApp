import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.formB.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.formB.array([
      ['Metal'],
      ['Pop']
    ], Validators.required)
  })

  nuevoFavorito: FormControl = this.formB.control(
    '',
    [Validators.required, Validators.minLength(3)]
  )

  constructor(private formB: FormBuilder) { }

  ngOnInit(): void { }

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray
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

    }
    return { error: false }
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) return

    this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required))

    this.nuevoFavorito.reset()
  }

  eliminarFavorito(index: number) {
    this.favoritosArr.removeAt(index)
  }


}
