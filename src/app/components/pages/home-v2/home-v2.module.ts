import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HomeV2RoutingModule } from './home-v2-routing.module';
import { HomeV2Component } from './home-v2.component';
import { SharedModule } from '../../shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { TextBlockComponent } from './text-block/text-block.component';
import { CoreFeaturesComponent } from './core-features/core-features.component';
import { FeatureRoomComponent } from './feature-room/feature-room.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { VideoWrapComponent } from './video-wrap/video-wrap.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { InstagramComponent } from './instagram/instagram.component';
// import { RoomTypeComponent } from '../home/room-type/room-type.component';
import { RoomSliderComponent } from './room-slider/room-slider.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
// import { CascadeSelectModule } from 'primeng/cascadeselect';

@NgModule({
  declarations: [
    RoomSliderComponent,
    // RoomTypeComponent,
    HomeV2Component,
    BannerComponent,
    TextBlockComponent,
    CoreFeaturesComponent,
    FeatureRoomComponent,
    TestimonialsComponent,
    VideoWrapComponent,
    BlogPostComponent,
    InstagramComponent,
  ],
  imports: [
    CommonModule,
    HomeV2RoutingModule,
    SharedModule,
    NgbModule,
    SlickCarouselModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    // CascadeSelectModule,
  ],
})
export class HomeV2Module {}
