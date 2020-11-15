// import { Injectable} from '@angular/core';
import { MessageService } from '@progress/kendo-angular-l10n';

const messages = {
    'kendo.grid.noRecords': 'No hay registros',
    'kendo.grid.groupPanelEmpty': 'No hay datos disponibles',
    'kendo.grid.pagerFirstPage': 'Ir a la primera página',
    'kendo.grid.pagerPreviousPage': 'Ir a la página anterior',
    'kendo.grid.pagerNextPage': 'Ir a la página siguiente',
    'kendo.grid.pagerLastPage': 'Ir a la última página',
    'kendo.grid.pagerPage': 'Página',
    'kendo.grid.pagerOf': 'de',
    'kendo.grid.pagerItems': 'registros',
    'kendo.grid.pagerItemsPerPage': 'registros por página',
    'kendo.grid.filterEqOperator': 'Es igual a',
    'kendo.grid.filterNotEqOperator': 'No es igual a',
    'kendo.grid.filterIsNullOperator': 'Es nulo',
    'kendo.grid.filterIsNotNullOperator': 'No es nulo',
    'kendo.grid.filterIsEmptyOperator': 'Está vacío',
    'kendo.grid.filterIsNotEmptyOperator': 'No está vacío',
    'kendo.grid.filterStartsWithOperator': 'Comienza con',
    'kendo.grid.filterContainsOperator': 'Contiene',
    'kendo.grid.filterNotContainsOperator': 'No contiene',
    'kendo.grid.filterEndsWithOperator': 'Termina en',
    'kendo.grid.filterGteOperator': 'Es mayor o igual que',
    'kendo.grid.filterGtOperator': 'Es mayor que',
    'kendo.grid.filterLteOperator': 'Es menor o igual que',
    'kendo.grid.filterLtOperator': 'Es menor o igual que',
    'kendo.grid.filterIsTrue': 'Sí',
    'kendo.grid.filterIsFalse': 'No',
    'kendo.grid.filterBooleanAll': '(Todas)',
    'kendo.grid.filterAfterOrEqualOperator': 'Es posterior o igual a',
    'kendo.grid.filterAfterOperator': 'Es posterior',
    'kendo.grid.filterBeforeOperator': 'Es anterior',
    'kendo.grid.filterBeforeOrEqualOperator': 'Es anterior o igual a',
    'kendo.numerictextbox.increment': 'Incrementar valor',
    'kendo.numerictextbox.decrement': 'Disminuir valor',
    'kendo.dateinput.increment': 'Incrementar valor',
    'kendo.dateinput.decrement': 'Disminuir valor',
    'kendo.calendar.today': 'Hoy',
    'kendo.datepicker.today': 'Hoy',
    'kendo.datepicker.toggle': 'Toggle calendar',
    'kendo.slider.increment': 'Incrementar valor',
    'kendo.slider.decrement': 'Disminuir valor',
    'kendo.slider.dragHandle': 'drag',
    'kendo.switch.on': 'On',
    'kendo.switch.off': 'Off',
};

// @Injectable()
export class KendoMessageService extends MessageService {
    public get(key: string): string {
        return messages[key];
    }
}
