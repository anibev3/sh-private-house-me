import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, forkJoin } from 'rxjs';
import { Constants } from 'src/app/components/constants.ts/constants';
import { QueryParams } from 'src/app/components/models/query-params';
import { Room } from 'src/app/components/models/room';
import { CalendarHelperService } from 'src/app/components/services/calendar-helper.service';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';

@Component({
  selector: 'app-rs-sidebar',
  templateUrl: './rs-sidebar.component.html',
  styleUrls: ['./rs-sidebar.component.css'],
})
export class RsSidebarComponent implements OnInit {
  @Input() currentHome: Room | undefined;

  showDateInfo: boolean = false;

  fromDate$: Observable<NgbDate | null> =
    this.calendarHelperService.fromDateObs;
  toDate$: Observable<NgbDate | null> = this.calendarHelperService.toDateObs;

  bookins_amount: any;
  numberOfDays: any;
  numberOfNights: any;
  // queryParams: QueryParams | null = null;
  queryParams: any | null = null;

  _fromDate: NgbDate | null = null;
  _toDate: NgbDate | null = null;

  room_id: any;

  isFromDate: boolean = false;
  isAmountApiIsOK: boolean = false;
  canReserved: boolean = false;
  canReservedError: boolean = false;
  isToDate: boolean = false;
  totalAmount: any;
  public nbr_people: any;

  fromDateStr: string | undefined;
  toDateStr: string | undefined;

  constructor(
    private cryptoService: CryptoService,
    private route: ActivatedRoute,
    public router: Router,
    private calendarHelperService: CalendarHelperService
  ) {
    if (cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.queryParams = cryptoService.getDecryptedItem(Constants.QUERY_PARAMS);

      // Convertir les dates au format NgbDate
      const arrivalDate = this.calendarHelperService.convertStringToDate(
        this.queryParams.arrival_at
      );
      const departureDate = this.calendarHelperService.convertStringToDate(
        this.queryParams.departure_at
      );
      this.room_id = this.route.snapshot.params.id;
      this.nbr_people = parseInt(this.queryParams.nbr_people);

      // mise a jour des variables
      this.calendarHelperService.fromDate = arrivalDate;
      this.calendarHelperService.toDate = departureDate;

      if (arrivalDate === null || arrivalDate === undefined) {
        this.isFromDate = true;
      }

      if (departureDate === null || departureDate === undefined) {
        this.isToDate = true;
      }
      // console.log(
      //   'DEPARTURE DATE OHHH :::::::::::::::>',
      //   JSON.stringify(departureDate)
      // );

      if (arrivalDate && departureDate) {
        if (
          departureDate?.day != null &&
          departureDate?.month != null &&
          departureDate?.year != 0
        ) {
          this.getAmount(
            this.room_id,
            this.queryParams.arrival_at,
            this.queryParams.departure_at
          );
        }
      }
      this.getQueryParams();
    }
  }

  public getQueryParams(): void {
    if (this.queryParams?.departure_at != '') {
      console.log('USER CAN RESERVED');

      this.canReserved = true;
    }
  }

  // dans le constru

  ngOnInit(): void {
    // console.log('current homm ::::: ', this.currentHome);
    this.fromDate$.subscribe((fromDate) => {
      // console.log('LA DATE FROM DATE ::::::::::::', fromDate);
      this._fromDate = fromDate;
      this.onDateChange();
    });

    this.toDate$.subscribe((toDate) => {
      this._toDate = toDate;
      this.onDateChange();
      // console.log('LA DATE TO  DATE ::::::::::::', toDate);
    });
  }

  // Méthode appelée lorsque les dates changent
  onDateChange(): void {
    // console.log('Arrivée :::::::>', this._fromDate);
    // console.log('Départ :::::::>', this._toDate);

    if (this._fromDate && this._toDate) {
      // console.log('On est dans la methode :::::::::::::>');
      this.fromDateStr = this.convertNgbDateToString(this._fromDate);
      this.toDateStr = this.convertNgbDateToString(this._toDate);

      const date = {
        arrival_at: this.fromDateStr,
        departure_at: this.toDateStr,
      };

      this.cryptoService.setEncryptedItem(Constants.DATE_, date);

      // console.log('Date de début en chaîne :', this.fromDateStr);
      // console.log('Date de fin en chaîne :', this.toDateStr);
      if (
        this._toDate?.day != null &&
        this._toDate?.month != null &&
        this._toDate?.year != 0
      ) {
        // console.log('ON EST A L4INTER //////////////>');

        this.getAmount(this.room_id, this.fromDateStr, this.toDateStr);
      }
    }
  }

