import { Injectable } from '@angular/core';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
@Injectable()
export class UtilsService {
    constructor() { }
    /**
     * @summary Exportar solo los datos que aplique al filtro del kendo-grind a formato excel.
     * @param  _data => conjunto de datos a procesar para exportar el excel
     * @param _filter => filtro aplicado al kendo-grid
     * @returns Archivo en excel
     */
    public dataWithFilter(_data: any, _filter: any): ExcelExportData {
        const result: ExcelExportData = {
            data: process(_data, { filter: _filter }).data
        }
        return result;
    }
}