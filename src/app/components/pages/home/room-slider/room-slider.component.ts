import { Component, OnInit } from '@angular/core';
import { RoomHelperService } from '../../../services/room-helper.service';
import { ApiService } from 'src/app/components/services/api/api.service';
import { Room } from 'src/app/components/models/room';
import { Endpoint } from 'src/app/components/constants.ts/enpoint';

@Component({
  selector: 'app-room-slider',
  templateUrl: './room-slider.component.html',
  styleUrls: ['./room-slider.component.css'],
})
export class RoomSliderComponent implements OnInit {
  // public logements: Room | undefined;
  public logements: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getLodge();
  }

  public getLodge() {
    this.apiService.getItems(Endpoint.ALL_ROOM).subscribe(
      (response) => {
        this.logements = response.data;
      },
      (error) => {
        console.error('Erreur lors de la recherche de chambres : ', error);
      }
    );
  }
  settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    centerMode: true,
    asNavFor: '.room-content-slider',
    centerPadding: '6%',
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          centerPadding: '15%',
        },
      },
    ],
  };
  settingsThumb = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    asNavFor: '.rooms-slider-one',
  };
}
