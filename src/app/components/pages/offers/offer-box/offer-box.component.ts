import { Component } from '@angular/core';
import { RoomHelperService } from '../../../services/room-helper.service';
import { HomehelperService } from 'src/app/components/services/home-helper.service';

@Component({
  selector: 'app-offer-box',
  templateUrl: './offer-box.component.html',
  styleUrls: ['./offer-box.component.css'],
})
export class OfferBoxComponent extends HomehelperService {}
