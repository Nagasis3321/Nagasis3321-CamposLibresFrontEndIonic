import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonMenuButton,
  IonContent,
  IonButtons,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonMenuButton,
    IonContent,
    IonButtons,
    RouterLink,
  ],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    // Aquí puedes agregar la lógica que necesites ejecutar cuando se inicializa el componente
    console.log('El componente se ha inicializado.');
  }
}
