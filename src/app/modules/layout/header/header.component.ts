// Angular
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
// Dependencias
import { BsModalService } from 'ngx-bootstrap/modal';
// Servicios
import { AuthService, ChangesService } from '../../../services';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  // Observable booleano para saber si esta logueado
  public isLoggedIn$: Observable<boolean>;
  // Observable string para email del usuario
  public strUserName$: Observable<string>;
  constructor(
    private _auth: AuthService,
    private _spinner: NgxSpinnerService,
    private _change: ChangesService,
  ) { }
  ngOnInit(): void {
    this.isLoggedIn$ = this._auth.isLoggedIn;
    this.strUserName$ = this._auth.userName;
  }
  /**
   * @summary Evento del boton cerrar sesión
   */
  public btnSingOff(): void {
    this._spinner.show();
    this._auth.logout();
    setTimeout(() => {
      this._spinner.hide();
    }, 300);
  }
  public btnOpenLogin(): void {
    this._change.changeLogin(true);
  }
  public btnOpenRegistry(): void {
    this._change.changeRegistry(true);
  }
}