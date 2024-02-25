import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Galleria } from 'primeng/galleria';
import { ProfilHelperService } from '../../services/profil-helper.service';
import { Constants } from '../../constants.ts/constants';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Endpoint } from '../../constants.ts/enpoint';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { NavigationService } from '../../services/crypto/navigation.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css'],
})
export class deleteReservationComponent implements OnInit {
  @Input() reservationDetail_: any;
  @Input() isModal: boolean = false;

  cancellationReason: string = '';
  acceptanceChecked: boolean = false;
  showAnnulMsg: boolean = false;
  showAnnulMsg_2: boolean = false;
  showAnnulRequest: boolean = false;
  public showAnulationBox: boolean = false;
  public displayResponsive: boolean = false;
  public annulationAmount: any;
  public showCancelledReason: boolean = false;
  public statuus: string = 'completed';

  public plusBool = true;

  public reservationDetail: any;
  public reservationId: any;

  public numberOfDays: any;
  public numberOfNights: any;

  infoPersoForm!: FormGroup;

  public dataIsOk: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiService,
    private confirmationService: ConfirmationService,
    private navigationService: NavigationService
  ) {}

  public showCommentModal(): void {
    this.displayResponsive = !this.displayResponsive;
  }

  public goToListingLodge() {
    return this.navigationService.onSubmit();
  }

  // initDetailRsData(): void {
  //   this.initForm();

  //   this.reservationId = this.route.snapshot.params.id;
  //   this.apiService
  //     .getItemById(Endpoint.BOOKING_DETAILS, this.reservationId)
  //     .subscribe(
  //       (response) => {
  //         this.reservationDetail = response?.data;

  //         // console.log(this.reservationDetail);

  //         if (this.reservationDetail?.room?.cancellation_type == 'percentage') {
  //           this.annulationAmount =
  //             (parseFloat(this.reservationDetail?.amount) *
  //               parseFloat(this.reservationDetail?.room?.cancellation_value)) /
  //             100;
  //         }
  //         if (this.reservationDetail?.status == 'pending') {
  //           this.showAnulationBox = true;
  //         } else if (this.reservationDetail?.status == 'confirmed') {
  //           this.showAnulationBox = true;
  //         }

  //         this.initUserForm();
  //         this.getDate();

  //         this.dataIsOk = true;
  //       },
  //       (error) => {
  //         // console.log(error);
  //       }
  //     );
  // }

  // public getDate() {
  //   const arrivalDate = new Date(this.reservationDetail?.start_date);
  //   const departureDate = new Date(this.reservationDetail?.end_date);

  //   const timeDifference = departureDate.getTime() - arrivalDate.getTime();
  //   this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  //   // Nombre de nuits est le nombre de jours moins 1 (car la dernière nuit est incluse)
  //   this.numberOfNights = this.numberOfDays - 1;
  // }

  // public initUserForm() {
  //   this.infoPersoForm = new FormGroup({
  //     user_first_name: new FormControl(
  //       this.reservationDetail?.customer.first_name
  //     ),
  //     user_last_name: new FormControl(
  //       this.reservationDetail?.customer.last_name
  //     ),
  //     user_email: new FormControl(this.reservationDetail?.customer.email),
  //     country_and_country_code: new FormControl(
  //       this.reservationDetail?.customer.country
  //     ),
  //     phone_number: new FormControl(this.reservationDetail?.phone),
  //     adresse: new FormControl(this.reservationDetail?.customer.address), //#777
  //     special_request: new FormControl(this.reservationDetail?.requests),
  //     arrival_time: new FormControl(`${this.reservationDetail?.arrival_time}`),
  //     // reservationInfo_for_me: new FormControl(''),
  //   });
  // }

  // public initForm(): void {
  //   this.infoPersoForm = new FormGroup({
  //     user_first_name: new FormControl(''),
  //     user_last_name: new FormControl(''),
  //     user_email: new FormControl(''),
  //     country_and_country_code: new FormControl(''),
  //     phone_number: new FormControl(''),
  //     adresse: new FormControl(''),
  //     special_request: new FormControl(''),
  //     arrival_time: new FormControl(''),
  //     // reservationInfo_for_me: new FormControl(''),
  //   });
  // }

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
            if (this.isModal) {
              return location.reload();
            }
          },
          (error) => {
            // Gestion des erreurs
            console.log(error);

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
    // this.initDetailRsData();
    this.reservationDetail = this.reservationDetail_;
    this.showCancelledReason = this.isModal;
  }
}
