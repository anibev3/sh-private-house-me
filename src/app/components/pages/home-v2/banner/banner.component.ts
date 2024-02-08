import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/components/services/crypto/navigation.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  bannerPosts = [
    {
      img: 'https://www.vf-architectures.fr/public/img/big/ArchitectepourvilladeluxeetprestigeCannesarchitectesVF1jpg_5e9c5280605f4.jpg',
      tag: "L'expérience de luxe ultime",
      title: 'La base <br/>parfaite pour vous',
    },
    {
      img: 'https://www.vf-architectures.fr/public/img/big/meilleurarchitecteCannespourvillamaisonluxejpg_637123da2fa64.jpg',
      tag: "L'expérience de luxe ultime",
      title: 'La base <br/>parfaite pour vous',
    },
  ];
  settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    fade: true,
    arrows: false,
  };

  ngOnInit(): void {}

  public goToListingLodge() {
    return this.navigationService.onSubmit();
  }
}
