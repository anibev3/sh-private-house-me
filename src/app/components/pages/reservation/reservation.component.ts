import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  constructor() {}
  // Header style
  Headerclassname = 'inner-page';
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';

  ngOnInit(): void {}
}
