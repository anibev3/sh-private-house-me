import { Component } from '@angular/core';
import { ProfilHelperService } from 'src/app/components/services/profil-helper.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent extends ProfilHelperService {}
