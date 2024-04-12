import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from 'src/environments/environments';
import { Observable, tap } from 'rxjs';
import {
  postAnimalResponse,
  GetAnimalResponse,
  updateAnimalResponse,
  postAnimal,
} from './interfaces/index';
@Injectable({
  providedIn: 'root',
})
export class AnimalesService {
  http = inject(HttpClient);
  public _animales = signal<GetAnimalResponse[]>([]);
  public animales = computed(() => this._animales());

  constructor() {
    this.getAnimales().subscribe();
  }

  getAnimales(): Observable<GetAnimalResponse[]> {
    const url = `${enviroment.baseUrl}/animales`; // Assuming 'environment' is imported correctly
    return this.http.get<GetAnimalResponse[]>(url).pipe(
      tap((animales: GetAnimalResponse[]) => {
        this._animales.set(animales);
      })
    );
  }

  getAnimal(idAnimal: string): Observable<GetAnimalResponse> {
    const url = `${enviroment.baseUrl}/animal/:${idAnimal}`; // Assuming 'environment' is imported correctly
    return this.http.get<GetAnimalResponse>(url);
  }

  postAnimal(
    dniDueno: string,
    idPelaje: string,
    idCaravana: string,
    sexo: string,
    edad: string
  ): Observable<postAnimalResponse> {
    const url = `${enviroment.baseUrl}/task/advanced`; // Assuming 'environment' is imported correctly
    const body = {
      dniDueno: dniDueno,
      idPelaje: idPelaje,
      idCaravana: idCaravana,
      sexo: sexo,
      edad: edad,
    };

    return this.http.post<postAnimalResponse>(url, body).pipe(
      tap((newAnimal: postAnimalResponse) => {
        this._animales.update((animales: GetAnimalResponse[]) => [
          ...animales,
          newAnimal,
        ]);
      })
    );
  }

  patchAnimal(animalModify: postAnimal) {
    const url = `${enviroment.baseUrl}/animales/:${animalModify.idAnimal}`;

    const body = {
      dniDueno: animalModify.dniDueno,
      idPelaje: animalModify.idPelaje,
      idCaravana: animalModify.idCaravana,
      sexo: animalModify.sexo,
      edad: animalModify.edad,
    };

    this.http.patch<postAnimalResponse>(url, body).subscribe(
      () => {
        this.fetchAnimalsAndUpdate(animalModify.idAnimal);
      },
      (error) => {
        console.error('Error updating Animal:', error);
      }
    );
  }

  private fetchAnimalsAndUpdate(animalId: string) {
    const url = `${enviroment.baseUrl}/animal/${animalId}`;
    this.http.get<GetAnimalResponse>(url).subscribe(
      (updatedAnimal: GetAnimalResponse) => {
        // Update the tasks signal with the updated task
        this._animales.update((animales: GetAnimalResponse[]) => {
          // Find the index of the task to update
          const index = animales.findIndex(
            (animal) => animal._id === updatedAnimal._id
          );
          // Replace the old task with the updated task
          animales[index] = updatedAnimal;
          return animales;
        });
      },
      (error) => {
        console.error('Error fetching updated animal:', error);
      }
    );
  }
}
