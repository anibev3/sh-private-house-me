import { Injectable, AfterContentInit, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import rooms from '../data/room.json';
import roomcategory from '../data/roomcategory.json';
import authors from '../data/authors.json';
import { ApiService } from './api/api.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { CryptoService } from './crypto/crypto.service';
import { Constants } from '../constants.ts/constants';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatePipe, formatDate } from '@angular/common';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

// import { parse } from 'path';

@Injectable({
  providedIn: 'root',
})
export class RoomHelperService implements AfterContentInit, OnInit {
  /**********************************************
   ************ Radio group ********************
   *********************************************/

  //  -------------------------------------------
  public query_params: any;
  public query_params_reserv: any;
  public user_to_store: any;
  public info_bk_user: any;
  public show_query_params: any;

  public isRoomOk: boolean = false;
  public isAmountCalculating: boolean = false;

  selectedStartDate: NgbDate | null = null;
  // ----------------------------------------------
  public isGetFilterPending: boolean = false;
  public isLodgeEmpty: boolean = false;
  // ----------------------------------------------

  public couponExist: any;
  public couponExist_oh: boolean = false;
  public isOnce: boolean = false;

  selectedImageIndex: number = 0;
  public paymentRoom: any;
  public paymentRoomCoteDjai: any;
  public nbr_room: any;
  public nbr_people: any = 1;
  public arrival_at: any;
  public departure_at: any;
  public name: any;
  public nbr_bathroom: any;
  public city_id: any;
  public type_house_id: any;
  public nombreChambres: number = 1;
  public nombreSallesBains: number = 1;
  showSnackbar: boolean = false;
  couponCode: string = '';
  isCouponValid: boolean | null = null;
  isRequestPending: boolean = false;
  show_coupon_edit_btn: boolean = false;
  public avanceFilterData: any;
  public submittingFilterForm: boolean = false;
  public isUserConnected: boolean = false;

  infoRs: any = [];
  userInfo: any;
  public infoUser: any = [];
  submittingForm: boolean = false;
  isCollapseVisible: boolean | null = false;
  selectedOption: boolean | null = false;
  facturationForm!: FormGroup;
  myForm!: FormGroup;
  infoPersoForm!: FormGroup;
  // bookingForm!: FormGroup;
  isLoading: boolean = true;
  isReservation: boolean = false;
  // pagination
  public bookins_amount: any;
  page: number = 1;
  public rooms = rooms;
  public logements: any[] = [];
  public roomdetails: any;
  public laResidence: any;
  public roomcategory = roomcategory;
  public author = authors;

  public citiesList: any;
  roomTypeList: any[] | undefined;
  public reservationInfo: any;
  public totalAmount: any;
  public tvaAmount: any;
  public serviceAmount = 0;
  public numberOfNights: any;
  public numberOfDays: any;
  public infoToSend: any;
  public discountAmount: any;
  public coupon: any;
  private strp_id: string = 'session_id';
  // public images: any;
  public isCouponLoading: boolean = false;

  public invalidReservation: boolean = false;
  public errorMessage: string = '';

