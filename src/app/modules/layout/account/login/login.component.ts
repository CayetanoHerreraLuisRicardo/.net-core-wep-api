// Angular
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// Dependencias de terceras
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
// Dependencias propias v1.0.1
import { AuthService as API, LoginRequest, SuccessResponseLogin } from 'ng-slabon-api-client';
// Servicios
import { CookiesService, ValidatorService, ChangesService, AuthService, CollectionsService, ErrorService } from '../../../../services';
// Modelos
import { Modal } from '../../../../models'
import { Router } from '@angular/router';
@Component({
  selector: 'popup-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  // Referencia del modal
  private moLogin: BsModalRef;
  // Configuraciones para el Modal
  private oConfig: Modal;
  // Bandera loading...
  private bLoading: boolean = false;
  // Variable para Formumario
  public fgLogin: FormGroup;
  // Observable booleano para saber si esta logueado
  public isLoggedIn$: Observable<boolean>;
  @ViewChild('login') private tmpLogin: TemplateRef<any>;
  /**
  * @param _modal Uso de ventanas modales
  * @param _form Manejo de formularios reactivos
  * @param _api Nuestra API client
  * @param _auth Servicio para el login de la aplicación
  * @param _alert Servicio de mensajes de alerta
  * @param _cookie Servicio para extraer los datos de cookie
  * @param _collection Colleciónes estáticas
  * @param _validator Validador de formularios
  * @param _spinner Loading ... en peticiones http
  * @param _change Comunicación con otros componentes
  * @param _error Imprime los errores mandados por la API
  */
  constructor(
    private _modal: BsModalService,
    private _form: FormBuilder,
    private _api: API,
    private _auth: AuthService,
    private _alert: ToastrService,
    private _cookie: CookiesService,
    private _collection: CollectionsService,
    private _validator: ValidatorService,
    private _spinner: NgxSpinnerService,
    private _change: ChangesService,
    private _error: ErrorService,
    private _router: Router
  ) {
  }
  ngOnInit(): void {
    this.oConfig = this._collection.getConfig();
    this.isLoggedIn$ = this._auth.isLoggedIn;
    this.createLoginForm();
    this._change.openLogin.subscribe(show => {
      if (show === true) {
        this.createLoginForm();
        this.fgLogin.reset();
        this.moLogin = this._modal.show(this.tmpLogin, this.oConfig);
      }
    });
  }
  /**
   * @summary Función que crea el formulario de Login
   */
  public createLoginForm = (): void => {
    this.fgLogin = this._form.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    });
  }
  /**
   * @summary Función que es accionado desde el menu para abrir el modal de login
   * @param _template => referencia del template-modal a abrir
   */
  public btnOpenLogin = (_template: TemplateRef<any>): void => {
    this.moLogin = this._modal.show(_template, this.oConfig);
  }
  /**
   * @summary Función que acciona el formulario de login para acceder como usuario
   */
  public btnSignIn = (): void => {
    this.bLoading = true;
    this._validator.validateFields(this.fgLogin);
    if (this.isValidLogin()) {
      // this._spinner.show();
      let body: LoginRequest = {
        userName: this.fgLogin.value.userName,
        password: this.fgLogin.value.password
      }
      this._api.apiAuthLoginPost(body).subscribe(
        (res: SuccessResponseLogin) => {
          // this._spinner.hide();
          this.bLoading = false;
          this.btnCloseLogin();
          this._cookie.saveToken(res.data);
          this._auth.login(true);
          this._alert.success(res.message);
          this._router.navigate(['/user']);
        },
        (error: HttpErrorResponse) => {
          // this._spinner.hide();
          this.bLoading = false;
          this._error.printErrors(error);
        }, () => {
          this.bLoading = false;
          this._spinner.hide();
        });
    } else {
      this.bLoading = false;
      this._alert.success("Formulario inválido");
    }
  }
  /**
   * @summary Validar si el formulario de login es válido
   */
  public isValidLogin = (): boolean => {
    let result = false;
    if (this.fgLogin.valid) {
      result = true;
    }
    return result;
  }
  /**
   * @summary Cerrar y Resetear el formulario Login
   */
  public btnCloseLogin = (): void => {
    this.fgLogin.reset();
    this.moLogin.hide();
  }
  /**
   * @summary Función que es accionado con el enlace para el registro
   */
  public btnOpenRegistry = (): void => {
    this.btnCloseLogin();
    this._change.changeRegistry(true);
  }
}