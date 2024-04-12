import { Pipe, PipeTransform } from '@angular/core';
import { GetDuenoResponse } from 'src/app/services/duenos/interfaces';

@Pipe({
  name: 'filterOwners',
  standalone: true,
})
export class FilterOwnersPipe implements PipeTransform {
  transform(duenos: GetDuenoResponse[], query: string): GetDuenoResponse[] {
    if (!query) {
      return duenos;
    }
    return duenos.filter(
      (d) => d.apellido.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }
}