  convertNgbDateToString(ngbDate: NgbDate): string {
    if (ngbDate) {
      // Les mois et jours sont basés sur zéro dans NgbDate, donc on ajoute 1
      const year = ngbDate.year;
      const month =
        ngbDate.month < 10 ? `0${ngbDate.month}` : ngbDate.month.toString();
      const day = ngbDate.day < 10 ? `0${ngbDate.day}` : ngbDate.day.toString();

      return `${year}-${month}-${day}`;
    }
    return '';
  }

  public showDrop1() {
    this.showDateInfo = !this.showDateInfo;
  }

  public getAmount(room_id: number, arrival_at: string, departure_at: string) {
    this.isAmountApiIsOK = true;
    // console.log('---- arriv :: ', arrival_at, departure_at);

    const arrivalDate = new Date(arrival_at);
    const departureDate = new Date(departure_at);
    // console.log('---- arriv :: ', arrivalDate, departureDate);
    const timeDifference = departureDate.getTime() - arrivalDate.getTime();
    this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    this.numberOfNights = this.numberOfDays - 1;

    // console.log('Durée du séjour en jours:', this.numberOfDays);
    // console.log('Nombre de nuits:', this.numberOfNights);

    this.calendarHelperService
      .getAmount(room_id, arrival_at, departure_at)
      .subscribe(
        (response) => {
          this.bookins_amount = response?.data;
          this.cryptoService.setEncryptedItem(
            Constants.LE_DJAI,
            this.bookins_amount
          );
          // console.log('LE DJAI ::::::>', this.bookins_amount);

          this.totalAmount = response?.data?.amount;
          this.isAmountApiIsOK = false;
          this.showDateInfo = false;
        },
        (error) => {
          // console.log('Error calculate booking amount : \n', error);
        }
      );
  }

  public gotToPayment() {
    const formData = {
      once: true,
    };

    const formDataToStore = {
      arrival_at: this.fromDateStr,
      city_id: this.queryParams.city_id,
      departure_at: this.toDateStr,
      name: this.queryParams.name,
      nbr_bathroom: this.queryParams.nbr_bathroom,
      nbr_people: this.queryParams.nbr_people,
      nbr_room: this.queryParams.nbr_room,
      type_house_id: this.queryParams.type_house_id,
      once: true,
    };

    // console.log('LA FORM DATA TO STORE :::::::::::::>', formDataToStore);

    this.cryptoService.setEncryptedItem(
      Constants.QUERY_PARAMS,
      formDataToStore
    );

    setTimeout(() => {
      return this.router.navigate([`/reservation/${this.currentHome?.id}`], {
        queryParams: formData,
      });
    }, 500);
  }

  public storeParams() {
    const formData = {
      arrival_at: this.fromDateStr,
      city_id: this.queryParams.city_id,
      departure_at: this.toDateStr,
      name: this.queryParams.name,
      nbr_bathroom: this.queryParams.nbr_bathroom,
      nbr_people: this.queryParams.nbr_people,
      nbr_room: this.queryParams.nbr_room,
      type_house_id: this.queryParams.type_house_id,
    };

    // console.log('LA FORM DATA TO STORE :::::::::::::>', formData);

    this.cryptoService.setEncryptedItem(Constants.QUERY_PARAMS, formData);

    return this.router.navigate([`/reservation/${this.currentHome?.id}`]);
  }

  public displayAlert() {
    console.log(':::::::: DISPLAY ALERTE CALLED ::::::::');

    if (this.canReserved == false) {
      this.canReservedError = true;
      setTimeout(() => {
        this.canReservedError = false;
      }, 1500);
      return;
    }
  }
}
