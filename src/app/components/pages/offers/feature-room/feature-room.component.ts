import { Component } from '@angular/core';
import { RoomHelperService } from '../../../services/room-helper.service';
import { HomehelperService } from 'src/app/components/services/home-helper.service';

@Component({
  selector: 'app-feature-room',
  templateUrl: './feature-room.component.html',
  styleUrls: ['./feature-room.component.css'],
})
export class FeatureRoomComponent extends HomehelperService {}
