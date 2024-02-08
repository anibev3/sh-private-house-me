// navigation.service.ts
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CryptoService } from '../../services/crypto/crypto.service';
import { Constants } from '../../constants.ts/constants';
import { Endpoint } from '../../constants.ts/enpoint';
import { Functions } from '../api/function';

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements OnInit {
  bookingForm!: FormGroup;
  public citiesList: any;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private cryptoService: CryptoService,
    private functions: Functions
  ) {}

  goBack(): void {
    this.location.back();
  }

  navigateToPage(pageUrl: string): void {
    this.router.navigateByUrl(pageUrl);
  }

  ngOnInit(): void {
    // Initialisez le formulaire
    this.bookingForm = this.fb.group({
      arrival_at: [this.getTodayDate()],
      departure_at: [''],
      nbr_bathroom: ['1'],
      nbr_people: ['1'],
      city_id: [''],
      type_house_id: [''],
      nbr_room: ['1'],
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  dateNotBefore(controlName: string) {
    return (control: any) => {
      const controlToCompare = control?.parent?.controls[controlName];

      if (controlToCompare && control.value < controlToCompare.value) {
        return { dateNotBefore: true };
      }

      return null;
    };
  }

  onSubmit() {
    const today = new Date();
    const tomorrow_plus_1 = new Date();
    tomorrow_plus_1.setDate(today.getDate() + 1);

    const formData = {
      arrival_at: this.functions.formatDate(new Date()),
      departure_at: this.functions.formatDate(tomorrow_plus_1),
      nbr_bathroom: '1',
      nbr_people: '1',
      city_id: '',
      type_house_id: '',
      nbr_room: '1',
    };

    localStorage.setItem('infoRes', JSON.stringify(formData));
    this.cryptoService.setEncryptedItem(Constants.QUERY_PARAMS, formData);
    return this.router.navigate(['/room-grid'], { queryParams: formData });
  }
}
