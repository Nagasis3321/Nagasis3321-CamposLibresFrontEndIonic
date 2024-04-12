import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dniDueno',
  standalone: true,
})
export class DniDuenoPipe implements PipeTransform {
  transform(dniDueno: string): string {
    switch (dniDueno) {
      case '43266572':
        return 'IT';
        break;
      case '1790189':
        return 'JT';
        break;
      default:
        return 'Desconocido';
    }
  }
}
