import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.css'],
})
export class BookingInfoComponent implements OnInit {
  constructor() {}
  // Header style
  Headerclassname = 'inner-page';
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';

  ngOnInit(): void {}
}
