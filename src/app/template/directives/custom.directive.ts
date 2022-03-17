import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appCustom][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CustomDirective,
    multi: true
  }]
})
export class CustomDirective implements Validator {
  @Input() minimo!: number

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const inputValue = control.value
    return inputValue < this.minimo ? { 'customMin': true } : null
  }

}
