// Angular
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Dependencias de terceros
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// Dependencias propias v1.0.1
import { SuccessResponseUser, UserRequest, UsersService as API } from 'ng-slabon-api-client';
// Servicios
import { ValidatorService, AuthService, ChangesService, CollectionsService, UserService, ErrorService } from '../../../../services';
// Modelos
import { Modal } from '../../../../models'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'popup-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class RegistryComponent {
  // Referencia del modal
  private moRegistry: BsModalRef;
  // Configuraciones para el Modal
  private oConfig: Modal;
  // Bandera loading...
  public bLoading: boolean = false;
  // Variable para Formumario
  public fgRegistry: FormGroup;
  // Arreglo Genero
  public lstGender: any[] = [];
  // Observable estaLogueado?
  public isLoggedIn$: Observable<boolean>;
  // Bandera para elegir el html a mostrar: Usuario nuevo que se quiere registrar y usuario que quiere registrar un nuevo usuario.
  public ruta = "";
  // Decorador para inyectar la referencia #registry a nuestro componente
  @ViewChild('registry') private tmpRegistry: TemplateRef<any>;
  /**
  * @param _modal Uso de ventanas modales
  * @param _form Manejo de formularios reactivos
  * @param _alert Servicio de mensajes de alerta
  * @param _collection Colleciónes estáticas
  * @param _validator Validador de formularios
  * @param _auth Servicio para el login de la aplicación
  * @param _spinner Loading ... en peticiones http
  * @param _change Comunicación con otros componentes
  * @param _user Comunicación con otros componentes
  * @param _api Servicio swagger
  * @param _error Imprime los errores mandados por la API
  */
  constructor(
    private _modal: BsModalService,
    private _form: FormBuilder,
    private _alert: ToastrService,
    private _collection: CollectionsService,
    private _validator: ValidatorService,
    private _auth: AuthService,
    private _spinner: NgxSpinnerService,
    private _change: ChangesService,
    private _user: UserService,
    private _api: API,
    private _error: ErrorService,
    private _router: Router
  ) {
  }
  ngOnInit(): void {
    this.oConfig = this._collection.getConfig();
    this.lstGender = this._collection.getGenders();
    this.isLoggedIn$ = this._auth.isLoggedIn;
    this.createRegistryForm();
    this._change.openRegistry.subscribe(show => {
      if (show === true) {
        this.ruta = this._router.routerState.snapshot.url;
        this.createRegistryForm()
        this.moRegistry = this._modal.show(this.tmpRegistry, this.oConfig);
        this.fgRegistry.controls['idGender'].setValue(0);
      }
    });
  }
  /**
 * @summary Función que es accionado desde el menu para abrir el modal de login
 * @param _template => referencia del template-modal a abrir
 */
  public btnOpenRegistry = (_template: TemplateRef<any>): void => {
    this.moRegistry = this._modal.show(_template, this.oConfig);
  }
  /**
   * @summary Función que crea el formulario de Recuperar contraseña
   */
  public createRegistryForm = (): void => {
    this.fgRegistry = this._form.group({
      userName: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(50)]],
      idGender: [0, [Validators.required]],
      email: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    });
  }
  /**
   * @summary Función que cierra y resetea el modal de pre-registro
   */
  public btnCloseRegistry = (): void => {
    this.fgRegistry.reset();
    this.moRegistry.hide();
  }
  /**
   * @summary Función que acciona el formulario de pre-registro
   */
  public bntRegister = (): void => {
    this.bLoading = true;
    this._validator.validateFields(this.fgRegistry);
    if (this.isValidRegistry()) {
      let body: UserRequest = {
        pkuserId: 0,
        userName: this.fgRegistry.controls.userName.value,
        email: this.fgRegistry.controls.email.value,
        password: this.fgRegistry.controls.password.value,
        gender: this.fgRegistry.controls.idGender.value
      };
      this._spinner.show();
      this._api.apiUsersPost(body).subscribe(
        (res: SuccessResponseUser) => {
          this._spinner.hide();
          this.bLoading = false;
          this.btnCloseRegistry();
          this._alert.success(res.message);
          if (this.ruta === "/user") {
            this._change.changeGrid(true);
          } else {
            this._change.changeHome(true);
          }
        },
        (error: any) => {
          this._spinner.hide();
          this.bLoading = false;
          this._error.printErrors(error);
        }, () => {
          this.bLoading = false;
          this._spinner.hide();
        });
    }
    else {
      this.bLoading = false;
      this._alert.error("Formulario inválido");
    }
  }
  /**
   * @summary Validar si el formulario  es valido
   */
  public isValidRegistry = (): boolean => {
    let result = false;
    let bSelectInvalid = this._validator.isSelectInvalid(this.fgRegistry);
    if (this.fgRegistry.valid && !this._user.errorCssEmail('email', this.fgRegistry) && this._user.passwordsMatch(this.fgRegistry) && !bSelectInvalid) {
      result = true;
    }
    return result;
  }
  /**
   * @summary Función que es accionado desde el menu para abrir el modal de login
   */
  public btnOpenLogin = (): void => {
    this.btnCloseRegistry();
    this._change.changeLogin(true);
  }
}