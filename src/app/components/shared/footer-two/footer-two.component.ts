import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-two',
  templateUrl: './footer-two.component.html',
  styleUrls: ['./footer-two.component.css'],
})
export class FooterTwoComponent implements OnInit {
  constructor() {}
  @Input() layout: number | string | undefined;
  @Input() logo: number | string | undefined;

  public assistanceLink: string = 'https://sherylux.com/airportvip';
  public transportLink: string = 'https://sherylux.com/transportvip';
  public venteLink: string = '#';
  public residenceLink: string = 'https://sherylux-privee.netlify.app/';
  public linkedinLink: string =
    'https://www.linkedin.com/company/sherylux-lmt/';

  ngOnInit(): void {}
}
