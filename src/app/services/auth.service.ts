// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// Servicios
import { CookiesService } from './cookies.service'; // servicio para extraer los datos de la cookie
@Injectable()
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable()); // para controlar si el usuario esta logueado o no
    private strUserName = new BehaviorSubject<string>(this.getUserName()); // para jalar el dato del usuario logueado
    /**
     * @summary poder accerder el status actual de la sesión del usuario
     * @returns Observable => que que nos dice si hay sesión o no
     */
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    /**
     * @summary Para acceder al dato del usuario logueado
     * @returns Observable => que nos tra el dato del usuario a mostrar
     */
    get userName() {
        return this.strUserName.asObservable();
    }
    constructor(
        private _router: Router,
        private _dataCookie: CookiesService
    ) { }
    /**
     * @summary activamos o desactivamos la sesión del usuario
     * @param success Boleano para activar o dasactivar la sesión
     */
    public login(success: boolean) {
        this.loggedIn.next(success);
        this.setUserName(this.getUserName());
    }
    /**
     * @summary seteamos el dato del usuario logueado
     * @param user string para actualizar el dato del usuario logueado
     */
    public setUserName = (user: string): void => {
        console.log('_user => ', user)
        this.strUserName.next(user);
    }
    /**
     * @summary Cerrar sesión 
     */
    public logout() {
        if (this.tokenAvailable()) {
            this._dataCookie.destroyToken();
            this.loggedIn.next(false);
            this._router.navigate(['/index']);
        }
    }
    /**
     * @summary Revisar si existe cookie
     * @returns Boolean que nos indica si la sesión existe o no
     */
    private tokenAvailable(): boolean {
        if (this._dataCookie.getCookie()) {
            return true;
        }
        return false;
    }
    /**
   * @summary Obtener el token actual de la cookie
   * @returns regresa el dato del usuario qu esta edentro de la app
   */
    public getUserName(): string {
        if (this.tokenAvailable()) {
            return this._dataCookie.getUserName();
        }
        return "";
    }
}
