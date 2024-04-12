import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idPelaje',
  standalone: true,
})
export class IdPelajePipe implements PipeTransform {
  transform(idpelaje: string): string {
    switch (idpelaje) {
      case '1':
        return 'Valla';
        break;
      case '2':
        return 'Colorada';
        break;
      case '3':
        return 'Pampa Colorada';
        break;
      case '4':
        return 'Pampa Valla';
        break;
      default:
        return 'Desconocido';
    }
  }
}
