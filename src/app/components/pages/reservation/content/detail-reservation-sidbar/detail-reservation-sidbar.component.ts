import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/components/constants.ts/constants';
import { ApiService } from 'src/app/components/services/api/api.service';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';
import { RoomHelperService } from 'src/app/components/services/room-helper.service';

@Component({
  selector: 'app-detail-reservation-sidbar',
  templateUrl: './detail-reservation-sidbar.component.html',
  styleUrls: ['./detail-reservation-sidbar.component.css'],
})
export class DetailReservationSidbarComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    public cryptoService: CryptoService
  ) {}
  // ngAfterContentInit(): void {
  //   this.getArrivalDateFromLocalStorage();
  //   this.calculate_amounts(this.route.snapshot.params.id);
  // }
  zoom: number = 12;
  lat: number = 31.53912;
  lng: number = -89.29163;

  public query_params: any;
  public user_to_store: any;

  public isRoomOk: boolean = false;
  public isAmountCalculating: boolean = false;

  public couponExist: any;
  public couponExist_oh: boolean = false;

  public arrival_at: any;
  public departure_at: any;

  public city_id: any;
  public type_house_id: any;
  public discountAmount: any;
  public annulationAmount: any;

  showSnackbar: boolean = false;
  couponCode: string = '';
  isCouponValid: boolean | null = null;
  isRequestPending: boolean = false;
  show_coupon_edit_btn: boolean = false;
  public avanceFilterData: any;
  public submittingFilterForm: boolean = false;
  public isUserConnected: boolean = false;

  userInfo: any;
  public infoUser: any = [];
  submittingForm: boolean = false;

  infoPersoForm!: FormGroup;

  public bookins_amount: any;
  public userReservationInfo: any;

  public roomdetails: any;
  public laResidence: any;
  public reservationInfoString_: any;

  public reservationInfo: any;
  public totalAmount: any;
  public totalOldAmount: any;
  public tvaAmount: any;
  public serviceAmount = 0;
  public numberOfNights: any;
  public numberOfDays: any;

  public ngOnInit() {
    this.getQueryParams();
    this.getUserRsInfo();
    this.setRoom(this.route.snapshot.params.id);

    this.getArrivalDateFromLocalStorage();
    this.calculate_amounts(this.route.snapshot.params.id);
  }

  public getQueryParams(): void {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }
  }

  public getUserRsInfo(): void {
    if (this.cryptoService.getDecryptedItem(Constants.BOOKING_USER_INFOS)) {
      this.userReservationInfo = this.cryptoService.getDecryptedItem(
        Constants.BOOKING_USER_INFOS
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
    const reservationInfoString = localStorage.getItem('infoRes');
    const reservationInfoString_ = this.cryptoService.getDecryptedItem(
      Constants.QUERY_PARAMS
    );
    const laResidence = this.cryptoService.getDecryptedItem(
      Constants.SELECTED_ROOM
    );

    if (reservationInfoString) {
      this.reservationInfo = reservationInfoString_;

      const arrivalDate = new Date(this.reservationInfo.arrival_at);
      const departureDate = new Date(this.reservationInfo.departure_at);

      const timeDifference = departureDate.getTime() - arrivalDate.getTime();
      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      this.numberOfNights = this.numberOfDays - 1;
    } else {
      // console.log(
      //   'Aucune information de réservation trouvée dans le localStorage.'
      // );
    }

    if (laResidence) {
      // this.laResidence = JSON.parse(laResidence);
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

  // public userStatus() {
  //   this.isUserConnected = this.cryptoService.isUserLoggedIn();
  // }

  public calculate_amounts(room_id: any) {
    this.isAmountCalculating = true;

    // else {
    const formData = {
      room_id: parseInt(room_id),
      start_date: this.query_params?.arrival_at,
      end_date: this.query_params?.departure_at,
      once: this.query_params?.once,
    };

    this.apiService
      .createItem('bookings/calculate-amounts', formData)
      .subscribe(
        (response) => {
          this.totalAmount = response?.data?.amount;
          this.bookins_amount = response?.data;
          this.totalOldAmount = response?.data?.amount;

          if (this.cryptoService.getDecryptedItem(Constants.COUPON)) {
            this.couponExist = this.cryptoService.getDecryptedItem(
              Constants.COUPON
            );
            this.couponExist_oh = true;
            this.isRequestPending = true;
            this.isCouponValid = true;
            this.couponCode = this.couponExist.coupon.code;
            const discountPercentage = parseFloat(
              this.couponExist.coupon?.value
            );
            this.discountAmount = (this.totalAmount * discountPercentage) / 100;

            this.totalAmount =
              parseInt(this.totalAmount) - parseInt(this.discountAmount);

            this.isAmountCalculating = false;
          }

          this.cryptoService.setEncryptedItem(
            Constants.LE_DJAI,
            this.totalAmount
          );

          this.annulationAmount =
            (this.totalAmount *
              parseFloat(this.roomdetails?.cancellation_value)) /
            100;
          this.isAmountCalculating = false;
        },
        (error) => {
          // console.log('Error calculate booking amount : \n', error);
        }
      );
  }
  // }
}
