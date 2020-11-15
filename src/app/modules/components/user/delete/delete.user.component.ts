// Angular
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// Dependencias de terceros
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// Dependencias propias v1.0.1
import { SuccessResponse, UserResponse, UsersService as API } from 'ng-slabon-api-client';
// Servicios
import { ChangesService, ErrorService } from '../../../../services';
// Modelos
import { Modal } from '../../../../models'
@Component({
    selector: 'popup-delete',
    templateUrl: './delete.user.component.html'
})
export class DeleteComponent implements OnInit, OnDestroy {
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
    // Decorador para inyectar la referencia #registry a nuestro componente
    @ViewChild('deleteUser') private tmpDelete: TemplateRef<any>;
    // objeto subscripción 
    subscription: Subscription;
    private unsubscribe$: Subject<any> = new Subject<any>();
    /**
     * @summary Metodo constructor del componente
     * @param _modal Uso de ventanas modales
     * @param _alert Manejo de mensajes de alerta
     * @param _api Cliente API
     * @param _error Imprime los errores
     * @param _change Cambios de estado
     * @param _spinner Loading ...
     */
    constructor(
        private _modal: BsModalService,
        private _alert: ToastrService,
        private _api: API,
        private _error: ErrorService,
        private _change: ChangesService,
        private _spinner: NgxSpinnerService
    ) { }
    /**
     * @summary Ejecutado seguido del metodo contructor
     */
    ngOnInit() {
        this.subscription = this._change.openDelete.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(value => {
            if (value !== null) {
                this._spinner.show();
                this.oUser = value;
                this.start();
            }
        });
    }
    /**
     * @summary Para des-suscribirnos 
     */
    ngOnDestroy() {
        this._change.changeDelete(null);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.subscription.unsubscribe();
    }
    /**
     * @summary Iniciamos nuestra modal
     */
    private start = (): void => {
        setTimeout(() => {
            this._spinner.hide();
            this.modalRef = this._modal.show(this.tmpDelete, this.oConfig);
        }, 300);
    }
    /**
     * @summary Cierra la ventana modal abierta
     */
    public btnClose = (): void => {
        this.modalRef.hide();
    }
    /**
     * @summary Acción de eliminar usuario
     */
    public btnDelete = (): void => {
        this.bLoading = true;
        this._spinner.show();
        this._api.apiUsersIdDelete(this.oUser.pkuserId).subscribe(
            (data: SuccessResponse) => {
                this._alert.success(data.message);
                this.bLoading = false;
                this._spinner.hide();
                this.modalRef.hide();
                this._change.changeGrid(true);
            },
            (error: any) => {
                this.bLoading = false;
                this.modalRef.hide();
                this._error.printErrors(error);
                this._spinner.hide();
            },
            () => {
                this._spinner.hide();
            }
        );
    }
}