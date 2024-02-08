import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import data from '../../data/navigation.json';
import { CryptoService } from '../../services/crypto/crypto.service';
import { Constants } from '../../constants.ts/constants';
import { User } from '../../models/user.model';
import { NavigationService } from '../../services/crypto/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends HelperService implements OnInit {
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
  @Input() layout: number | string | undefined;

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
