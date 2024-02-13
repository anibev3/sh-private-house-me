import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/components/constants.ts/constants';
import { Endpoint } from 'src/app/components/constants.ts/enpoint';
import { ApiService } from 'src/app/components/services/api/api.service';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
// export class ContentComponent extends RoomHelperService {
export class ContentComponent implements OnInit, AfterContentInit {
  roomId: any;
  dataFromShGlobal: any;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    public cryptoService: CryptoService,
    public calendar: NgbCalendar
  ) {}
  ngOnInit(): void {
    // this.setRoom(this.route.snapshot.params.id);
    this.setRoom(this.route.snapshot.params.id);
    this.getQueryParams();
  }
  zoom: number = 12;
  lat: number = 31.53912;
  lng: number = -89.29163;

  showFullDescription = false;
  showFullAnnulation = false;
  maxDisplayedChars = 200;

  public canReserved: boolean = false;
  public canReservedError: boolean = false;

  selectedImageIndex: number = 0;

  settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    centerMode: true,
    asNavFor: '.room-content-slider',
    centerPadding: '6%',
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          centerPadding: '15%',
        },
      },
    ],
  };

  settingsThumb = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    asNavFor: '.rooms-slider-one',
  };

  updateSelectedImage(index: number): void {
    this.selectedImageIndex = index;
  }
  //  -------------------------------------------
  public query_params: any;

  public isRoomOk: boolean = false;

  public isUserConnected: boolean = false;

  userInfo: any;

  public roomdetails: any;
  public laResidence: any;

  public reservationInfo: any;
  public tvaAmount: any;
  public serviceAmount = 0;
  public numberOfNights: any;
  public numberOfDays: any;

  toggleShowFullDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
  toggleShowFullAnnulation() {
    this.showFullAnnulation = !this.showFullAnnulation;
  }

  public getQueryParams(): void {
    this.route.queryParams.subscribe((queryParams) => {
      if (
        queryParams['arrival_at'] &&
        queryParams['departure_at'] &&
        queryParams['nbr_people']
      ) {
        this.dataFromShGlobal = {
          arrival_at: queryParams['arrival_at'],
          city_id: queryParams['city_id'],
          departure_at: queryParams['departure_at'],
          nbr_bathroom: '1',
          nbr_people: queryParams['nbr_people'],
          nbr_room: '1',
          type_house_id: queryParams['type_house_id'],
        };

        this.cryptoService
          .setEncryptedItemNew(Constants.QUERY_PARAMS, this.dataFromShGlobal)
          .then(() => this.processQueryParams());
      } else {
        this.processQueryParams();
      }
    });
  }

  private processQueryParams(): void {
    if (this.cryptoService.getDecryptedItem(Constants.QUERY_PARAMS)) {
      this.query_params = this.cryptoService.getDecryptedItem(
        Constants.QUERY_PARAMS
      );
      console.log('LA QUERY PARAMS', this.query_params);

      if (
        this.query_params?.departure_at != '' &&
        this.query_params?.arrival_at != ''
      ) {
        console.log('USER CAN RESERVED');
        this.canReserved = true;
      }
    }
  }

  public setRoom(id: any) {
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];
    });

    this.apiService
      .getItemById(Endpoint.SING_ROOM, this.roomId)
      .subscribe((response) => {
        this.roomdetails = response.data;
        localStorage.setItem('laResidence', JSON.stringify(response.data));
        this.cryptoService.setEncryptedItem(
          Constants.SELECTED_ROOM,
          response.data
        );
        this.isRoomOk = true;
      });
  }

  public getArrivalDateFromLocalStorage() {
    // Récupérer la chaîne JSON du localStorage
    const reservationInfoString = localStorage.getItem('infoRes');
    const laResidence = localStorage.getItem('laResidence');

    // Vérifier si la chaîne est non nulle
    if (reservationInfoString) {
      // Convertir la chaîne JSON en objet JavaScript
      this.reservationInfo = JSON.parse(reservationInfoString);

      const arrivalDate = new Date(this.reservationInfo.arrival_at);
      const departureDate = new Date(this.reservationInfo.departure_at);

      const timeDifference = departureDate.getTime() - arrivalDate.getTime();
      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      // Nombre de nuits est le nombre de jours moins 1 (car la dernière nuit est incluse)
      this.numberOfNights = this.numberOfDays - 1;
    } else {
      // console.log(
      //   'Aucune information de réservation trouvée dans le localStorage.'
      // );
    }

    if (laResidence) {
      this.laResidence = JSON.parse(laResidence);
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

  ngAfterContentInit(): void {
    this.getArrivalDateFromLocalStorage();
    this.userStatus();
  }

  public userStatus() {
    this.isUserConnected = this.cryptoService.isUserLoggedIn();
  }

  public gotToPayment() {
    if (this.canReserved == false) {
      this.canReservedError = true;
      setTimeout(() => {
        this.canReservedError = false;
      }, 1500);
      return;
    }
    const formData = {
      once: true,
    };

    return this.router.navigate([`/reservation/${this.roomdetails?.id}`], {
      queryParams: formData,
    });
  }
}
