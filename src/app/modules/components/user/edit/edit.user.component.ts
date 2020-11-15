// Angular
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// Dependencias de terceros
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// Dependencias propias v1.0.1
import { SuccessResponse, SuccessResponseUser, UserRequest, UserResponse, UsersService as API } from 'ng-slabon-api-client';
// Servicios
import { ValidatorService, ChangesService, CollectionsService, UserService, ErrorService } from '../../../../services';
// Modelos
import { Modal, Select } from '../../../../models'
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
    selector: 'popup-edit',
    templateUrl: './edit.user.component.html'
})
export class EditComponent implements OnInit, OnDestroy {
    // Referencia del modal
    private modalRef: BsModalRef;
    // Formumario
    public form: FormGroup;
    // Bandera loading...
    public bLoading = false;
    // Objeto User
    public oUser: UserResponse;
    // Configuraciones para el Modal
    private oConfig: Modal;
    // Arreglo Genero
    public lstGender: Array<Select> = [];
    // Decorador para inyectar la referencia #editUser a nuestro componente
    @ViewChild('editUser') private tmpUpdate: TemplateRef<any>;
    // objeto subscripción mismo que servira para des-suscribirse
    subscription: Subscription;
    private unsubscribe$: Subject<any> = new Subject<any>();
    /**
     * @summary Metodo constructor del componente
     * @param _form Manejo de formularios reactivos
     * @param _modal Uso de ventanas modales
     * @param _validator Validador de formularios
     * @param _alert Manejo de mensajes de alerta
     * @param _collection Colleciones staticas
     * @param _user validaciones especificos de usuarios
     * @param _api Cliente API
     * @param _error Imprime los errores
     * @param _change Cambios de estado
     */
    constructor(
        private _form: FormBuilder,
        private _modal: BsModalService,
        private _validator: ValidatorService,
        private _alert: ToastrService,
        private _collection: CollectionsService,
        private _user: UserService,
        private _api: API,
        private _error: ErrorService,
        private _change: ChangesService,
        private _spinner: NgxSpinnerService
    ) { }
    /**
     * @summary Ejecutado seguido del metodo contructor
     */
    ngOnInit() {
        this.subscription = this._change.openEdit.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(value => {
            if (value > 0) {
                this._spinner.show();
                this.oConfig = this._collection.getConfig();
                this.lstGender = this._collection.getGenders();
                this._api.getById(value).subscribe(
                    (success: SuccessResponseUser) => {
                        this.oUser = success.data;
                        this.startForm(this.oUser);
                    },
                    (error: HttpErrorResponse) => {
                        this._error.printErrors(error);
                        this._spinner.hide();
                    })
            }
        });
    }
    ngOnDestroy() {
        this._change.changeEdit(0);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.subscription.unsubscribe();
    }
    /**
     * @summary Crea nuestro formulario de user, inicializa sus valores y validaciones.
     */
    private startForm = (o: UserResponse): void => {
        this.form = this._form.group({
            userName: [o.userName, [Validators.required, Validators.minLength(7), Validators.maxLength(50)]],
            idGender: [o.gender, [Validators.required]],
            email: [o.email, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
            confirmPassword: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
        });
        this._spinner.hide();
        this.modalRef = this._modal.show(this.tmpUpdate, this.oConfig);
    }
    /**
     * @summary Cierra la ventana modal abierta
     */
    private btnClose = (): void => {
        this.resetUpdate();
        this.modalRef.hide();
    }
    /**
     * @summary Acción de actualizar datos del usuario
     */
    public btnUpdate = (): void => {
        this._validator.validateFields(this.form);
        this._spinner.show();
        this.bLoading = true;
        if (this.isValidForm()) {
            let oBody: UserRequest = {
                pkuserId: this.oUser.pkuserId,
                email: this.form.controls['email'].value,
                userName: this.form.controls['userName'].value,
                password: this.form.controls['password'].value,
                gender: this.form.controls['idGender'].value,
            }
            this._api.apiUsersIdPut(oBody.pkuserId, oBody).subscribe(
                (data: SuccessResponse) => {
                    setTimeout(() => {
                        this._change.changeGrid(true);
                        this.btnClose();
                        this.bLoading = false;
                        this._spinner.hide();
                        this._alert.success(data.message);
                    }, 300);
                },
                (error: HttpErrorResponse) => {
                    this.bLoading = false;
                    this._spinner.hide();
                    this.btnClose();
                    this._error.printErrors(error);
                },
                () => {
                    this.bLoading = false;
                    this._spinner.hide();
                }
            );
        }
        else {
            this.bLoading = false;
            this._spinner.hide();
            this._alert.error("Formulario inválido");
        }
    }
    /**
     * @summary Resetear el formulario
     */
    private resetUpdate = (): void => {
        this.form.reset();
    }
    /**
       * @summary Validar si el formulario  es valido
       */
    public isValidForm = (): boolean => {
        let bSelectInvalid = this._validator.isSelectInvalid(this.form);
        if (this.form.valid && !this._user.errorCssEmail('email', this.form) && this._user.passwordsMatch(this.form) && !bSelectInvalid) {
            return true;
        }
        return false;
    }
}