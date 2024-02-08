import { Component, OnInit } from '@angular/core';
import { RoomHelperService } from '../../../services/room-helper.service';
import { ApiService } from 'src/app/components/services/api/api.service';
import { ProfilHelperService } from 'src/app/components/services/profil-helper.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';
import { Constants } from 'src/app/components/constants.ts/constants';
import { User } from 'src/app/components/models/user.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent extends ProfilHelperService implements OnInit {
  public userId: any = 5;
  // public historyList: any[] = [];
  public isPending: boolean = false;
  public user: User | undefined | null | any;
  public description: string =
    'dans votre tableau de bord personnalisé Mon compte. Ici, vous avez le pouvoir de gérer l’intégralité de votre expérience sherylux Résidence Privée en un seul endroit. Que vous exploriez vos dernières réservations, vérifiez vos notifications ou mettiez à jour votre profil, tout est à portée de main.';
  maxDisplayedChars = 22;
  showFullDescription = false;

  constructor(
    fb: FormBuilder,
    route: ActivatedRoute,
    apiService: ApiService,
    roote: ActivatedRoute,
    router: Router,
    cryptoService: CryptoService
  ) {
    super(fb, route, apiService, roote, router, cryptoService);
  }

  toggleShowFullDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
  ngOnInit(): void {
    // super.ngOnInit();
    // this.getHistory();
  }

  // getHistory(): void {
  //   this.isPending = true;
  //   this.apiService.getItemById('history', this.userId).subscribe(
  //     (response) => {
  //       // console.log("Voici l'historique de ce client : " + response);
  //       // console.log('1111111', response);

  //       this.historyList = response?.data;
  //       console.log(this.historyList.length);
  //       this.isPending = false;
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.isPending = false;
  //     }
  //   );
  // }

  // public navigatioinMethode(endPoint: string) {
  //   return this.router.navigate([endPoint], { relativeTo: this.route });
  // }

  // getStatusColor(status: string): string {
  //   switch (status) {
  //     case 'cancelled':
  //       return 'red';
  //     case 'confirmed':
  //       return 'green';
  //     case 'pending':
  //       return 'rgb(106, 106, 38)';
  //     case 'completed':
  //       return 'blue';
  //     default:
  //       return ''; // default color or fallback
  //   }
  // }
}
