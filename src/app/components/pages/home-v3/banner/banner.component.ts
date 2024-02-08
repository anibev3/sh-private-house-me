import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  bannerPosts = [
    {
      img: 'https://www.vf-architectures.fr/public/img/big/ArchitectepourvilladeluxeetprestigeCannesarchitectesVF1jpg_5e9c5280605f4.jpg',
      tag: 'The ultimate luxury experience',
      title: 'The Perfect <br/> Base For You',
    },
    {
      img: 'https://www.vf-architectures.fr/public/img/big/meilleurarchitecteCannespourvillamaisonluxejpg_637123da2fa64.jpg',
      tag: 'The ultimate luxury experience',
      title: 'The Perfect <br/> Base For You',
    },
  ];
  constructor() {}
  settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    fade: true,
    arrows: false,
  };

  ngOnInit(): void {}
}
