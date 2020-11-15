// Angular
import { Injectable } from '@angular/core';
// Dependencias de terceros
import { CookieService } from 'ngx-cookie';
// Dependencias propias v1.0.1
import { LoginResponse } from 'ng-slabon-api-client';
@Injectable()
export class CookiesService {
    constructor(
        private _cookie: CookieService, //Cookies
    ) { }
    /**
     * @summary Obtener el token actual de la cookie
     */
    public getToken = (): string => {
        return this._cookie.get('currentUser') ? JSON.parse(this._cookie.get('currentUser')).token : '';
    }
    /**
     * @summary Obtener el la data de la cookie actual
     */
    public getCookie = (): string => {
        return this._cookie.get('currentUser');
    }
    /**
     * @summary Obtener el nombre del usuario
     */
    public getUserName = (): string => {
        return JSON.parse(this._cookie.get('currentUser')).email;
    }
    /**
     * @summary Obtener el nombre del usuario
     */
    public getUserId = (): number => {
        return JSON.parse(this._cookie.get('currentUser')).pkuserId;
    }
    /**
     * @summary Guardar la cookie
     * @param _data el objeto a guardar en la cookie
     */
    public saveToken = (_data: LoginResponse): void => {
        this._cookie.put('currentUser', JSON.stringify(_data));
    }
    /**
     * @summary Eliminar la cookie
     */
    public destroyToken = (): void => {
        this._cookie.remove("currentUser");
    }
}