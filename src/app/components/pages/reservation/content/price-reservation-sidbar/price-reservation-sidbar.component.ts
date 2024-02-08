import { Component } from '@angular/core';
import { RoomHelperService } from 'src/app/components/services/room-helper.service';

@Component({
  selector: 'app-price-reservation-sidbar',
  templateUrl: './price-reservation-sidbar.component.html',
  styleUrls: ['./price-reservation-sidbar.component.css'],
})
export class PriceReservationSidbarComponent extends RoomHelperService {}
