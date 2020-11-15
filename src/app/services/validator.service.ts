import { Injectable, OnInit } from '@angular/core';
// Forms
import { FormGroup } from '@angular/forms';
@Injectable()
export class ValidatorService implements OnInit {

    errorMessage: string;
    // Expresion regular correo electrónico
    private reEmail: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    ngOnInit() {
    }
    /**
     * @summary Aplicar estilo de borde de input inválido
     * @param _field FormControlName ==> campo a validar
     * @param _form FormGroup ==> Formulario al que pertenece el campo a validar
     * @return Object json: aplica o no la clase  "has-error has-feedback" 
     */
    public displayCss(_field: string, _form: FormGroup): any {
        return {
            'has-error has-feedback': this.isFieldInvalid(_field, _form),
        };
    }
    /**
     * @summary Aplicar estilo de borde de select inválido
     * @param _field FormControlName ==> campo a validar
     * @param _form FormGroup ==> Formulario al que pertenece el campo a validar
     * @return Object json: aplica o no la clase  "has-error has-feedback" 
     */
    public displayCssSelect = (_field: string, _form: FormGroup): any => {
        return {
            'has-error has-feedback': (this.isFieldInvalid(_field, _form) || (_form.get(_field).value == 0 && _form.get(_field).touched && _form.get(_field).enabled))
        }
    }
    /**
     * @summary Usada para cuando un campo no cumple una validación y  mostrar el mensaje
     * @param _field FormControlName ==> campo a validar
     * @param _form FormGroup ==> Formulario al que ertenece el campo a validar
     * @return boolean
     */
    public isFieldInvalid(_field: string, _form: FormGroup): boolean {
        if (_form.get(_field).invalid && _form.get(_field).touched) {
            if (_form.get(_field).errors.required) {
                this.errorMessage = "El campo es requerido";
                return true;
            }

            if (_form.get(_field).errors.minlength) {
                this.errorMessage = "ingresa mínimo " + _form.get(_field).errors.minlength.requiredLength + " caracteres";
                return true;
            }

            if (_form.get(_field).errors.maxlength) {
                this.errorMessage = "El máximo es de " + _form.get(_field).errors.maxlength.requiredLength + " caracteres";
                return true;
            }

            if (_form.get(_field).errors.min) {
                this.errorMessage = "La cantidad mínima es " + _form.get(_field).errors.min.min + " ";
                return true;
            }

            if (_form.get(_field).errors.max) {
                this.errorMessage = "La cantidad máxima es " + _form.get(_field).errors.max.max + " ";
                return true;
            }

            if (_form.get(_field).errors.email) {
                this.errorMessage = "Dirección de correo electrónico inválida";
                return true;
            }
            if (_form.get(_field).errors.pattern) {
                this.errorMessage = "Campo inválido";
                return true;
            }
        }
        return false;
    }
    /**
     * @summary Valida que los elementos select sean válidos
     * @param _form FormGroup ==> Formulario a validar
     * @return boolean
     */
    public isSelectInvalid(_form: FormGroup): boolean {
        let selects: string[] = [];
        Object.keys(_form.controls).forEach((key: string) => {
            if (key.substring(0, 2) === 'id') {// todos los elementos select deben iniciar con 'id' ejmplo: 'idCustomer'
                selects.push(key);
            }
        });
        for (let i = 0; i < selects.length; i++) {
            const value = _form.controls[selects[i]].value;
            if (value == 0) {
                if (_form.controls[selects[i]].disabled) {
                    console.log('0 y disabled ', selects[i]);
                }
                if (_form.controls[selects[i]].enabled) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * @summary Indica si el formulario en general es valido
     * @param _form FormGroup ==> Formulario al que se va a validar
     * @return boolean
     */
    public isFormValid(_form: FormGroup): boolean {
        return _form.invalid;
    }

    /**
     * @summary Revisa si el formulario en general es valido y marca como touched los campos invalidos
     * @param _form FormGroup ==> Formulario al que se va a validar
     */
    public validateFields(_form: FormGroup): any {
        Object.keys(_form.controls).forEach(_field => {
            const control = _form.get(_field);
            control.markAsTouched({ onlySelf: true });
            if (control.valid == false) {
                console.error("Campo invalido: " + _field + "[" + control.value + "]");
            }
        });
    }
    /**
     * @summary Aplicar estilo de borde del input Email inválido
     * Se tubo que hacer custum lo del email, pues Validators.email, si no pongo email o es nulo marca que hay un error con el amil
     * El error está resuelto en la version 6.0.0-beta.4, la versión usada es inferior: https://github.com/angular/angular/issues/16183
     * @param _field FormControlName a validar
     * @param _form FormControl a validar
     * @return Object json: aplica o no la clase  "has-error has-feedback"
     */
    public displayCssEmail = (_field: string, _form: FormGroup): any => {
        let value: boolean = false;
        if (!this.isValidEmail(_field, _form)) {
            value = true;
        }
        return {
            'has-error has-feedback': value,
        };
    }
    /**
     * @summary Evaluar si es válido el email
     * @return boolean: true (Formato Valido) |  false (Formato Invalido)
     */
    public isValidEmail = (_field: string, _form: FormGroup): boolean => {
        if (_form.controls[_field].touched) {
            let num = _form.controls[_field].value;
            if (num === null || num === '') {
                return true;
            } else {
                return this.reEmail.test(num);
            }
        } else {
            return true;
        }
    }
}