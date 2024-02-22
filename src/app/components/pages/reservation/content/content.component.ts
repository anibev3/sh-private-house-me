import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/components/constants.ts/constants';
import { ApiService } from 'src/app/components/services/api/api.service';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, AfterContentInit {
  zoom: number = 12;
  lat: number = 31.53912;
  lng: number = -89.29163;

  public query_params: any;
  public user_to_store: any;
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';

  public isRoomOk: boolean = false;
  public isAmountCalculating: boolean = false;
  public showConnectedMsg: boolean = false;

  public couponExist: any;
  public couponExist_oh: boolean = false;
  public isOnce: boolean = false;

  public arrival_at: any;
  public departure_at: any;

  public city_id: any;
  public type_house_id: any;

  showSnackbar: boolean = false;
  couponCode: string = '';
  isCouponValid: boolean | null = null;
  isRequestPending: boolean = false;
  show_coupon_edit_btn: boolean = false;
  public avanceFilterData: any;
  public submittingFilterForm: boolean = false;
  public isUserConnected: boolean = false;
  acceptanceChecked: boolean = false;

  userInfo: any;
  public infoUser: any = [];
  submittingForm: boolean = false;
  public isOnce_: boolean = false;
  public showAcceptMsg: boolean = false;

  infoPersoForm!: FormGroup | any;

  public bookins_amount: any;

  public roomdetails: any;
  public laResidence: any;

  public reservationInfo: any;
  public totalAmount: any;
  public tvaAmount: any;
  public serviceAmount = 0;
  public numberOfNights: any;
  public numberOfDays: any;

  showFullRules = false;
  maxDisplayedChars = 200;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    public cryptoService: CryptoService
  ) {
    this.infoUser = this.cryptoService.getDecryptedItem(Constants.USER);

    if (this.infoUser) {
      this.infoPersoForm = new FormGroup({
        user_first_name: new FormControl(this.infoUser.first_name),
        user_last_name: new FormControl(this.infoUser.last_name),
        user_email: new FormControl(this.infoUser.email),
        country_and_country_code: new FormControl(this.infoUser.country),
        phone_number: new FormControl(this.infoUser.phone),
        adresse: new FormControl(this.infoUser.address),
        special_request: new FormControl(this.infoUser.special_request),
        arrival_time: new FormControl(''),
        reservationType: new FormControl('me'),
      });
    } else {
      this.infoPersoForm = new FormGroup({
        user_first_name: new FormControl(''),
        user_last_name: new FormControl(''),
        user_email: new FormControl(''),
        country_and_country_code: new FormControl('CI'),
        phone_number: new FormControl(''),
        adresse: new FormControl(''),
        special_request: new FormControl(''),
        arrival_time: new FormControl(''),
        reservationType: new FormControl('me'),
      });
    }

    if (this.cryptoService.getDecryptedItem(Constants.BOOKING_USER_INFOS)) {
      this.user_to_store = this.cryptoService.getDecryptedItem(
        Constants.BOOKING_USER_INFOS
      );
      this.infoPersoForm = new FormGroup({
        user_first_name: new FormControl(this.user_to_store.user_first_name),
        user_last_name: new FormControl(this.user_to_store.user_last_name),
        user_email: new FormControl(this.user_to_store.user_email),
        country_and_country_code: new FormControl(
          this.user_to_store.country_and_country_code
        ),
        phone_number: new FormControl(this.user_to_store.phone_number),
        adresse: new FormControl(this.user_to_store.adresse),
        special_request: new FormControl(this.user_to_store.special_request),
        arrival_time: new FormControl(this.user_to_store.arrival_time),
        reservation_for_other: new FormControl(''),
        reservationType: new FormControl(this.user_to_store.reservationType),
      });
    }
  }
  ngAfterContentInit(): void {
    this.getArrivalDateFromLocalStorage();
    this.userStatus();
    this.calculate_amounts(this.route.snapshot.params.id);
  }

  toggleShowFullRules() {
    this.showFullRules = !this.showFullRules;
  }

  public ngOnInit() {
    this.getQueryParams();
    const onceQueryParam = this.route.snapshot.queryParamMap.get('once');
    this.isOnce = typeof onceQueryParam === 'string' ? true : false;

    if (this.isOnce) {
      this.isOnce_ = true;
    }
    this.setRoom(this.route.snapshot.params.id);

    this.setupRadioListener('me', 'other');
    this.setupRadioListener('other', 'me');
  }

  private setupRadioListener(
    mainOption: string,
    dependentOption: string
  ): void {
    const mainControl = this.infoPersoForm.get(mainOption);

    if (mainControl) {
      mainControl.valueChanges.subscribe((value: any) => {
        if (value) {
          const dependentControl = this.infoPersoForm.get(dependentOption);
          if (dependentControl) {
            dependentControl.disable();
          }
        } else {
          const dependentControl = this.infoPersoForm.get(dependentOption);
          if (dependentControl) {
            dependentControl.enable();
          }
        }
      });
    }
  }

  public getQueryParams(): void {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }
  }

  // Single Room
  public setRoom(id: any) {
    this.apiService.getItemById('rooms', id).subscribe((response) => {
      this.roomdetails = response.data;
      localStorage.setItem('laResidence', JSON.stringify(response.data));
      this.cryptoService.setEncryptedItem(
        Constants.SELECTED_ROOM,
        response.data
      );
      this.isRoomOk = true;
    });
  }

  submitUserInfo() {
    this.submittingForm = true;

    if (!this.isUserConnected) {
      this.showConnectedMsg = true;

      setTimeout(() => {
        this.showConnectedMsg = false;
      }, 1000);
      return;
    }

    if (!this.acceptanceChecked) {
      this.showAcceptMsg = true;
      setTimeout(() => {
        this.showAcceptMsg = false;
      }, 2000);
      return;
    }

    if (
      !this.infoPersoForm.value.user_first_name ||
      !this.infoPersoForm.value.user_email ||
      !this.infoPersoForm.value.country_and_country_code ||
      !this.infoPersoForm.value.phone_number ||
      !this.infoPersoForm.value.adresse ||
      !this.infoPersoForm.value.arrival_time
      // ||
      // !this.infoPersoForm.value.reservation_for_me
    ) {
      this.showSnackbar = true;
      this.submittingForm = true;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 1000);
      setTimeout(() => {
        this.submittingForm = false;
      }, 300);

      return;
    }

    this.cryptoService.setEncryptedItem(
      Constants.BOOKING_USER_INFOS,
      this.infoPersoForm.value
    );

    setTimeout(() => {
      this.submittingForm = false;
      this.router.navigate(['/payment', this.route.snapshot.params.id]);
    }, 300);
  }

  public getArrivalDateFromLocalStorage() {
    // Récupérer la chaîne JSON du localStorage
    const reservationInfoString = localStorage.getItem('infoRes');
    const laResidence = localStorage.getItem('laResidence');

    // Vérifier si la chaîne est non nulle
    if (reservationInfoString) {
      // Convertir la chaîne JSON en objet JavaScript
      this.reservationInfo = JSON.parse(reservationInfoString);

      const arrivalDate = new Date(this.reservationInfo.arrival_at);
      const departureDate = new Date(this.reservationInfo.departure_at);

      const timeDifference = departureDate.getTime() - arrivalDate.getTime();
      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      // Nombre de nuits est le nombre de jours moins 1 (car la dernière nuit est incluse)
      this.numberOfNights = this.numberOfDays - 1;
    } else {
      // console.log(
      //   'Aucune information de réservation trouvée dans le localStorage.'
      // );
    }

    if (laResidence) {
      this.laResidence = JSON.parse(laResidence);
      const price = parseFloat(this.laResidence?.price);
      this.serviceAmount = price;
      this.tvaAmount = 0;
      if (this.laResidence?.tax?.percentage) {
        const taxPercentage = JSON.parse(this.laResidence?.tax?.percentage);

        this.tvaAmount = (price * taxPercentage) / 100;
      }

      // this.totalAmount = price + this.tvaAmount;
    } else {
      // console.log(
      //   'Aucune information de réservation trouvée dans le localStorage.'
      // );
    }
  }

  public userStatus() {
    this.isUserConnected = this.cryptoService.isUserLoggedIn();
  }

  public gotToPayment() {
    const formData = {
      once: true,
    };
    return this.router.navigate([`/reservation/${this.roomdetails?.id}`], {
      queryParams: formData,
    });
  }

  public calculate_amounts(room_id: any) {
    this.isAmountCalculating = true;
    if (this.cryptoService.getDecryptedItem(Constants.COUPON)) {
      this.couponExist = this.cryptoService.getDecryptedItem(Constants.COUPON);
      this.couponExist_oh = true;
      this.isRequestPending = true;
      this.isCouponValid = true;
      this.couponCode = this.couponExist.coupon.code;
      this.totalAmount = this.couponExist.totalAmount;
      this.isAmountCalculating = false;
    } else {
      const formData = {
        room_id: parseInt(room_id),
        start_date: this.query_params?.arrival_at,
        end_date: this.query_params?.departure_at,
        once: this.isOnce,
      };

      this.apiService
        .createItem('bookings/calculate-amounts', formData)
        .subscribe(
          (response) => {
            this.bookins_amount = response?.data;
            this.cryptoService.setEncryptedItem(
              Constants.LE_DJAI,
              this.bookins_amount
            );
            this.totalAmount = response?.data?.amount;
            this.isAmountCalculating = false;
          },
          (error) => {
            // console.log('Error calculate booking amount : \n', error);
          }
        );
    }
  }
}
