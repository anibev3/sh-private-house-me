import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { CryptoService } from './crypto.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Functions } from '../api/function';

@Injectable({
  providedIn: 'root',
})
export class BookingFormService {
  bookingForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    public cryptoService: CryptoService,
    public calendar: NgbCalendar,
    private functions: Functions
  ) {}

  public initialiseBookingForm(): void {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Initialisez le formulaire
    this.bookingForm = this.fb.group({
      arrival_at: [new Date()],
      departure_at: [tomorrow],
      nbr_bathroom: ['1'],
      nbr_people: ['1'],
      city_id: [''],
      type_house_id: [''],
      nbr_room: ['1'],
    });
  }
}
