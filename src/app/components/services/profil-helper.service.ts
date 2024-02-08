import { Injectable, AfterContentInit, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import rooms from '../data/room.json';
import roomcategory from '../data/roomcategory.json';
import authors from '../data/authors.json';
import { ApiService } from './api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptoService } from './crypto/crypto.service';
import { Constants } from '../constants.ts/constants';
import { Endpoint } from '../constants.ts/enpoint';
import { User } from '../models/user.model';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfilHelperService implements AfterContentInit {
  updateForm!: FormGroup;
  updatePasswordForm!: FormGroup;
  // pagination
  page: number = 1;
  public userId: any = 5;
  public logements: any;
  public roomdetails: any;
  public history: any[] = [];
  public userData: User | any;
  public roomcategory = roomcategory;
  public author = authors;
  public reservationId: any;
  public reservationDetail: any;
  public isPending: boolean = false;
  public dataIsOk: boolean = false;
  public passwordVisible: boolean = false;
  public historyList: any;

  public pendingCount: number = 0;
  public confirmCount: number = 0;
  public completedCount: number = 0;
  public cancelledCount: number = 0;
  public isCollapsed = true;

  responseIcon: string = '';
  responseMsg: string = '';
  showSucessSnackbar: boolean = false;

  showErrorSnackbar: boolean = false;
  updateUserSubmittingForm: boolean = false;
  updatePasswordSubmittingForm: boolean = false;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public apiService: ApiService,
    public roote: ActivatedRoute,
    public router: Router,
    public cryptoService: CryptoService
  ) {
    this.getUserData();
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.updateActiveClass();
    //     end;
    //   });
  }

  // Fonction pour mettre à jour la classe active
  updateActiveClass(): void {
    const activeRoute = this.getActiveRoute();

    // Réinitialiser toutes les classes actives
    this.navLinks.forEach((link) => (link.active = false));

    // Appliquer la classe active à la route actuelle
    const currentLink = this.navLinks.find(
      (link) => link.route === activeRoute
    );
    if (currentLink) {
      currentLink.active = true;
    }
  }

  // Fonction pour obtenir la route active
  getActiveRoute(): string {
    return this.router.url.split('/')[2]; // Assurez-vous d'ajuster selon votre structure de routes
  }

  // Définition de vos liens de navigation
  navLinks = [
    {
      route: 'profil-user',
      label: 'Dashboard',
      icon: 'fa-home',
      active: false,
    },
    {
      route: 'notifications',
      label: 'Notifications',
      icon: 'fa-bell',
      active: false,
    },
    {
      route: 'profil-user/historique',
      label: 'Historique',
      icon: 'fa-file',
      active: false,
    },
    {
      route: 'profil-user/update-profil',
      label: 'Profil',
      icon: 'fa-user',
      active: false,
    },
    { route: 'parametres', label: 'Paramètre', icon: 'fa-cog', active: false },
    // ...
  ];

  //
  getRoomByCity(city: string) {
    // Exemple:
    this.apiService.getItems(`/rooms?city=${city}`).subscribe((response) => {
      this.history = response;
    });
  }
  //
  onSubmitUpdateUser(): void {
    this.updateUserSubmittingForm = true;
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;

      const userCredantials: any = this.cryptoService.getDecryptedItem(
        Constants.TOKEN
      );
      console.log(userCredantials);

      console.log('LE CONTENU DU FORMULAIRE', formData);
      this.apiService
        .patchItemWithHeader(
          Endpoint.UPDATE_USER_INFO,
          userCredantials?.token_type,
          userCredantials?.accessToken,
          formData
        )
        .subscribe(
          (response) => {
            console.log(JSON.stringify(response));
            this.cryptoService.setEncryptedItem(Constants.USER, response?.user);
            this.responseIcon = 'fa-check-circle';
            this.responseMsg = 'Vos informations ont bien été modifié';
            this.showSucessSnackbar = true;

            setTimeout(() => {
              this.updateUserSubmittingForm = false;

              location.reload();
            }, 1000);
          },
          (error) => {
            this.showErrorSnackbar = true;
            this.responseIcon = 'fa-exclamation-circle';
            this.responseMsg = 'Une erreur est survenu';

            setTimeout(() => {
              this.showErrorSnackbar = false;
              this.updateUserSubmittingForm = false;
            }, 1500);
          }
        );
    } else {
      // Traitez les erreurs de validation si nécessaire
    }
  }

  getHistory(): void {
    this.isPending = true;
    this.apiService.getItemById('history', this.userData?.id).subscribe(
      (response) => {
        this.historyList = response?.data;
        console.log(this.historyList);

        if (this.historyList != null || this.historyList != undefined) {
          this.historyList = this.historyList.reverse();
          // Réinitialisez les compteurs
          this.pendingCount = 0;
          this.confirmCount = 0;
          this.completedCount = 0;
          this.cancelledCount = 0;

          // Parcourez l'historique et mettez à jour les compteurs
          this.historyList.forEach((item: { status: any }) => {
            switch (item.status) {
              case 'pending':
                this.pendingCount++;
                break;
              case 'confirmed':
                this.confirmCount++;
                break;
              case 'completed':
                this.completedCount++;
                break;
              case 'cancelled':
                this.cancelledCount++;
                break;
              // Ajoutez d'autres cas selon les besoins
            }
          });
        }
        this.isPending = false;
        this.dataIsOk = true;
      },
      (error) => {
        // console.log(error);
        this.isPending = false;
      }
    );
  }

  public onSubmitUpdateUserPassword(): void {
    this.updatePasswordSubmittingForm = true;
    if (this.updatePasswordForm.valid) {
      const formData = this.updatePasswordForm.value;

      const userCredantials: any = this.cryptoService.getDecryptedItem(
        Constants.TOKEN
      );
      console.log(userCredantials);

      console.log('LE CONTENU DU FORMULAIRE', formData);
      this.apiService
        .putItemWithHeader(
          Endpoint.UPDATE_USER_PASSWORD,
          userCredantials?.token_type,
          userCredantials?.accessToken,
          formData
        )
        .subscribe(
          (response) => {
            this.responseIcon = 'fa-check-circle';
            this.responseMsg = 'Mot de passe modifier avec succès';
            this.showSucessSnackbar = true;

            setTimeout(() => {
              this.updatePasswordSubmittingForm = false;
              this.showErrorSnackbar = true;

              // location.reload();
            }, 1000);
          },
          (error) => {
            this.showErrorSnackbar = true;
            this.responseIcon = 'fa-exclamation-circle';
            this.responseMsg = error?.message;

            setTimeout(() => {
              this.showErrorSnackbar = false;
              this.updatePasswordSubmittingForm = false;
            }, 1500);
          }
        );
    } else {
      // Traitez les erreurs de validation si nécessaire
    }
  }
  //
  //
  //
  //

  // public getUserHistory(userId: any) {
  //   this.apiService.getItemById('history', userId).subscribe((response) => {
  //     this.history = response.data;

  //     console.log(
  //       "Voici l'historique de l'utilisateur \n" +
  //         JSON.stringify(this.history, null, 2)
  //     );
  //   });
  // }
  logout(): void {
    this.cryptoService.clearLocalStorage();
    window.location.href = '/';
  }
  //
  getUserData(): void {
    this.userData = this.cryptoService.getDecryptedItem(Constants.USER);
    // console.log(this.userData);
  }

  public initUpdateForm(): void {
    this.updateForm = this.fb.group({
      last_name: [''],
      first_name: [''],
      // gender: [''],
      phone: [''],
      // email: [''],
      address: [''],
      country: [''],
      city: [''],
      newsletter: [true],
    });
  }

  public initPasswordForm(): void {
    this.updatePasswordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      new_password_confirmation: ['', Validators.required],
    });
  }

  public correspondUpdateFormToUserDate(): void {
    this.updateForm.patchValue({
      last_name: this.userData?.last_name,
      first_name: this.userData?.first_name,
      // gender: 'Male',
      phone: this.userData?.phone,
      // email: this.userData?.email,
      address: this.userData?.address,
      city: this.userData?.city,
      country: this.userData?.country,
      newsletter: true,
    });
  }

  // ngOnInit(): void {
  //   this.getUserData();
  // }
  ngAfterContentInit(): void {
    this.initUpdateForm();
    this.initPasswordForm();

    // this.getUserHistory(this.userId);
    this.correspondUpdateFormToUserDate();
    this.getHistory();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'cancelled':
        return 'red';
      case 'confirmed':
        return 'green';
      case 'pending':
        return 'rgb(106, 106, 38)';
      case 'completed':
        return 'blue';
      default:
        return ''; // default color or fallback
    }
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}

// constructor(
//   private cryptoService: CryptoService,
//   private apiService: ApiService,
//   private route: ActivatedRoute
// ) {}
// // Header style
// Headerclassname = 'inner-page';

// ngOnInit(): void {
//   this.initData();
// }
