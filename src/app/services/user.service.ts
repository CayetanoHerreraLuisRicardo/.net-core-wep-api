import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorService } from './validator.service'
@Injectable()
export class UserService {
    private rePassword: RegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[°|¬!#$%&/()=?\¿¡*+~{^},;.:-_])[A-Za-z\d°|¬!#$%&/()=?\¿¡*+~{^},;.:-_]{10,}$/);
    constructor(
        private _validator: ValidatorService
    ) { }

    /*@summary Vefifica que los passwords sean validas y coincidan
    * @param _field FormControlName a validar
    * @param _form FormGroup => formulario
    * @return Object json: aplica o no la clase  "has-error has-feedback"
    */
    public verifyPassword = (_field: string, _form: FormGroup): any => {
        let result = false;
        if (this.passwordsMatch(_form) === false || this._validator.isFieldInvalid(_field, _form) === true) {
            result = this.isValidPassword(_form);
        } else {
            if (this.touchPasswords(_form)) {
                result = !this.isValidPassword(_form);
            } else {
                result = false;
            }
        }
        return { 'has-error has-feedback': result };
    }
    /**
   * @summary Valida si los passwords coinciden
   * @param _form FormGroup => formulario
   * @return boolean => 'true' los passwords coinciden | 'false' los passwords no coinciden
   */
    public passwordsMatch = (_form: FormGroup): boolean => {
        let result = true;
        if (this.touchPasswords(_form)) {
            if (_form.value.password === _form.value.confirmPassword) {
                result = true;
            } else {
                result = false;
            }
        }
        return result;
    }
    /**
     * @summary Valida que los passwords cumplan con la expresion regular
     * @return boolean => 'true' los passwords cumplen con la regla  | 'false' los passwords no cumplen con la regla
     */
    public isValidPassword = (_form: FormGroup): boolean => {
        let result = true;
        if (this.touchPasswords(_form)) {
            if (!this.rePassword.test(_form.value.password)) {
                result = false;
            }
        }
        return result;
    }
    /**
    * @summary Verifica si el usuario ya toco los canpos de 'password' y 'confirmPassword'
    * @return boolean => 'true' los 2 campos ya los toco el usuario  | 'false' los 2 campos aún no los toca el usuario
    */
    public touchPasswords = (_form: FormGroup): boolean => {
        return (_form.controls.password.touched && _form.controls.confirmPassword.touched);
    }
    /**
   * @summary Valida aplicar estilo de error en campo email
   * @param _form FormGroup => formulario
   * @return Clase CSS a aplicar al input de tipo email
   */
    public errorCssEmail = (_field: string, _form: FormGroup): boolean => {
        let reEmail: RegExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
        let css = this._validator.displayCss(_field, _form)['has-error has-feedback'];
        if (!css && _form.controls[_field].value !== null) {
            css = (!reEmail.test(_form.controls.email.value));
        }
        return css;
    }
}