// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// Dependencias de terceros
import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { ToastrService } from 'ngx-toastr';
// Deepndencia propia 1.0.1
import { UsersService as API, SuccessResponseUsers, UserResponse } from 'ng-slabon-api-client';
// Servicios
import { UtilsService, ErrorService, ChangesService, CookiesService } from '../../../../services';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'grid-view',
    templateUrl: 'grid-view.component.html',
    styleUrls: ['./grid-view.component.css'],
})
export class GridViewComponent implements OnInit, OnDestroy {
    // Data grid de kendo para rellenar la tabla con un objeto json
    public gridData: GridDataResult;
    // Json a procesar el kendo
    private oData: any = [];
    // KENDO paginación
    public state: State = {
        skip: 0,
        take: 10,
    };
    // KENDO filtros
    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.oData, this.state);
    }
    // Objeto User
    public oUser: UserResponse;
    // objeto suscriptor
    subscription: Subscription;
    public position: 'top' | 'bottom' | 'both' = 'top';
    /**
     * @summary Metodo constructor del componente
     * @param _alert Manejo de mensajes de alerta
     * @param _utils Utilerias de la app
     * @param _api Cliente API
     * @param _error Imprime los errores
     * @param _change Cambios de estado
     */
    constructor(
        private _alert: ToastrService,
        private _utils: UtilsService,
        private _api: API,
        private _error: ErrorService,
        private _change: ChangesService,
        private _cookies: CookiesService
    ) { }
    /**
     * @summary Ejecutado seguido del metodo contructor
     */
    ngOnInit() {
        this.subscription = this._change.loadGrid.subscribe(message => {
            if (message) {
                this._api.apiUsersGet().subscribe(
                    (data: SuccessResponseUsers) => {
                        this.oData = data.data;
                        if (this.oData.length === 0) {
                            this._alert.info("No hay usuarios registrados");
                        }
                        this.state.skip = 0;
                        this.gridData = process(this.oData, this.state);
                    },
                    (error: HttpErrorResponse) => {
                        this._error.printErrors(error);
                    },
                    () => {
                    }
                );
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @summary Se ejecuta cada que se da click a un botón (usado para cargar los datos del elemento seleccionado del kendo-grid en la ventana modal)
     * @param Object del Kendo-grid seleccionado
     */
    public actionHandler = ({ sender, rowIndex, dataItem }): void => {
        this.oUser = dataItem;
    }
    /**
     * @summary Abre el modal 'update'
     */
    public btnUpdateModal = (): void => {
        this._change.changeEdit(this.oUser.pkuserId);
    }
    /**
     * @summary Abre el modal 'delete'
     */
    public btnDeleteModal = (): void => {
        if (this.oUser.pkuserId !== this._cookies.getUserId())
            this._change.changeDelete(this.oUser);
        else
            this._alert.info("No te puedes eliminar a ti mismo");
    }
    /**
     * @summary Exportar datos a excel aplicando el filtro actual
     */
    public excelWithFlter = (): ExcelExportData => {
        return this._utils.dataWithFilter(this.oData, this.state.filter);
    }
    /**
     * @summary Abirir el modal de registrar usuario
     */
    public onClick = (): void => {
        this._change.changeRegistry(true);
    }
    /**
     * @summary Para aplicar un style a la columna status del grid
     * @param Contexto o culumna a modificar style
     */
    public rowClassCallback = (context: RowClassArgs) => {
        switch (context.dataItem.status) {
            case true:
                return { "activo": true };
            case false:
                return { "inactivo": true };
            default:
                return {};
        }
    }
}