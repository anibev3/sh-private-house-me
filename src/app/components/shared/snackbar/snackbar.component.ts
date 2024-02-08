import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  template: `
    <div class="snackbar-toast" [ngClass]="alertClass" *ngIf="isVisible">
      <i [class]="iconClass"></i>{{ message }}
    </div>
  `,
  styles: [
    `
      .snackbar-toast {
        /* Styles communs pour votre alerte */
      }
      /* Ajoutez des styles spécifiques pour différentes couleurs si nécessaire */
      .bg-green1-dark {
        background-color: green;
      }
      .bg-red-dark {
        background-color: red;
      }
      /* Ajoutez d'autres styles au besoin */
    `,
  ],
})
export class CustomAlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() color: string = '';
  @Input() icon: string = '';
  @Input() duration: number = 5000; // Durée par défaut en millisecondes

  isVisible: boolean = true;
  alertClass: string = '';

  get iconClass(): string {
    return `fa ${this.icon} mr-3`;
  }

  ngOnInit(): void {
    this.alertClass = `color-white text-center ${this.color}`;
    this.autoClose();
  }

  autoClose(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
}
