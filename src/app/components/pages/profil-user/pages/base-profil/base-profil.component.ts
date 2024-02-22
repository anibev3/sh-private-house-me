import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/components/services/api/api.service';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';
import { ProfilHelperService } from 'src/app/components/services/profil-helper.service';

@Component({
  selector: 'app-base-profil',
  templateUrl: './base-profil.component.html',
  styleUrls: ['./base-profil.component.css'],
})
export class BaseProfilComponent extends ProfilHelperService {
  Headerclassname = 'inner-page';
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';
  public isCollapsed = true;

  // constructor(
  // router: Router,

  // fb: FormBuilder,
  // route: ActivatedRoute,
  // apiService: ApiService,
  // roote: ActivatedRoute,
  // cryptoService: CryptoService
  // ) {
  // super(router,fb, route, apiService, roote, cryptoService);
  // // Écoute des événements de navigation pour mettre à jour la classe active
  // this.router.events
  //   .pipe(filter((event) => event instanceof NavigationEnd))
  //   .subscribe(() => {
  //     this.updateActiveClass();
  //   });
  // }

  // // Fonction pour mettre à jour la classe active
  // updateActiveClass(): void {
  //   const activeRoute = this.getActiveRoute();

  //   // Réinitialiser toutes les classes actives
  //   this.navLinks.forEach((link) => (link.active = false));

  //   // Appliquer la classe active à la route actuelle
  //   const currentLink = this.navLinks.find(
  //     (link) => link.route === activeRoute
  //   );
  //   if (currentLink) {
  //     currentLink.active = true;
  //   }
  // }

  // // Fonction pour obtenir la route active
  // getActiveRoute(): string {
  //   return this.router.url.split('/')[2]; // Assurez-vous d'ajuster selon votre structure de routes
  // }

  // // Définition de vos liens de navigation
  // navLinks = [
  //   {
  //     route: 'profil-user',
  //     label: 'Dashboard',
  //     icon: 'fa-home',
  //     active: false,
  //   },
  //   {
  //     route: 'notifications',
  //     label: 'Notifications',
  //     icon: 'fa-bell',
  //     active: false,
  //   },
  //   {
  //     route: 'profil-user/historique',
  //     label: 'Historique',
  //     icon: 'fa-file',
  //     active: false,
  //   },
  //   {
  //     route: 'profil-user/update-profil',
  //     label: 'Profil',
  //     icon: 'fa-user',
  //     active: false,
  //   },
  //   { route: 'parametres', label: 'Paramètre', icon: 'fa-cog', active: false },
  // ...
  // ];
}
