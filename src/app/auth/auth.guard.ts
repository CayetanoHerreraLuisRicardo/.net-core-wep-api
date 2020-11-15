import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './../services/index';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router
    ) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._auth.isLoggedIn      // primero vamos a recuperar el valor actual de 'isLoggedIn' getter de el 'AuthService', el cual es un Observable
            .pipe(
                take(1),                              // Como solo estamos interesados ​​en verificar el valor del 'Observalbe' una sola vez (si el usuario está conectado o no), utilizaremos el operador  'take'
                map((isLoggedIn: boolean) => {        // Verificaremos el valor emitido por 'BehaviorSubject'
                    if (!isLoggedIn) {
                        this._router.navigate(['/index'], { queryParams: { returnUrl: state.url } }); // Y si no está conectado, navegaremos a la pantalla de inicio => home
                        return false;
                    }
                    return true;
                })
            )
    }
}