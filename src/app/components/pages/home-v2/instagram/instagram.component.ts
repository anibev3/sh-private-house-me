import { Component, OnInit } from '@angular/core';
import instaimage from '../../../data/instaposts.json';
import { ApiService } from 'src/app/components/services/api/api.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css'],
})
export class InstagramComponent implements OnInit {
  public instaimage = instaimage;
  public partners: any[] = [];

  constructor(private apiService: ApiService) {}

  getPartners() {
    this.apiService.getItems('/partners').subscribe((respopnse) => {
      this.partners = respopnse.data;
    });
  }
  settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    fade: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  ngOnInit(): void {
    this.getPartners();
  }
}
