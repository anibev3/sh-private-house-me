import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarHelperService {
  fromRxDate: BehaviorSubject<NgbDate | null> =
    new BehaviorSubject<NgbDate | null>(null);
  toRxDate: BehaviorSubject<NgbDate | null> =
    new BehaviorSubject<NgbDate | null>(null);
  //  -------------------------------------------

  public set fromDate(value: NgbDate | null) {
    this.fromRxDate.next(value);
  }

  public set toDate(value: NgbDate | null) {
    this.toRxDate.next(value);
  }
  // ----------------------------------------------

  fromDateObs: Observable<NgbDate | null> = this.fromRxDate.asObservable();
  toDateObs: Observable<NgbDate | null> = this.toRxDate.asObservable();

  constructor(private apiService: ApiService, public calendar: NgbCalendar) {}

  convertStringToDate(dateString: string): NgbDate {
    // console.log('LA DATE ::::::::::> ', dateString);
    if (typeof dateString !== 'string') {
      throw new Error('Invalid date string format');
    }

    // if (typeof dateString !== 'string') {
    //    console.error('Invalid input: dateString must be a string');
    //    return 'null';
    // }

    dateString = dateString.split(' ')[0];
    const [year, month, day] = dateString.split('-').map(Number);
    return new NgbDate(year, month, day);
  }

  public setRoom(id: any) {
    // console.log('VOICI LA RESIDENCE SELECTIONNEE \n');
    return this.apiService.getItemById('rooms', id);
  }

  public getAmount(room_id: any, arrival_at: any, departure_at: any) {
    const formData = {
      room_id: parseInt(room_id),
      start_date: arrival_at,
      end_date: departure_at,
    };

    return this.apiService.createItem('bookings/calculate-amounts', formData);
  }
}
