// Angular
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
// Dependencias de terceros
import { ToastrService } from 'ngx-toastr';
// Dependencia propia  v1.0.1
import { SuccessResponseUsers, UserResponse, UsersService as API } from 'ng-slabon-api-client';
import { ErrorService } from 'src/app/services/error.service';
import { Subscription } from 'rxjs';
import { ChangesService } from 'src/app/services';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Lista de usuarios
  public lstUsers: Array<UserResponse>;
  // objeto subscripción mismo que servira para des-suscribirse
  subscription: Subscription;
  /**
  * @param _api Servicio swagger
  * @param _alert Servicio de mensajes de alerta
  * @param _spinner Loading ... en peticiones http
  * @param _change Cambios de estado
  */
  constructor(
    private _api: API,
    private _alert: ToastrService,
    private _error: ErrorService,
    private _change: ChangesService,
    private _spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.subscription = this._change.loadHome.subscribe(message => {
      if (message) {
        this._spinner.show();
        this._api.apiUsersGet().subscribe(
          (res: SuccessResponseUsers) => {
            if (res.data.length === 0) {
              this._alert.info("No hay usuarios registrados");
            }
            this.lstUsers = res.data;
            this._spinner.hide();
          },
          (error: HttpErrorResponse) => {
            this._error.printErrors(error);
            this._spinner.hide();
          }
        )
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
