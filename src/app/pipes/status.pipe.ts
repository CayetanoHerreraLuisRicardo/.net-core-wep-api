import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {
    transform(value: boolean): String {
        return value ? 'Activo' : 'Inactivo'
    }
}