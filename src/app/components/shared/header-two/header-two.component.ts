import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import data from '../../data/navigation.json';
import { CryptoService } from '../../services/crypto/crypto.service';
import { User } from '../../models/user.model';
import { Constants } from '../../constants.ts/constants';
import { NavigationService } from '../../services/crypto/navigation.service';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.css'],
})
export class HeaderTwoComponent extends HelperService implements OnInit {
  public navigation = data;
  public userData: User | any;
  public isLoggedIn: boolean = false;
  constructor(
    public helperService: HelperService,
    private cryptoService: CryptoService,
    private navigationService: NavigationService
  ) {
    super();
  }

  public getUser(): void {
    this.isLoggedIn = this.cryptoService.isUserLoggedIn();
    if (this.isLoggedIn) {
      this.userData = this.cryptoService.getDecryptedItem(Constants.USER);
    }
    // console.log('VOICI LES DONNEE USER', this.userData);
  }
  logout(): void {
    this.cryptoService.clearLocalStorage();
    window.location.href = '/';
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.getUser();
  }

  public goToListingLodge() {
    return this.navigationService.onSubmit();
  }
}
