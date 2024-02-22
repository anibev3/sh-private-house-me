import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css'],
})
export class SuccessPageComponent implements OnInit {
  constructor() {}
  // Header style
  Headerclassname = 'inner-page';
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';

  ngOnInit(): void {}
}
