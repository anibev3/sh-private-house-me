import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/components/constants.ts/constants';
import { Room } from 'src/app/components/models/room';
import { CalendarHelperService } from 'src/app/components/services/calendar-helper.service';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';

@Component({
  selector: 'app-calendar-sidebar',
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.css'],
})
export class CalendarSidebarComponent implements OnInit {
  @Input() currentHome: Room | undefined;

  fromDate$: Observable<NgbDate | null> =
    this.calendarHelperService.fromDateObs;
  toDate$: Observable<NgbDate | null> = this.calendarHelperService.toDateObs;

  hoveredDate: NgbDate | null = null;
  showDateInfo: boolean = false;
  fromDate!: NgbDate;
  toDate: NgbDate | null = null;

  room_detail: any;

  isRoomOk: boolean = false;
  isToDate: boolean = false;
  bookingDates: any;
  isDateOk: boolean = false;
  isFromDate: boolean = false;
  isAmountApiIsOK: boolean | null = null;

  numberOfNights: any;
  numberOfDays: any;

  totalAmount: any;
  disabledDates: any[] = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public cryptoService: CryptoService,
    public calendar: NgbCalendar,
    public calendarHelperService: CalendarHelperService
  ) {}

  ngOnInit(): void {
    //this.getQueryParams();
    this.loadExistDates();
    this.isDateOk = true;
    this.isRoomOk = true;
    this.room_detail = this.currentHome;
    this.bookingDates = this.currentHome?.booking_dates;
  }

  loadExistDates() {
    this.fromDate$.subscribe((value) => {
      if (value != null) {
        this.fromDate = value;
      }
    });

    this.toDate$.subscribe((value) => {
      this.toDate = value;
    });
  }

  onDateSelection(date: NgbDate) {
    if (this.isDateDisabled(date) || this.isDateReserved(date)) {
      // Annuler la sélection si la date est désactivée ou réservée
      return;
    }
    // console.log('==== ,', this.fromDate, '=======,', this.toDate);

    if (!this.fromDate && !this.toDate) {
      this.calendarHelperService.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      // verifier que la nouvel interval ne se superpose pas sur une autre reservation
      let listInterval: { start: NgbDate; end: NgbDate }[] | undefined =
        this.currentHome?.booking_dates?.map((item) => {
          // console.log('isInvalidInterval ', item.start_date, item.end_date);

          const start: NgbDate = this.calendarHelperService.convertStringToDate(
            item.start_date
          );
          const end: NgbDate = this.calendarHelperService.convertStringToDate(
            item.end_date
          );
          return { start, end };
        });
      // console.log('isInvalidInterval list', listInterval);

      const isInvalidInterval = this.containsArrayOfDates(
        this.fromDate,
        date,
        listInterval!
      );
      // console.log('isInvalidInterval value', isInvalidInterval);
      if (isInvalidInterval) {
        //alert("interval non valide")
      } else {
        this.calendarHelperService.toDate = date;
      }
    } else {
      this.calendarHelperService.toDate = null;
      this.calendarHelperService.fromDate = date;
    }
  }

  containsArrayOfDates(
    dateStart1: NgbDate,
    dateEnd1: NgbDate,
    itemsInterval: { start: NgbDate; end: NgbDate }[]
  ) {
    let ret: boolean = false;
    for (var i = 0; i < itemsInterval.length; i++) {
      let curInterval: { start: NgbDate; end: NgbDate } = itemsInterval[i];
      if (
        this.hasOverlap(
          dateStart1,
          curInterval.start,
          dateEnd1,
          curInterval.end
        )
      ) {
        return true;
      }
    }
    return ret;
  }

  hasOverlap(
    dateStart1: NgbDate,
    dateStart2: NgbDate,
    dateEnd1: NgbDate,
    dateEnd2: NgbDate
  ): boolean {
    // console.log('isInvalidInterval checking', dateStart1, dateStart2);
    return !(dateEnd1.before(dateStart2) || dateStart1.after(dateEnd2));
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
    const arrivalDate = new Date(arrival_at);
    const departureDate = new Date(departure_at);

    const timeDifference = departureDate.getTime() - arrivalDate.getTime();
    this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    this.numberOfNights = this.numberOfDays - 1;

    // console.log('Durée du séjour en jours:', this.numberOfDays);
    // console.log('Nombre de nuits:', this.numberOfNights);

    this.calendarHelperService
      .getAmount(room_id, arrival_at, departure_at)
      .subscribe(
        (response) => {
          this.totalAmount = response?.data?.amount;
          this.isAmountApiIsOK = false;
        },
        (error) => {
          // console.log('Error calculate booking amount : \n', error);
        }
      );
  }
}
