import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CryptoService } from '../../services/crypto/crypto.service';
import { Constants } from '../../constants.ts/constants';
import { Endpoint } from '../../constants.ts/enpoint';
import { City } from '../../models/city';
import { Functions } from '../../services/api/function';
import { Subscription } from 'rxjs';
import * as countriesData from '../../data/countries.json';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  public citiesList!: City[];
  roomTypeList: any[] = [];
  showSnackbar: boolean = false;
  submittingForm: boolean = false;
  date!: Date;
  arrival_at!: Date;
  departure_at!: Date;
  cities!: any[];
  minDate!: Date;
  arrival_at_minDate!: Date;
  departure_at_minDate!: Date;
  roomTypesOptions: any[] = [];
  citiesOptions: any[] = [];

  selectedCountry: any;
  selectedCity: any;
  municipalities: any[] = [];
  public rechercheAvance = true;

  countries!: any[];

  selectedLodge: any;

  selectedCity2: any;
  countries_: any[] = [];

  propertyTypes!: any[];
  selectedPropertyType: any;
  subPropertyTypes!: any[];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private cryptoService: CryptoService,
    private functions: Functions
  ) {
    this.getCities();
    this.getRoomsType();
    // const tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // this.bookingForm.get('departure_at')?.setValue(tomorrow);

    // Initialisez le formulaire
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
      sub_type_house_id: [''],
      nbr_room: ['1'],
      municipality_id: [''],
      country_id: [''],
    });

    this.arrival_at_minDate = new Date();
    this.departure_at_minDate = new Date();
  }

  onPropertyTypeChange(): void {
    const selectedPropertyTypeId = parseInt(
      this.bookingForm.get('type_house_id')?.value
    );

    console.log('Selected Property Type ID:', selectedPropertyTypeId);

    this.selectedPropertyType = this.roomTypeList.find(
      (propertyType) => propertyType.id === selectedPropertyTypeId
    );

    console.log('Selected Property Type:', this.selectedPropertyType);

    this.subPropertyTypes = this.selectedPropertyType
      ? this.selectedPropertyType.children
      : [];

    console.log('Sub Property Types:', this.subPropertyTypes);
  }

  onCountryChange(): void {
    const selectedCountryId = parseInt(
      this.bookingForm.get('country_id')?.value
    );
    console.log('Selected Country ID Type:', typeof selectedCountryId);
    console.log('Selected Country ID:', selectedCountryId);

    console.log('All Countries:', this.countries);
    this.selectedCountry = this.countries
      ? this.countries.find((country) => country.id === selectedCountryId)
      : null;
    console.log('Selected Country:', this.selectedCountry);

    this.cities = this.selectedCountry ? this.selectedCountry.cities : [];
    console.log('Cities:', this.cities);

    this.selectedCity = null;
    this.municipalities = [];
    console.log('Selected City and Municipalities reset.');
  }

  onCityChange(): void {
    const selectedCityId = parseInt(this.bookingForm.get('city_id')?.value);
    this.selectedCity = this.cities.find((city) => city.id === selectedCityId);
    this.municipalities = this.selectedCity
      ? this.selectedCity.municipalities
      : [];
  }

  public getCountries() {
    this.apiService.getItems(Endpoint.COUNTRIES).subscribe((response) => {
      this.countries = response.data;

      console.log('LA REPO?N: ', this.countries);
    });
  }

  public inputDateChanged(): void {
    console.log(this.departure_at);
    console.log(this.date);
  }

  onSubmit() {
    this.submittingForm = true;
    console.log(this.roomTypeList);
    // if (this.bookingForm.value) {
    const arrivalDate = this.bookingForm.get('arrival_at')?.value ?? null;
    const departureDate = this.bookingForm.get('departure_at')?.value ?? null;
    console.log(this.bookingForm.get('municipality_id')?.value?.id);

    this.bookingForm.value.arrival_at = this.functions.formatDate(arrivalDate);
    this.bookingForm.value.departure_at =
      this.functions.formatDate(departureDate);
    // this.bookingForm.value.municipality_id =
    //   this.bookingForm.get('municipality_id')?.value?.id;

    // this.bookingForm.value.type_house_id = `${
    //   this.bookingForm.get('type_house_id')?.value?.id
    // }`;
    // }

    const formData = this.bookingForm.value;
    console.log(formData);

    localStorage.setItem('infoRes', JSON.stringify(formData));
    this.cryptoService.setEncryptedItem(Constants.QUERY_PARAMS, formData);
    this.router.navigate(['/room-grid'], { queryParams: formData });
    setTimeout(() => {
      this.submittingForm = false;
    }, 300);
  }

  ngOnInit(): void {
    this.getCountries();
    this.bookingForm
      .get('arrival_at')
      ?.valueChanges.subscribe(
        (selectedArrivalDate: string | number | Date) => {
          this.departure_at_minDate = new Date(selectedArrivalDate);
          this.departure_at_minDate.setDate(
            this.departure_at_minDate.getDate() + 1
          );
          const newDepartureDate = new Date(this.departure_at_minDate);
          newDepartureDate.setDate(newDepartureDate.getDate());
          this.bookingForm.get('departure_at')?.setValue(newDepartureDate);
        }
      );

    const storedData: any = this.cryptoService.getDecryptedItem(
      Constants.QUERY_PARAMS
    );

    if (storedData) {
      this.bookingForm.patchValue({
        arrival_at:
          this.functions.formatStringToDate(storedData?.arrival_at) || '',
        departure_at:
          this.functions.formatStringToDate(storedData?.departure_at) || '',
        nbr_people: storedData?.nbr_people || '',
        city_id: storedData?.city_id || '',
        type_house_id: storedData?.type_house_id || '',
        nbr_room: storedData?.nbr_room || '',
        nbr_bathroom: storedData?.nbr_bathroom || '',
        municipality_id: storedData?.municipality_id || '',
        country_id: storedData?.country_id || '',
      });
    }
  }

  public getCities() {
    this.apiService.getItems(Endpoint.CITIES).subscribe((data) => {
      this.citiesList = data.data;
      // Map the citiesList to the format expected by PrimeNG Dropdown
      this.citiesOptions = this.citiesList.map((city) => ({
        label: city.name,
        value: city.id,
      }));
    });

    // this.apiService.getCountries().subscribe((data) => {
    //   this.countries_ = data;
    // });
  }

  public getRoomsType() {
    this.apiService.getItems(Endpoint.TYPE_ROOM).subscribe((data) => {
      this.roomTypeList = data.data;

      // Map the roomTypeList to the format expected by PrimeNG Dropdown
      this.roomTypesOptions = this.roomTypeList.map((roomType) => ({
        label: roomType.name,
        value: roomType.id,
      }));
    });
  }

  // gestion des dates

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
}
