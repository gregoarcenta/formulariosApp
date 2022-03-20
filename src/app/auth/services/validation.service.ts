import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  nombrePattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    const valor: string = control.value?.trim().toLowerCase()
    if (valor === 'strider') {
      return { noStrider: true }
    }
    return null
  }

  camposIguales(campo1: string, campo2: string) {
    return (control: FormGroup): ValidationErrors | null => {
      const pass1 = control.get(campo1)?.value
      const pass2 = control.get(campo2)?.value
      if (pass1 !== pass2) {
        control.get(campo2)?.setErrors({ noIguales: true })
        return { noIguales: true }
      }
      control.get(campo2)?.setErrors(null)
      return null
    }
  }
}
