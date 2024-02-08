import { Component, Input, OnInit } from '@angular/core';
import { RoomHelperService } from '../../../services/room-helper.service';
import { Room } from 'src/app/components/models/room';

@Component({
  selector: 'app-room-detail-slider',
  templateUrl: './room-detail-slider.component.html',
  styleUrls: ['./room-detail-slider.component.css'],
})
export class RoomDetailSliderComponent implements OnInit {
  // @Input() currentHome: Room | undefined;
  @Input() currentHome: any | undefined;
  selectedImageIndex: number = 0;

  ngOnInit(): void {}

  settings = {
    slidesToShow: 4,
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
    dots: false,
    asNavFor: '.rooms-slider-one',
  };

  updateSelectedImage(index: number): void {
    this.selectedImageIndex = index;
  }
}
