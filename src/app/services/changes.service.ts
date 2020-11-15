// Angular
import { Injectable } from '@angular/core';
import { UserResponse } from 'ng-slabon-api-client';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ChangesService {
    private modalRegistry = new BehaviorSubject<boolean>(false);
    public openRegistry = this.modalRegistry.asObservable();

    private modalLogin = new BehaviorSubject<boolean>(false);
    public openLogin = this.modalLogin.asObservable();

    private usersGrid = new BehaviorSubject<boolean>(true);
    public loadGrid = this.usersGrid.asObservable();

    private modalEditUser = new BehaviorSubject<number>(0);
    public openEdit = this.modalEditUser.asObservable();

    private modalDeleteUser = new BehaviorSubject<UserResponse>(null);
    public openDelete = this.modalDeleteUser.asObservable();

    private usersHome = new BehaviorSubject<boolean>(true);
    public loadHome = this.usersHome.asObservable();
    constructor() { }
    /**
     * @summary registrar el cambio de abrir el modal de registro
     */
    changeRegistry(_show: boolean) {
        this.modalRegistry.next(_show)
    }
    /**
     * @summary registrar el cambio de abrir modal de login
     */
    changeLogin(_show: boolean) {
        this.modalLogin.next(_show)
    }
    /**
     * @summary registrar el cambio del Grid de usuarios
     */
    changeGrid(_value: boolean) {
        this.usersGrid.next(_value)
    }
    /**
     * @summary registrar el cambio del Grid de usuarios
     */
    changeEdit(_id: number) {
        this.modalEditUser.next(_id);
    }
    /**
     * @summary registrar el cambio del Grid de usuarios
     */
    changeDelete(_model: UserResponse) {
        this.modalDeleteUser.next(_model);
    }
    /**
     * @summary registrar el cambio del home de usuarios
     */
    changeHome(_value: boolean) {
        this.usersHome.next(_value);
    }
}