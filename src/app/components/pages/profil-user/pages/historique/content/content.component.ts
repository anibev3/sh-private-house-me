import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/components/services/api/api.service';
import { ProfilHelperService } from 'src/app/components/services/profil-helper.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/components/services/crypto/crypto.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent extends ProfilHelperService implements OnInit {
  // public userId: any = 5;
  // public historyList: any[] = [];
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

  ngOnInit(): void {}
}
