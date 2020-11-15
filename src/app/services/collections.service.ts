// Angular
import { Injectable } from '@angular/core';
// Modelos
import { Modal, Select } from "../models";
@Injectable()
export class CollectionsService {
    constructor() { }
    /**
     * @summary Data de la configuracion de una ventana modal
     * @returns Objecto de typo Modal
     */
    public getConfig(): Modal {
        const oConfig: Modal = {
            animated: true,
            keyboard: false,
            backdrop: true,
            ignoreBackdropClick: true,
            class: 'modal-md'
        }
        return oConfig;
    }
    /**
     * @summary Data que tendra el combo género
     * @returns Arreglo genero
     */
    public getGenders(): Select[] {
        const lstType: Select[] = [
            {
                id: "M",
                name: 'MASCULINO'
            },
            {
                id: "F",
                name: 'FEMENINO'
            }]
        return lstType;
    }
}