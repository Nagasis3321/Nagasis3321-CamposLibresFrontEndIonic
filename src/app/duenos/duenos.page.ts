import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonButton,
  IonFab,
  IonFabButton,
  IonAlert,
  IonIcon,
  IonFabList,
  IonInput,
  IonSearchbar,
  IonCheckbox,
  AlertController,
} from '@ionic/angular/standalone';
import { DuenosService } from '../services/duenos/duenos.service';
import { Dueno } from '../services/duenos/interfaces/dueno';
import { addIcons } from 'ionicons';
import {
  add,
  trashOutline,
  caretForwardOutline,
  cogOutline,
} from 'ionicons/icons';
import Swal from 'sweetalert2';
import { GetDuenoResponse } from '../services/duenos/interfaces';
import { FilterOwnersPipe } from './Pipes/filter-owners.pipe';

@Component({
  selector: 'app-duenos',
  templateUrl: './duenos.page.html',
  styleUrls: ['./duenos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonFabList,
    IonSearchbar,
    IonHeader,
    IonTitle,
    IonAlert,
    IonToolbar,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonButton,
    IonFab,
    IonInput,
    IonFabButton,
    IonIcon,
    IonCheckbox,
    CommonModule,
    FormsModule,
    FilterOwnersPipe,
  ],
})
export class DuenosPage implements OnInit {
  duenosServices = inject(DuenosService);
  public duenos = computed(() => this.duenosServices._duenos());

  //search
  query: string = '';
  /*Local Variables*/
  newOwner: Dueno = {
    dni: '',
    nombre: '',
    apellido: '',
    abreviatura: '',
  };
  addingOwner = false;
  confOwner: boolean = false;

  // En tu componente, crea un nuevo array para rastrear los dueños seleccionados
  selectedOwners: Dueno[] = [];

  constructor(private alertController: AlertController) {
    addIcons({ add, trashOutline, caretForwardOutline, cogOutline });
  }

  ngOnInit() {}

  handleInput(event: any) {
    this.query = event.target.value.toLowerCase();
  }

  saveOwner() {
    this.duenosServices
      .postDueno(
        this.newOwner.dni,
        this.newOwner.apellido,
        this.newOwner.nombre,
        this.newOwner.abreviatura
      )
      .subscribe({
        next: () => {
          this.presentAlert(
            'User created successfully',
            'DNI: ' + this.newOwner.dni,
            '',
            'OK'
          );
          this.clearInputs();
          this.addOwner();
        },
        error: (menssage) => {},
      });
  }

  addOwner() {
    this.addingOwner = !this.addingOwner;
  }

  clearInputs() {
    this.newOwner = {
      dni: '',
      nombre: '',
      apellido: '',
      abreviatura: '',
    };
  }

  async presentAlert(
    title: string,
    subHeader?: string,
    message?: string,
    button?: string
  ) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subHeader,
      message: message,
      buttons: [`${button}`],
    });
    await alert.present();
  }

  //DELETE OWNER
  // Función para manejar el cambio de estado del checkbox
  toggleSelection(dueno: Dueno) {
    const index = this.selectedOwners.indexOf(dueno);
    if (index === -1) {
      // Si el dueño no está en el array, lo añades
      this.selectedOwners.push(dueno);
    } else {
      // Si el dueño ya está en el array, lo quitas
      this.selectedOwners.splice(index, 1);
    }
  }

  // Función para recoger los IDs de los dueños seleccionados y enviarlos al servicio
  deleteSelectedOwners() {
    const selectedOwnerIds = this.selectedOwners.map((dueno) => dueno._id);
    console.log(selectedOwnerIds);
    if (selectedOwnerIds.length > 0) {
      for (const OwersId of selectedOwnerIds) {
        this.duenosServices.deleteDueno(OwersId!).subscribe(() => {
          this.duenos = computed(() => this.duenosServices._duenos());
        });
      }
    } else {
      this.presentAlert(
        'Dueños not selected',
        'select dueños and try again',
        '',
        'OK'
      );
    }
  }

  editOwners() {
    const selectedOwnerIds = this.selectedOwners.map((dueno) => dueno._id);
    if (selectedOwnerIds.length === 1) {
    } else {
      this.presentAlert(
        'Only one owner can be modified at the same time.',
        'deselect dueños and try again',
        '',
        'OK'
      );
    }
  }
}
