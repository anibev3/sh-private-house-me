import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  constructor() {}
  bannerPosts = [
    {
      id: 1,
      img: 'https://www.vf-architectures.fr/public/img/big/ArchitectepourvilladeluxeetprestigeCannesarchitectesVF1jpg_5e9c5280605f4.jpg',
    },
    {
      id: 2,
      img: 'https://www.vf-architectures.fr/public/img/big/meilleurarchitecteCannespourvillamaisonluxejpg_637123da2fa64.jpg',
    },
  ];
  settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
  };

  ngOnInit(): void {}
}
