import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-reservation',
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css'],
})
export class DetailsReservationComponent implements OnInit {
  constructor() {}
  // Header style
  Headerclassname = 'inner-page';
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';

  ngOnInit(): void {}
}
