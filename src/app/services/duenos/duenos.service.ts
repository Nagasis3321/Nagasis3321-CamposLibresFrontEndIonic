import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

import { Injectable, computed, inject, signal } from '@angular/core';
import {
  GetDuenoResponse,
  PostDuenoResponse,
} from '../../services/duenos/interfaces/index';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DuenosService {
  http = inject(HttpClient);
  public _duenos = signal<GetDuenoResponse[]>([]);
  public duenos = computed(() => this._duenos());
  constructor() {
    this.getDuenos().subscribe();
  }

  getDuenos(): Observable<GetDuenoResponse[]> {
    const url = `${enviroment.baseUrl}/duenos`; // Assuming 'environment' is imported correctly
    return this.http.get<GetDuenoResponse[]>(url).pipe(
      tap((duenos: GetDuenoResponse[]) => {
        this._duenos.set(duenos);
      })
    );
  }

  getDueno(idAnimal: string): Observable<GetDuenoResponse> {
    const url = `${enviroment.baseUrl}/animal/:${idAnimal}`; // Assuming 'environment' is imported correctly
    return this.http.get<GetDuenoResponse>(url);
  }

  postDueno(
    dni: string,
    apellido: string,
    nombre: string,
    abreviatura: string
  ): Observable<PostDuenoResponse> {
    const url = `${enviroment.baseUrl}/duenos`; // Assuming 'environment' is imported correctly
    const body = {
      dni: dni,
      apellido: apellido,
      nombre: nombre,
      abreviatura: abreviatura,
    };

    return this.http.post<PostDuenoResponse>(url, body).pipe(
      tap((newDueno: PostDuenoResponse) => {
        this._duenos.update((duenos: GetDuenoResponse[]) => [
          ...duenos,
          newDueno,
        ]);
      })
    );
  }

  deleteDueno(id: String): Observable<any> {
    const url = `${enviroment.baseUrl}/duenos/:${id}`; // Assuming 'environment' is imported correctly
    return this.http.delete(url).pipe(
      tap(() => {
        // Después de que la eliminación sea exitosa, actualiza la señal _duenos
        this._duenos.update((duenos: GetDuenoResponse[]) =>
          duenos.filter((dueno) => dueno._id !== id)
        );
      })
    );
  }
}
