import { AfterContentInit, Component, OnInit } from '@angular/core';
import { RoomHelperService } from '../../../services/room-helper.service';
import { ApiService } from 'src/app/components/services/api/api.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/components/constants.ts/constants';
import { ListRoom } from 'src/app/components/models/listRoom';
import { Endpoint } from 'src/app/components/constants.ts/enpoint';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, AfterContentInit {
  // //  -------------------------------------------
  public query_params: any;
  public isGetFilterPending: boolean = false;
  public isLodgeEmpty: boolean = false;

  public isOnce: boolean = false;
  public showFiltre: boolean = false;

  public arrival_at: any;
  public departure_at: any;
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';

  public city_id: any;
  public type_house_id: any;

  public dataIsOk: boolean = false;
  public isUserConnected: boolean = false;
  public formData: any;

  page: number = 1;
  public logements!: ListRoom[];
  public topRooms!: ListRoom[];
  public display: boolean = false;
  // public logements: any[] = [];

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    public cryptoService: CryptoService,
    public calendar: NgbCalendar
  ) {}

  public showDrop1() {
    this.showFiltre = !this.showFiltre;
  }

  public ngOnInit() {
    this.getQueryParams();
    this.arrival_at = this.route.snapshot.queryParamMap.get('arrival_at');
    this.departure_at = this.route.snapshot.queryParamMap.get('departure_at');
    this.city_id = this.route.snapshot.queryParamMap.get('city_id');
    this.type_house_id = this.route.snapshot.queryParamMap.get('type_house_id');

    this.formData = {
      arrival_at: this.route.snapshot.queryParamMap.get('arrival_at'),
      departure_at: this.route.snapshot.queryParamMap.get('departure_at'),
      city_id: this.route.snapshot.queryParamMap.get('city_id'),
      type_house_id: this.route.snapshot.queryParamMap.get('type_house_id'),
      nbr_people: this.route.snapshot.queryParamMap.get('nbr_people'),
      nbr_room: this.route.snapshot.queryParamMap.get('nbr_room'),
      name: this.route.snapshot.queryParamMap.get('name'),
      nbr_bathroom: this.route.snapshot.queryParamMap.get('nbr_bathroom'),
    };

    this.getLodge(this.formData);
  }

  public getQueryParams(): void {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
    }
  }

  // Dans votre composant TypeScript
  getMarkDescription(mark: number): string {
    if (mark >= 0 && mark <= 1) {
      return 'Mauvais';
    } else if (mark > 1 && mark <= 2) {
      return 'Médiocre';
    } else if (mark > 2 && mark <= 3) {
      return 'Moyen';
    } else if (mark > 3 && mark <= 4) {
      return 'Bon';
    } else if (mark > 4 && mark <= 5) {
      return 'Superbe';
    } else {
      // Gérer d'autres cas si nécessaire
      return 'Inconnu';
    }
  }

  public getLodge(formData: any) {
    this.isGetFilterPending = true;

    this.apiService
      .searchRooms('filter-rooms', {
        arrival_at: formData.arrival_at,
        departure_at: formData.departure_at,
        nbr_people: formData.nbr_people,
        city_id: formData.city_id,
        type_house_id: formData.type_house_id,
        nbr_room: formData.nbr_room,
        name: formData.name,
        nbr_bathroom: formData.nbr_bathroom,
      })
      .subscribe(
        (response) => {
          this.logements = response.data;

          if (response?.data.length < 1) {
            this.isLodgeEmpty = true;
            this.getTopLogde();
          }

          this.isGetFilterPending = false;
          this.dataIsOk = true;
        },
        (error) => {
          console.error('Erreur lors de la recherche de chambres : ', error);
          this.isGetFilterPending = false;
        }
      );
  }

  ngAfterContentInit(): void {
    this.userStatus();
  }

  public userStatus() {
    this.isUserConnected = this.cryptoService.isUserLoggedIn();
  }

  public getTopLogde() {
    this.apiService.getItems(Endpoint.TOP_ROOMS).subscribe(
      (response) => {
        this.topRooms = response?.data;
        // console.log('GetTopLodge');
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  showDialog() {
    this.display = true;
  }
}
