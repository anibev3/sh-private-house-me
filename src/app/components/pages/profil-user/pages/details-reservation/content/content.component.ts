import { Component, OnInit, Type } from '@angular/core';
import { ApiService } from 'src/app/components/services/api/api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoint } from 'src/app/components/constants.ts/enpoint';
// import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/components/constants.ts/constants';

export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  public reservationDetail: any;
  public reservationId: any;

  public numberOfDays: any;
  public numberOfNights: any;

  infoPersoForm!: FormGroup;
  public showCancelledReason: boolean = false;

  cancellationReason: string = '';
  acceptanceChecked: boolean = false;
  showAnnulMsg: boolean = false;
  showAnnulMsg_2: boolean = false;
  showAnnulRequest: boolean = false;
  public showAnulationBox: boolean = false;
  public displayResponsive: boolean = false;
  public annulationAmount: any;
  public statuus: string = 'completed';

  public dataIsOk: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiService,
    private confirmationService: ConfirmationService
  ) {}

  public showCommentModal(): void {
    this.displayResponsive = !this.displayResponsive;
  }

  initDetailRsData(): void {
    this.initForm();

    this.reservationId = this.route.snapshot.params.id;
    this.apiService
      .getItemById(Endpoint.BOOKING_DETAILS, this.reservationId)
      .subscribe(
        (response) => {
          this.reservationDetail = response?.data;

          // console.log(this.reservationDetail);

          if (this.reservationDetail?.room?.cancellation_type == 'percentage') {
            this.annulationAmount =
              (parseFloat(this.reservationDetail?.amount) *
                parseFloat(this.reservationDetail?.room?.cancellation_value)) /
              100;
          }
          if (this.reservationDetail?.status == 'pending') {
            this.showAnulationBox = true;
          } else if (this.reservationDetail?.status == 'confirmed') {
            this.showAnulationBox = true;
          }

          this.initUserForm();
          this.getDate();

          this.dataIsOk = true;
        },
        (error) => {
          // console.log(error);
        }
      );
  }

  public getDate() {
    const arrivalDate = new Date(this.reservationDetail?.start_date);
    const departureDate = new Date(this.reservationDetail?.end_date);

    const timeDifference = departureDate.getTime() - arrivalDate.getTime();
    this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Nombre de nuits est le nombre de jours moins 1 (car la dernière nuit est incluse)
    this.numberOfNights = this.numberOfDays - 1;
  }

  public initUserForm() {
    this.infoPersoForm = new FormGroup({
      user_first_name: new FormControl(
        this.reservationDetail?.customer.first_name
      ),
      user_last_name: new FormControl(
        this.reservationDetail?.customer.last_name
      ),
      user_email: new FormControl(this.reservationDetail?.customer.email),
      country_and_country_code: new FormControl(
        this.reservationDetail?.customer.country
      ),
      phone_number: new FormControl(this.reservationDetail?.phone),
      adresse: new FormControl(this.reservationDetail?.customer.address), //#777
      special_request: new FormControl(this.reservationDetail?.requests),
      arrival_time: new FormControl(`${this.reservationDetail?.arrival_time}`),
      // reservationInfo_for_me: new FormControl(''),
    });
  }

  public initForm(): void {
    this.infoPersoForm = new FormGroup({
      user_first_name: new FormControl(''),
      user_last_name: new FormControl(''),
      user_email: new FormControl(''),
      country_and_country_code: new FormControl(''),
      phone_number: new FormControl(''),
      adresse: new FormControl(''),
      special_request: new FormControl(''),
      arrival_time: new FormControl(''),
      // reservationInfo_for_me: new FormControl(''),
    });
  }
  public getReservationStatusColor(status: string): string {
    switch (status) {
      case 'cancelled':
        return 'red';
      case 'confirmed':
        return 'green';
      case 'pending':
        return '#6a6a26';
      case 'completed':
        return 'blue';
      default:
        return '';
    }
  }

  public getReservationStatusMessage(status: string): string {
    switch (status) {
      case 'cancelled':
        return 'Réservation annulée';
      case 'confirmed':
        return 'Réservation confirmée';
      case 'pending':
        return 'En attente de confirmation';
      case 'completed':
        return 'Réservation terminée';
      default:
        return '';
    }
  }

  public getReservationStatusIcon(status: string): string {
    switch (status) {
      case 'cancelled':
        return 'fa-times-circle';
      case 'confirmed':
        return 'fa-check-circle';
      case 'pending':
        return 'fa-hourglass-half';
      case 'completed':
        return 'fa-check-circle';
      default:
        return '';
    }
  }

  public wantCancelled() {
    this.showCancelledReason = true;
  }
  cancel(): void {
    // Réinitialisez les modèles ou effectuez toute autre action nécessaire lors de l'abandon de l'annulation
    this.cancellationReason = '';
    this.acceptanceChecked = false;
    this.showCancelledReason = false; // Si nécessaire
  }

  confirmCancellation(resId: string): void {
    // Vérifiez si la case de consentement est cochée
    const formData = {
      booking_number: resId,
    };

    if (this.cancellationReason != '') {
      if (this.acceptanceChecked) {
        this.showAnnulRequest = true;

        this.apiService.createItem(Endpoint.CANCELLED, formData).subscribe(
          (response) => {
            setTimeout(() => {
              this.showAnnulRequest = false;
              return this.router.navigate([Constants.PROFIL_ROUTE]);
            }, 1000);
          },
          (error) => {
            // Gestion des erreurs
            setTimeout(() => {
              this.showAnnulRequest = false;
            }, 1000);
          }
        );
      } else {
        // Affichez un message d'erreur ou prenez une autre action si la case de consentement n'est pas cochée
        this.showAnnulMsg = true;
        setTimeout(() => {
          this.showAnnulMsg = false;
        }, 1000);
      }
    } else {
      this.showAnnulMsg_2 = true;
      setTimeout(() => {
        this.showAnnulMsg_2 = false;
      }, 1000);
    }
  }

  ngOnInit(): void {
    // this.initForm();
    this.initDetailRsData();
  }
}
