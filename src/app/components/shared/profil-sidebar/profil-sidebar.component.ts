import { Component } from '@angular/core';
import twitterpost from '../../data/twitterpost.json';
import { ProfilHelperService } from '../../services/profil-helper.service';

@Component({
  selector: 'app-profil-sidebar',
  templateUrl: './profil-sidebar.component.html',
  styleUrls: ['./profil-sidebar.component.css'],
})
export class ProfilSidebarComponent extends ProfilHelperService {
  public twitterpost = twitterpost;
}
