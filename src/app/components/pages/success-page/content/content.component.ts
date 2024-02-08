import { Component, OnInit } from '@angular/core';
import { RoomHelperService } from '../../../services/room-helper.service';
import { ApiService } from 'src/app/components/services/api/api.service';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';
import { Constants } from 'src/app/components/constants.ts/constants';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  public successData: any;
  public numberOfDays: any;
  public numberOfNights: any;
  public dataIsOk: boolean = false;
  mapOptions = {
    mapTypeId: 'satellite',
  };
  public annulationAmount: any;
  constructor(private crypstoService: CryptoService) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    if (
      this.crypstoService.getDecryptedItem(Constants.SUCCESS_RESERVATION_DATA)
    ) {
      this.successData = this.crypstoService.getDecryptedItem(
        Constants.SUCCESS_RESERVATION_DATA
      );
    }

    const arrivalDate = new Date(this.successData.start_date);
    const departureDate = new Date(this.successData.end_date);

    const timeDifference = departureDate.getTime() - arrivalDate.getTime();
    this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Nombre de nuits est le nombre de jours moins 1 (car la dernière nuit est incluse)
    this.numberOfNights = this.numberOfDays - 1;

    // console.log('Durée du séjour en jours:', this.numberOfDays);
    // console.log('Nombre de nuits:', this.numberOfNights);

    // Afficher la date d'arrivée dans la console ou où vous le souhaitez
    // console.log("Date d'arrivée : ", arrivalDate);
    // console.log('LES SUCCESS DATA', this.successData);

    this.annulationAmount =
      (this.successData.booking.amount *
        parseFloat(this.successData?.booking?.room?.room?.cancellation_value)) /
      100;

    this.dataIsOk = true;
  }
}
