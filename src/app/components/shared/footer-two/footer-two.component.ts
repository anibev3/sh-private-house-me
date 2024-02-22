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

  public assistanceLink: string = '';
  public transportLink: string = '';
  public venteLink: string = '';
  public residenceLink: string = '';

  ngOnInit(): void {}
}
