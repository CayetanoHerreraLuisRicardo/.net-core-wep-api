import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class ErrorService {
    constructor(
        private _alert: ToastrService,
        private _router: Router,
        private _auth: AuthService,
    ) { }
    /**
     * @summary Para las respuestas con codigos HTTP 400, 500. Esto deberá cambiarse de acuerdo a lo que regresa la API
     * @returns Arreglo genero
     */
    public printErrors(response: HttpErrorResponse): void {
        if (response.status === 400 || response.status === 500 || response.status === 404) {
            if (response.error !== null) {
                let errors = "<ul>";
                response.error.errors.forEach(element => {
                    errors = errors + `<li>${element}</li>`
                });
                errors = errors + "</ul>"
                this._alert.error(errors);
            } else {
                this._alert.error("Error en el servidor");
            }
        }
        else if (response.status === 401 || response.status === 403) {
            this._alert.error("Favor de iniciar sesión nuevamnete");
            this._auth.login(false);
            this._router.navigate(['/index']);
        } else {
            console.error(`Codigo HTTP: ${response.status}, message: ${response.message}, statusText: ${response.statusText}`);
        }
    }
}