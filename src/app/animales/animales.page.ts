import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonCheckbox,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';
import { add, document, cogOutline, caretForwardOutline } from 'ionicons/icons';
import { AnimalesService } from '../services/animales/animales.service';
import { IdPelajePipe } from './Pipes/id-pelaje.pipe';
import { addIcons } from 'ionicons';
import { DniDuenoPipe } from './Pipes/dni-dueno.pipe';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IdPelajePipe,
    DniDuenoPipe,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonList,
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList,
    IonCheckbox,
    IonGrid,
    IonCol,
    IonRow,
  ],
})
export class AnimalesPage implements OnInit {
  animalesServices = inject(AnimalesService);
  public animales = computed(() => this.animalesServices._animales());

  constructor() {
    addIcons({ add, cogOutline, caretForwardOutline });
  }

  ngOnInit() {}
}
