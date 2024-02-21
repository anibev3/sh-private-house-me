import { AfterContentInit, Component, OnInit } from '@angular/core';
import { RoomHelperService } from '../../../services/room-helper.service';
import { ApiService } from 'src/app/components/services/api/api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';
import { Constants } from 'src/app/components/constants.ts/constants';
import { User } from 'src/app/components/models/user.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  //  -------------------------------------------

  public userReservationInfo: any;

  // ----------------------- Payment option
  paymentSelectedOption: boolean | null = true;
  isPaymentCollapseVisible: boolean | null = true;

  // --------------------------------------
  public query_params: any;
  public user_to_store: any;
  public info_bk_user: any;
  public show_query_params: any;

  public isRoomOk: boolean = false;
  public isAmountCalculating: boolean = false;

  public couponExist: any;
  public couponExist_oh: boolean = false;
  public isOnce: boolean = false;

  public paymentRoom: any;
  public paymentRoomCoteDjai: any;
  showSnackbar: boolean = false;
  couponCode: string = '';
  isCouponValid: boolean | null = null;
  isRequestPending: boolean = false;
  public isUserConnected: boolean = false;

  infoRs: any = [];
  userInfo_: User | undefined | any;
  submittingForm: boolean = false;
  isCollapseVisible: boolean | null = false;
  selectedOption: boolean | null = false;
  facturationForm!: FormGroup;
  isReservation: boolean = false;
  public bookins_amount: any;
  public roomdetails: any;
  public laResidence: any;
  public reservationInfo: any;
  public totalAmount: any;
  public tvaAmount: any;
  public serviceAmount = 0;
  public numberOfNights: any;
  public numberOfDays: any;
  public infoToSend: any;
  public userPreference: any;
  public discountAmount: any;
  public coupon: any;
  private strp_id: string = 'session_id';
  public isCouponLoading: boolean = false;

  public invalidReservation: boolean = false;
  public paymentIsOK: boolean = false;
  public errorMessage: string = '';

  displayResponsive: boolean = false;

  showResponsiveDialog() {
    this.displayResponsive = true;
  }

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    public cryptoService: CryptoService,
    public calendar: NgbCalendar
  ) {}

  public ngOnInit() {
    if (this.cryptoService.getDecryptedItem(Constants.USER)) {
      this.userInfo_ = this.cryptoService.getDecryptedItem(Constants.USER);
    }

    if (this.cryptoService.getDecryptedItem(Constants.SELECTED_ROOM)) {
      this.paymentRoom = this.cryptoService.getDecryptedItem(
        Constants.SELECTED_ROOM
      );
    }

    this.getUserReservation();
    this.getQueryParams();
    this.getArrivalDateFromLocalStorage();
    this.userStatus();
    this.calculate_amounts(this.route.snapshot.params.id);
    this.initialiseFacturationInfo();
    this.setRoom(this.route.snapshot.params.id);

    const sessionId = this.route.snapshot.queryParams[this.strp_id];
    const reservervation_payment_id = localStorage.getItem(
      'reservervation_payment_id'
    );
    if (sessionId) {
      this.isReservation = true;

      if (sessionId === reservervation_payment_id) {
        this.paymentIsOK = true;
        this.makeUserReservation();
      }
    }
  }

  public getUserReservation(): void {
    if (this.cryptoService.getDecryptedItem(Constants.BOOKING_USER_INFOS)) {
      this.userReservationInfo = this.cryptoService.getDecryptedItem(
        Constants.BOOKING_USER_INFOS
      );
    }
  }

  public getQueryParams(): void {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }
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
                // initialAmount: this.totalAmount + this.discountAmount,
                // totalAmount: this.totalAmount,
                // discountAmount: this.discountAmount,
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

  makeUserReservation(): void {
    if (this.cryptoService.getDecryptedItem(Constants.BOOKING_USER_INFOS)) {
      this.info_bk_user = this.cryptoService.getDecryptedItem(
        Constants.BOOKING_USER_INFOS
      );
    }

    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.show_query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }

    if (this.cryptoService.getDecryptedItem(Constants.COUPON)) {
      this.coupon = this.cryptoService.getDecryptedItem(Constants.COUPON);
    }

    if (this.cryptoService.getDecryptedItem(Constants.COUPON)) {
      this.coupon = this.cryptoService.getDecryptedItem(Constants.COUPON);
    }

    let once_: boolean = false;
    if (this.query_params.once) {
      once_ = this.query_params.once;
    }

    const formData: any = {
      room_id: this.paymentRoom?.id,
      customer_id: this.userInfo_?.id,
      coupon_code: this.coupon?.code,
      number_of_guests: parseInt(this.query_params?.nbr_people),
      arrival_time: this.info_bk_user?.arrival_time,
      requests: this.info_bk_user?.special_request,
      currency_id: parseInt(this.paymentRoom?.currency?.id),
      start_date: this.show_query_params?.arrival_at,
      end_date: this.show_query_params?.departure_at,
      once: once_,
    };

    // Check if paymentIsOK is true before adding the payment property
    if (this.paymentIsOK) {
      formData.payment = {
        method: 'card',
      };
    }

    this.apiService.createItem('bookings', formData).subscribe(
      (response) => {
        if (localStorage.getItem('reservervation_payment_id')) {
          localStorage.removeItem('reservervation_payment_id');
        }
        if (this.cryptoService.getDecryptedItem(Constants.COUPON)) {
          localStorage.removeItem(Constants.COUPON);
        }
        localStorage.removeItem(Constants.LE_DJAI);

        this.cryptoService.setEncryptedItem(
          Constants.SUCCESS_RESERVATION_DATA,
          response.reservation
        );

        this.isReservation = false;
        return this.router.navigate(['/success-reservation'], {
          replaceUrl: true,
        });
      },
      (error) => {
        this.displayResponsive = true;
        this.errorMessage =
          "Une erreur innattendu s'est produite, veuillez contacter SHERYLUX RESIDENCE PRIVEE AU +225 27 22 29 94 64";
        this.isReservation = false;
      }
    );
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
  selectOption(option: boolean) {
    this.selectedOption = option;
  }

  toggleCollapse() {
    if (this.selectedOption === true) {
      this.isCollapseVisible = true;
    } else {
      this.isCollapseVisible = false;
    }
  }
  //---------------------- Payment Option
  PaymentSelectOption(option: boolean) {
    this.paymentSelectedOption = option;
  }

  paymentToggleCollapse() {
    if (this.paymentSelectedOption === true) {
      this.isPaymentCollapseVisible = true;
    } else {
      this.isPaymentCollapseVisible = false;
    }
  }
  // -------------------------------------
  async processToPaiement(): Promise<void> {
    try {
      const amount: any = await this.loadAmount();
      let finalAmount: number;

      if (typeof amount === 'object' && amount.amount !== undefined) {
        finalAmount = parseInt(amount.amount, 10);
      } else {
        finalAmount = parseInt(amount, 10);
      }

      // Utilisez maintenant 'finalAmount' pour la suite de votre logique

      // Vérifier si 'amount' est valide avant de continuer
      if (finalAmount == null || isNaN(+finalAmount)) {
        console.error("Le montant n'est pas valide.");
        return;
      }

      const cart = [
        {
          name: 'Montant total de réservation',
          price: finalAmount,
          quantity: 1,
        },
      ];

      // console.log(JSON.stringify(cart), cart[0].price);

      this.apiService.initiatePayment(cart, this.userInfo_.email).subscribe(
        (paymentResponse) => {
          if (paymentResponse.success) {
            localStorage.setItem(
              'reservervation_payment_id',
              paymentResponse.data.session_id
            );
            return (window.location.href = paymentResponse.data.session_url);
          } else {
            // Afficher le dialogue en cas d'échec du paiement
            this.displayResponsive = true;
            this.errorMessage =
              'Échec du paiement. Veuillez réessayer plus tard.';
          }
        },
        (error) => {
          // Afficher le dialogue en cas d'erreur
          this.displayResponsive = true;
          this.errorMessage =
            'Erreur lors de la communication avec le serveur.';
        }
      );
    } catch (error) {
      console.error('Erreur lors du chargement du montant :', error);
    }
  }

  // Fonction pour charger 'amount' de manière asynchrone
  private loadAmount(): Promise<any> {
    return new Promise((resolve) => {
      // Simulation d'un chargement asynchrone, remplacez cela par votre logique réelle
      setTimeout(() => {
        const decryptedAmount = this.cryptoService.getDecryptedItem(
          Constants.LE_DJAI
        );
        resolve(decryptedAmount);
      }, 1000); // ajustez le délai selon votre besoin
    });
  }

  submitInfoFacturationAndProcessToPaiement() {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.show_query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }

    if (this.cryptoService.getDecryptedItem(Constants.BOOKING_USER_INFOS)) {
      this.show_query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }
    // Convertir la chaîne de date en objet Date
    const arrivalDate = new Date(this.show_query_params.arrival_at);

    // Extraire l'heure et les minutes de this.userReservationInfo.arrival_time
    const [hours, minutes] = this.userReservationInfo.arrival_time.split(':');

    // Définir l'heure et les minutes sur l'objet Date
    arrivalDate.setHours(parseInt(hours, 10));
    arrivalDate.setMinutes(parseInt(minutes, 10));
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

      // Ajouter un message d'erreur approprié selon la condition qui a échoué
      if (arrivalDate > departureDate) {
        this.errorMessage =
          "La date d'arrivée ne peut pas être postérieure à la date de départ.";

        setTimeout(() => {
          this.invalidReservation = false;
        }, 2000); //
      } else if (arrivalDate < currentDate) {
        this.errorMessage = `L'heure d'arrivée est antérieure à l'heure actuelle. Veuillez changer l'heure.`;
        this.errorMessage =
          "La date d'arrivée ne peut pas être postérieure à la date de départ.";

        setTimeout(() => {
          this.invalidReservation = false;
        }, 2000); //
      } else {
        this.errorMessage = "La date d'arrivée doit être spécifiée.";
        this.errorMessage =
          "La date d'arrivée ne peut pas être postérieure à la date de départ.";

        setTimeout(() => {
          this.invalidReservation = false;
        }, 2000); //
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
        if (this.paymentRoom.is_payment_before == 1) {
          this.processToPaiement();
        } else {
          if (this.paymentSelectedOption) {
            this.processToPaiement();
          } else {
            this.isReservation = true;

            this.makeUserReservation();
          }
        }
      }, 300);
    }
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
}