  logementsFiltres: any[] = []; // Liste filtrée des logements en fonction de la recherche
  searchText: string = ''; // Texte de recherche entré par l'utilisateur

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    public cryptoService: CryptoService,
    public calendar: NgbCalendar
  ) {}

  public ngOnInit() {
    this.getQueryParams();
    const onceQueryParam = this.route.snapshot.queryParamMap.get('once');
    this.isOnce = typeof onceQueryParam === 'string' ? true : false;
    this.arrival_at = this.route.snapshot.queryParamMap.get('arrival_at');
    this.departure_at = this.route.snapshot.queryParamMap.get('departure_at');
    this.city_id = this.route.snapshot.queryParamMap.get('city_id');
    this.type_house_id = this.route.snapshot.queryParamMap.get('type_house_id');
  }

  public getQueryParams(): void {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }
  }

  updateSelectedImage(index: number): void {
    this.selectedImageIndex = index;
  }

  checkCouponValidity() {
    this.isCouponLoading = true;
    const couponLengh = 8;
    // if (this.couponCode.length < couponLengh) {
    //   if (localStorage.getItem('encryptedCoupon')) {
    //     localStorage.removeItem('encryptedCoupon');
    //     this.isCouponValid = null;
    //     this.getArrivalDateFromLocalStorage();
    //   }
    // }

    if (this.couponCode.length === couponLengh) {
      this.isRequestPending = true;
      // if (this.couponCode == azerty) {
      //   this.isCouponValid = true;

      this.apiService
        .createItem('check-discount', { code_coupon: this.couponCode })
        .subscribe(
          (response) => {
            this.isCouponValid = response?.valid;
            if (this.isCouponValid) {
              this.coupon = response?.coupon;

              // const encryptedCoupon = btoa(JSON.stringify(response?.coupon)); // Cryptage du coupon le coupon
              // localStorage.setItem('encryptedCoupon', encryptedCoupon);

              if (this.coupon?.type === 'percentage') {
                const discountPercentage = parseFloat(this.coupon?.value);
                const discountAmount =
                  (this.totalAmount * discountPercentage) / 100;
                this.discountAmount = discountAmount;
                this.totalAmount -= discountAmount;
              } else if (this.coupon?.type === 'fixed') {
                const discountValue = parseFloat(this.coupon?.value);
                this.discountAmount = discountValue;
                this.totalAmount -= discountValue;
              }

              const coupon = {
                isExiste: true,
                coupon: this.coupon,
                initialAmount: this.totalAmount + this.discountAmount,
                totalAmount: this.totalAmount,
                discountAmount: this.discountAmount,
              };

              this.cryptoService.setEncryptedItem(Constants.COUPON, coupon);

              setTimeout(() => {
                // this.isCouponValid = null;
                location.reload();
              }, 500);
            }

            this.isRequestPending = false;
            this.isCouponLoading = false;

            // setTimeout(() => {
            //   this.isCouponValid = null;
            //   // this.isRequestPending = false;
            // }, 1000);
          },
          (error) => {
            // console.error('Erreur lors de la vérification du coupon : ', error);
            this.isRequestPending = false;
            this.isCouponLoading = false;
          }
        );
    }

    if (this.couponCode.length === 0) {
      this.isCouponLoading = false;
      this.isRequestPending = false;
    }
  }

  /*********************************************
   ************ Radio group ********************
   *********************************************/
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

  /*********************************************
   ************ Radio group ********************
   *********************************************/
  //
  public getLodge(formData: any) {
    this.isGetFilterPending = true;

    this.apiService
      .searchRooms('filter-rooms', {
        arrival_at: formData.arrival_at,
        departure_at: formData.departure_at,
        nbr_people: formData.nbr_people,
        city_id: formData.city_id,
        type_house_id: formData.type_house_id,
        nbr_room: formData.nbr_room,
        name: formData.name,
        nbr_bathroom: formData.nbr_bathroom,
      })
      .subscribe(
        (response) => {
          this.logements = response.data;

          if (response?.data.length < 1) {
            this.isLodgeEmpty = true;
          }
          this.isLodgeEmpty;
          this.isGetFilterPending = false;
        },
        (error) => {
          // console.error('Erreur lors de la recherche de chambres : ', error);
          this.isGetFilterPending = false;
        }
      );
  }

  /*********************************************
   ************ Radio group ********************
   *********************************************/
  selectOption(option: boolean) {
    this.selectedOption = option;
  }

  /*********************************************
   ************ Radio group ********************
   *********************************************/
  toggleCollapse() {
    if (this.selectedOption === true) {
      this.isCollapseVisible = true;
    } else {
      this.isCollapseVisible = false;
    }
  }
  //
  /*********************************************
   ************ Radio group ********************
   *********************************************/

  /*********************************************
   ************ Radio group ********************
   *********************************************/

  submitInfoFacturationAndProcessToPaiement() {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.show_query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }
    const arrivalDate = new Date(this.show_query_params.arrival_at);
    const departureDate = new Date(this.show_query_params.departure_at);
    const currentDate = new Date();

    // Vérifier les conditions
    if (
      arrivalDate > departureDate ||
      arrivalDate < currentDate ||
      !this.show_query_params.arrival_at
    ) {
      this.infoRs = this.facturationForm.value;

      localStorage.setItem('facturationInfo', JSON.stringify(this.infoRs));
      // Mettre la variable à true et prévenir l'utilisateur
      this.invalidReservation = true;
      this.isReservation = false;

      // Ajouter un message d'erreur approprié selon la condition qui a échoué
      if (arrivalDate > departureDate) {
        this.errorMessage =
          "La date d'arrivée ne peut pas être postérieure à la date de départ.";
      } else if (arrivalDate < currentDate) {
        this.errorMessage =
          "La date d'arrivée ne peut pas être antérieure à la date d'aujourd'hui.";
      } else {
        this.errorMessage = "La date d'arrivée doit être spécifiée.";
      }
    } else {
      this.submittingForm = true;
      // Vérifiez si le formulaire est valide
      this.facturationForm.value.isEntreprise = this.selectedOption;

      setTimeout(() => {
        this.submittingForm = false;
      }, 300);

      if (this.facturationForm.value.isEntreprise) {
        if (
          !this.facturationForm.value.villeFacturation ||
          !this.facturationForm.value.codePostalFacturation ||
          !this.facturationForm.value.adresseFacturation ||
          !this.facturationForm.value.paysFacturation ||
          !this.facturationForm.value.nomEntrepriseFacturation
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
      } else {
        if (
          !this.facturationForm.value.prenomFacturation ||
          !this.facturationForm.value.nomFacturation ||
          !this.facturationForm.value.adresseFacturation ||
          !this.facturationForm.value.villeFacturation ||
          !this.facturationForm.value.codePostalFacturation ||
          !this.facturationForm.value.adresseFacturation ||
          !this.facturationForm.value.paysFacturation
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
      }

      this.infoRs = this.facturationForm.value;

      localStorage.setItem('facturationInfo', JSON.stringify(this.infoRs));

      setTimeout(() => {
        this.submittingForm = false;
      }, 300);
    }
  }

  /*********************************************
   ************ Radio group ********************
   *********************************************/

  submitUserInfo() {
    this.submittingForm = true;

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

  /*********************************************
   ************ Radio group ********************
   *********************************************/

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

  getSymbol(): string {
    return this.roomdetails?.currency?.is_prefix_symbol
      ? this.roomdetails?.currency.symbol
      : '';
  }

  /*********************************************
   ************ Radio group ********************
   *********************************************/
  ngAfterContentInit(): void {
    /********************************************
     ************ Radio group ********************
     *********************************************/

    // this.getArrivalDateFromLocalStorage(this.route.snapshot.params.id);
    this.getArrivalDateFromLocalStorage();
    this.userStatus();
    this.calculate_amounts(this.route.snapshot.params.id);

    this.initialiseFacturationInfo();
    this.initialiseUserInfo();
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
        start_date: this.reservationInfo?.arrival_at,
        end_date: this.reservationInfo?.departure_at,
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

  public initialiseFacturationInfo() {
    this.infoRs = localStorage.getItem('facturationInfo');

    if (this.infoRs) {
      this.infoRs = JSON.parse(this.infoRs);
      this.selectedOption = this.infoRs.isEntreprise;
      if (this.selectedOption) {
        this.isCollapseVisible = true;
      }
      this.facturationForm = new FormGroup({
        isEntreprise: new FormControl(this.infoRs.isEntreprise),
        prenomFacturation: new FormControl(this.infoRs.prenomFacturation),
        nomFacturation: new FormControl(this.infoRs.nomFacturation),
        adresseFacturation: new FormControl(this.infoRs.adresseFacturation),
        villeFacturation: new FormControl(this.infoRs.villeFacturation),
        codePostalFacturation: new FormControl(
          this.infoRs.codePostalFacturation
        ),
        paysFacturation: new FormControl(this.infoRs.paysFacturation),
        nomEntrepriseFacturation: new FormControl(
          this.infoRs.nomEntrepriseFacturation
        ),
      });
    } else {
      this.facturationForm = new FormGroup({
        isEntreprise: new FormControl(''),
        prenomFacturation: new FormControl(''),
        nomFacturation: new FormControl(''),
        adresseFacturation: new FormControl(''),
        villeFacturation: new FormControl(''),
        codePostalFacturation: new FormControl(''),
        paysFacturation: new FormControl(''),
        nomEntrepriseFacturation: new FormControl(''),
      });
    }
  }

  public initialiseUserInfo() {
    this.infoUser = this.cryptoService.getDecryptedItem(Constants.USER);

    if (this.infoUser) {
      this.infoPersoForm = new FormGroup({
        user_first_name: new FormControl(this.infoUser.firstName),
        user_last_name: new FormControl(this.infoUser.lastName),
        user_email: new FormControl(this.infoUser.email),
        country_and_country_code: new FormControl('CI'),
        phone_number: new FormControl(this.infoUser.mobilePhone),
        adresse: new FormControl(
          `${this.infoUser.data.city}, ${this.infoUser.data.address}`
        ),
        special_request: new FormControl(this.infoUser.special_request),
        arrival_time: new FormControl(''),
        reservationInfo_for_me: new FormControl(''),
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
        reservation_for_me: new FormControl(''),
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
        reservationInfo_for_me: new FormControl(
          this.user_to_store.reservationInfo_for_me
        ),
      });
    }
  }
}
