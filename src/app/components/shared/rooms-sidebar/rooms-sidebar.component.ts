import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { CryptoService } from '../../services/crypto/crypto.service';
import { Constants } from '../../constants.ts/constants';
import { DatePipe } from '@angular/common';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RoomChildren, TypeRoom } from '../../models/typeRoom';
import { Endpoint } from '../../constants.ts/enpoint';

@Component({
  selector: 'app-rooms-sidebar',
  templateUrl: './rooms-sidebar.component.html',
  styleUrls: ['./rooms-sidebar.component.css'],
})
export class RoomsSidebarComponent implements OnInit {
  @Input() displayText: boolean = false;
  bookingForm!: FormGroup;
  public queryParams: any;

  // ---------------
  roomTypeList: any[] = [];
  showSnackbar: boolean = false;
  submittingForm: boolean = false;
  date!: Date;
  arrival_at!: Date;
  departure_at!: Date;

  minDate!: Date;
  arrival_at_minDate!: Date;
  departure_at_minDate!: Date;
  roomTypesOptions: any[] = [];
  citiesOptions: any[] = [];
  // --------------

  // arrival_at: any;
  // departure_at: any;
  city_id: any;
  type_house_id: any;
  name: any;
  nbr_bathroom: any;
  nbr_room: any;
  nbr_people: any;
  public displayText_!: boolean;
  public typeRoom: TypeRoom | null = null;
  public roomChildren: RoomChildren | null = null;

  roomChildrenArray: RoomChildren[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private roote: ActivatedRoute,
    private router: Router,
    private cryptoService: CryptoService,
    private datePipe: DatePipe,
    private calendar: NgbCalendar,
    private route: ActivatedRoute
  ) {
    // Initialize the minDate for arrival_at to today's date
    this.arrival_at_minDate = new Date();
    // Initialize the minDate for departure_at to today's date
    this.departure_at_minDate = new Date();
  }

  ngOnInit(): void {
    this.initForm();
    this.getSubType(this.type_house_id);
    this.displayText_ = this.displayText;

    this.bookingForm
      .get('arrival_at')
      ?.valueChanges.subscribe((selectedArrivalDate) => {
        // Set the minDate for departure_at to be the day after the selected arrival date
        this.departure_at_minDate = new Date(selectedArrivalDate);
        this.departure_at_minDate.setDate(
          this.departure_at_minDate.getDate() + 1
        );
        // Update the value of departure_at to be arrival_at + 1 day
        const newDepartureDate = new Date(this.departure_at_minDate);
        newDepartureDate.setDate(newDepartureDate.getDate());

        this.bookingForm.get('departure_at')?.setValue(newDepartureDate);

        // console.log(
        //   'VALEUR DE DEPARTURE',
        //   this.departure_at_minDate.getDate() + 1,
        //   this.departure_at_minDate
        // );
      });
  }

  public getSubType(typeId: any) {
    this.apiService.getItems(Endpoint.TYPE_ROOM).subscribe((data) => {
      this.typeRoom = data;

      if (this.typeRoom) {
        const selectedType = this.typeRoom.data.find(
          (type) => type.id === parseInt(typeId)
        );
        if (selectedType) {
          // Sort the children based on your criteria
          const sortedChildren = selectedType.children.sort((a, b) => {
            // Implement your sorting logic here
            // Example: Sort by id in ascending order
            return a.id - b.id;
          });

          // Store the sorted children in an array
          this.roomChildrenArray = sortedChildren;
        }
      }
    });
  }

  public makeFilter() {
    if (
      this.bookingForm.value.sub_type_house_id != '' ||
      this.bookingForm.value.sub_type_house_id != null
    ) {
      this.bookingForm.value.type_house_id =
        this.bookingForm.value.sub_type_house_id;
    }
    const formData = this.bookingForm.value;
    const encryptedAvanceFilterData = btoa(JSON.stringify(formData)); // Cryptage du coupon le coupon
    localStorage.setItem(
      'encryptedAvanceFilterData',
      encryptedAvanceFilterData
    );
    this.cryptoService.setEncryptedItem(Constants.QUERY_PARAMS, formData);
    // Créer une copie de l'objet queryParams
    const newQueryParams = { ...formData };
    // Supprimer les paramètres existants
    const navigationExtras: NavigationExtras = {
      replaceUrl: true,
    };
    // Naviguer avec les nouveaux paramètres
    this.router.navigate(['/room-grid'], {
      queryParams: newQueryParams,
      ...navigationExtras,
    });
    // Rafraîchir la page
    //
    setTimeout(() => {
      // this.isCouponValid = null;
      location.reload();
    }, 1000);
  }

  initForm(): void {
    let infoRes: any;
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    infoRes = this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS);

    if (
      this.route.snapshot.queryParamMap.get('arrival_at') &&
      this.route.snapshot.queryParamMap.get('departure_at')
    ) {
      this.queryParams = {
        arrival_at: this.route.snapshot.queryParamMap.get('arrival_at'),
        departure_at: this.route.snapshot.queryParamMap.get('departure_at'),
        city_id: this.route.snapshot.queryParamMap.get('city_id'),
        type_house_id: this.route.snapshot.queryParamMap.get('type_house_id'),
        name: this.route.snapshot.queryParamMap.get('name'),
        nbr_bathroom: this.route.snapshot.queryParamMap.get('nbr_bathroom'),
        nbr_room: this.route.snapshot.queryParamMap.get('nbr_room'),
        nbr_people: this.route.snapshot.queryParamMap.get('nbr_people'),
      };

      this.cryptoService.setEncryptedItem(
        Constants.QUERY_PARAMS,
        this.queryParams
      );
      this.bookingForm = this.fb.group({
        arrival_at: [this.queryParams.arrival_at || today],
        departure_at: [this.queryParams.departure_at || tomorrow],
        nbr_people: [this.queryParams.nbr_people || '1'],
        city_id: [this.queryParams.city_id || ''],
        type_house_id: [this.queryParams.type_house_id || ''],
        nbr_room: [this.queryParams.nbr_room || '1'],
        name: [''],
        nbr_bathroom: [this.queryParams.nbr_bathroom || '1'],
        // sub_type_house_id: [''],
      });
    } else if (infoRes) {
      this.bookingForm = this.fb.group({
        arrival_at: [infoRes.arrival_at || today],
        departure_at: [infoRes.departure_at || tomorrow],
        nbr_people: [infoRes.nbr_people || '1'],
        city_id: [infoRes.city_id || ''],
        type_house_id: [infoRes.type_house_id || ''],
        nbr_room: [infoRes.nbr_room || '1'],
        name: [''],
        nbr_bathroom: [infoRes.nbr_bathroom || '1'],
        // sub_type_house_id: [''],
      });
    } else {
      this.bookingForm = this.fb.group({
        arrival_at: today,
        departure_at: tomorrow,
        nbr_people: ['1'],
        city_id: [''],
        type_house_id: [''],
        nbr_room: ['1'],
        name: [''],
        nbr_bathroom: ['1'],
        // sub_type_house_id: [''],
      });
    }
  }

  // Fonctions pour incrémenter et décrémenter
}
