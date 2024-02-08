import { AfterContentInit, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api/api.service';
import { CryptoService } from './crypto/crypto.service';
import { DatePipe } from '@angular/common';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '../constants.ts/constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarHelperService implements AfterContentInit, OnInit {
  hoveredDate: NgbDate | null = null;
  showDateInfo: boolean = false;
  fromDate!: NgbDate;
  toDate: NgbDate | null = null;

  // ======

  fromRxDate: BehaviorSubject<NgbDate | undefined> = new BehaviorSubject<
    NgbDate | undefined
  >(undefined);

  toRxDate: BehaviorSubject<NgbDate | undefined> = new BehaviorSubject<
    NgbDate | undefined
  >(undefined);

  //  -------------------------------------------
  public query_params: any;
  public query_params_reserv: any;
  public user_to_store: any;
  public info_bk_user: any;
  public show_query_params: any;
  public bookins_amount: any;

  public couponExist: any;
  public couponExist_oh: boolean = false;
  public isRequestPending: boolean = false;
  public isCouponValid: boolean = false;
  public couponCode: any;
  public totalAmount: any;

  // Disponibility date value
  es: any;
  // invalidDates: Array<Date> | undefined;
  public date14!: Date;
  public date10!: Date;
  public date11!: Date;
  public rangeDates!: Date[];
  public dates!: Date[];
  public minDate!: Date;
  public maxDate!: Date;
  public bookingDates: any;
  public numberOfNights: any;
  public numberOfDays: any;
  public room_detail: any;
  public disabledDates: any[] = [];
  invalidDates: Array<Date> = [];
  public isDateOk: boolean = false;
  public isRoomOk: boolean = false;
  public isFromDate: boolean = false;
  public isToDate: boolean = false;
  public isAmountApiIsOK: boolean | null = null;

  selectedStartDate: NgbDate | null = null;
  // ----------------------------------------------
  public isGetFilterPending: boolean = false;
  public isLodgeEmpty: boolean = false;
  // ----------------------------------------------
  bookingForm!: FormGroup;
  fromObs: Observable<NgbDate | undefined>;
  toObs: Observable<NgbDate | undefined>;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    private roote: ActivatedRoute,
    public router: Router,
    public cryptoService: CryptoService,
    private datePipe: DatePipe,
    public calendar: NgbCalendar
  ) {
    if (cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.query_params_reserv = cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );

      // Convertir les dates au format NgbDate
      const arrivalDate = this.convertStringToDate(
        this.query_params_reserv.arrival_at
      );
      const departureDate = this.convertStringToDate(
        this.query_params_reserv.departure_at
      );

      this.fromDate = arrivalDate;
      this.toDate = departureDate;

      if (this.fromDate === null || this.fromDate === undefined) {
        this.isFromDate = true;
      }

      if (this.isToDate === null || this.isToDate === undefined) {
        this.isToDate = true;
      }

      if (this.toDate && this.fromDate) {
        const room_id = this.route.snapshot.params.id;
        this.getAmount(
          room_id,
          this.query_params_reserv.arrival_at,
          this.query_params_reserv.departure_at
        );
      }
    }

    this.fromObs = this.fromRxDate.asObservable();
    this.toObs = this.toRxDate.asObservable();

    this.fromRxDate.subscribe({
      next(value) {
        // console.log('actuelle vauue :: ', value);
      },
    });
  }

  public showDrop1() {
    this.showDateInfo = !this.showDateInfo;
  }

  convertStringToDate(dateString: string): NgbDate {
    const [year, month, day] = dateString.split('-').map(Number);
    return new NgbDate(year, month, day);
  }

  public ngOnInit() {
    this.getQueryParams();
    this.setRoom(this.route.snapshot.params.id);
  }

  public getQueryParams(): void {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
      // console.log('QUERY PARAMS', this.query_params);
    }
  }

  /*********************************************
   ************ Radio group ********************
   *********************************************/
  // Single Room
  public setRoom(id: any) {
    // console.log('VOICI LA RESIDENCE SELECTIONNEE \n');
    this.apiService.getItemById('rooms', id).subscribe((response) => {
      this.bookingDates = response.data.booking_dates;
      this.room_detail = response.data;
      this.isDateOk = true;
      this.isRoomOk = true;
    });
  }

  onDateSelection(date: NgbDate) {
    if (this.isDateDisabled(date) || this.isDateReserved(date)) {
      // Annuler la sélection si la date est désactivée ou réservée
      return;
    }

    // console.log('==== ,', this.fromDate, '=======,', this.toDate);

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.fromRxDate.next(date);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.toRxDate.next(date);
    } else {
      this.toRxDate.next(undefined);
      this.toDate = null;
      this.fromDate = date;
      this.fromRxDate.next(date);
    }

    if (this.toDate && this.fromDate) {
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  // Ajoutez cette méthode à votre composant NgbdDatepickerRange pour vérifier si une date est désactivée
  isDateDisabled(date: NgbDate): boolean {
    const today = new Date();
    const currentDate = new NgbDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    // Compare la date avec la date actuelle
    if (date.before(currentDate)) {
      return true; // Désactiver la date si elle est antérieure à aujourd'hui
    }
    return false; // Autoriser la sélection si la date n'est pas antérieure à aujourd'hui
  }

  // Ajoutez cette méthode à votre composant NgbdDatepickerRange pour vérifier si une plage de dates intersecte une période réservée
  isDateRangeReserved(startDate: NgbDate, endDate: NgbDate): boolean {
    for (const bookingDate of this.bookingDates) {
      const reservationStart = NgbDate.from({
        year: parseInt(bookingDate.start_date.substring(6, 10)),
        month: parseInt(bookingDate.start_date.substring(3, 5)),
        day: parseInt(bookingDate.start_date.substring(0, 2)),
      });
      const reservationEnd = NgbDate.from({
        year: parseInt(bookingDate.end_date.substring(6, 10)),
        month: parseInt(bookingDate.end_date.substring(3, 5)),
        day: parseInt(bookingDate.end_date.substring(0, 2)),
      });
      if (
        !(endDate.before(reservationStart) || startDate.after(reservationEnd))
      ) {
        return true; // Désactiver la plage de dates si elle intersecte une période réservée
      }
    }
    return false; // Autoriser la sélection si la plage de dates n'intersecte aucune période réservée
  }

  // Ajoutez cette méthode à votre composant NgbdDatepickerRange pour vérifier si une date est réservée
  isDateReserved(date: NgbDate): boolean {
    for (const bookingDate of this.bookingDates) {
      const startDate = NgbDate.from({
        year: parseInt(bookingDate.start_date.substring(0, 4)),
        month: parseInt(bookingDate.start_date.substring(5, 7)),
        day: parseInt(bookingDate.start_date.substring(8, 10)),
      });
      const endDate = NgbDate.from({
        year: parseInt(bookingDate.end_date.substring(0, 4)),
        month: parseInt(bookingDate.end_date.substring(5, 7)),
        day: parseInt(bookingDate.end_date.substring(8, 10)),
      });
      if (
        date.equals(startDate) ||
        date.equals(endDate) ||
        (date.after(startDate) && date.before(endDate))
      ) {
        return true; // Désactiver la date si elle est réservée
      }
    }
    return false; // Autoriser la sélection si la date n'est pas réservée
  }

  public getAmount(room_id: any, arrival_at: any, departure_at: any) {
    this.isAmountApiIsOK = true;
    // if (this.cryptoService.getDecryptedItem(Constants.COUPON)) {
    //   this.couponExist = this.cryptoService.getDecryptedItem(Constants.COUPON);
    //   this.couponExist_oh = true;
    //   this.isRequestPending = true;
    //   this.isCouponValid = true;
    //   this.couponCode = this.couponExist.coupon.code;
    //   this.totalAmount = this.couponExist.totalAmount;
    // } else {

    const formData = {
      room_id: parseInt(room_id),
      start_date: arrival_at,
      end_date: departure_at,
    };

    const arrivalDate = new Date(arrival_at);
    const departureDate = new Date(departure_at);

    const timeDifference = departureDate.getTime() - arrivalDate.getTime();
    this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Nombre de nuits est le nombre de jours moins 1 (car la dernière nuit est incluse)
    this.numberOfNights = this.numberOfDays - 1;

    // console.log('Durée du séjour en jours:', this.numberOfDays);
    // console.log('Nombre de nuits:', this.numberOfNights);

    this.apiService
      .createItem('bookings/calculate-amounts', formData)
      .subscribe(
        (response) => {
          this.bookins_amount = response?.data;
          this.cryptoService.setEncryptedItem(
            Constants.LE_DJAI,
            this.bookins_amount
          );
          // alert(JSON.stringify(response.data));
          this.totalAmount = response?.data?.amount;
          // console.log('MONTANT TOTALS', JSON.stringify(response.data));
          // console.log('MONTANT TOTAL: ', this.totalAmount);
          this.isAmountApiIsOK = false;
        },
        (error) => {
          // console.log('Error calculate booking amount : \n', error);
        }
      );
    // }
  }

  ngAfterContentInit(): void {}
}
