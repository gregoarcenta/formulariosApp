import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmailValidatorService } from '../../services/email-validator.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombrePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.evs]],
    usuario: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, {
    validators: [this.vs.camposIguales('password', 'password2')]
  })

  constructor(
    private fb: FormBuilder,
    private vs: ValidationService,
    private evs: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.registroForm.reset({
      nombre: 'Alex Arcentales',
      email: 'test1@test.com',
      usuario: 'gregoarcenta'
    })
  }

  get emailErrorMsg(): string {
    const email = this.registroForm.controls['email']
    if (email.getError('required')) {
      return 'El campo email es requerido'
    }
    if (email.getError('pattern')) {
      return 'El formato del email no es valido'
    }
    if (email.getError('emailTomado')) {
      return 'El email ya existe'
    }
    return ''
  }

  guardar() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched()
      console.log('ERROR: Formulario invalido');
    } else {
      console.log('guardando...', this.registroForm.value);
      this.registroForm.reset()
    }
  }

  isInputNotValid(campo: string): boolean {
    return this.registroForm.controls[campo].touched && this.registroForm.controls[campo].invalid
  }

  validarInput(campo: string) {
    if (this.registroForm.controls[campo]?.touched) {

      if (this.registroForm.controls[campo].getError('required'))
        return { msg: `El campo ${campo} es requerido`, error: true }

      if (this.registroForm.controls[campo].getError('pattern'))
        return { msg: `El formato del ${campo} no es valido`, error: true }

      if (this.registroForm.controls[campo].getError('minlength'))
        return { msg: `La contraseña debe tener minimo 6 digitos`, error: true }

      if (this.registroForm.controls[campo].getError('noStrider'))
        return { msg: `El ${campo} no puede ser strider`, error: true }

      if (this.registroForm.controls[campo].getError('emailTomado'))
        return { msg: `El email ya existe`, error: true }

      if (this.registroForm.controls[campo].getError('noIguales'))
        return { msg: `Las contraseñas no coinciden`, error: true }

    }
    return null
  }

}



