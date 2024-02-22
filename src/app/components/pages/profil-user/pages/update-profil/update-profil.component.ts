import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css'],
})
export class UpdateProfilComponent implements OnInit {
  constructor() {}
  // Header style
  Headerclassname = 'inner-page';
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';

  ngOnInit(): void {}
}
