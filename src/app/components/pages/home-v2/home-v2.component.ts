import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-v2',
  templateUrl: './home-v2.component.html',
  styleUrls: ['./home-v2.component.css'],
})
export class HomeV2Component implements OnInit {
  constructor() {}
  // Footer style
  classname = '';
  // ftlogo = 'assets/img/*-sh-white.png';
  ftlogo = 'assets/img/logo-sh-white.png';

  ngOnInit(): void {}
}
