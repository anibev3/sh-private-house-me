// back-button.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  template: `
    <div
      class="snackbar-toast-3 bg-green1-dark color-white text-center custom-cursor"
      style="
        margin-bottom: calc(100px + (env(safe-area-inset-bottom)) * 1.1) !important;
        background-color: rgb(0, 0, 0) !important;
      "
      (click)="goBack()"
    >
      <i class="fas fa-chevron-left mr-2"></i> Retour
    </div>
  `,
})
export class BackButtonComponent implements OnInit {
  @Input() customUrl?: string;
  private customUrl_: any;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.customUrl_ = this.customUrl;
  }

  goBack(): void {
    if (this.customUrl) {
      // Naviguer vers l'URL personnalisée si elle est fournie
      // window.location.href = this.customUrl;
      this.router.navigate([this.customUrl_]);
    } else {
      // Utiliser la fonction goBack pour revenir à la page précédente
      this.location.back();
    }
  }
}
