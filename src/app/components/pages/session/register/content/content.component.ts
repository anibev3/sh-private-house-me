import { Component } from '@angular/core';
// import { RoomHelperService } from '../../../../services/room-helper.service';
import { ApiService } from 'src/app/components/services/api/api.service';
import { ProfilHelperService } from 'src/app/components/services/profil-helper.service';
import { SessionHelperService } from 'src/app/components/services/session-helper.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent extends SessionHelperService {}
