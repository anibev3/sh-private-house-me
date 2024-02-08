import { Component, OnInit } from '@angular/core';
import authors from '../../../data/authors.json';
import { ApiService } from 'src/app/components/services/api/api.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  public testimonials: any[] = [];
  constructor(private apiService: ApiService) {}

  settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  public getTestimonial() {
    this.apiService.getItems('/testimonials').subscribe((data) => {
      this.testimonials = data.data;
    });
  }

  ngOnInit(): void {
    this.getTestimonial();
  }
}
