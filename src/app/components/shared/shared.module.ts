import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'angular-crumbs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NiceSelectModule } from 'ng-nice-select';

import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { BlogSidebarComponent } from './blog-sidebar/blog-sidebar.component';
import { RoomsSidebarComponent } from './rooms-sidebar/rooms-sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CanvasComponent } from './canvas/canvas.component';
import { FooterComponent } from './footer/footer.component';
import { FooterTwoComponent } from './footer-two/footer-two.component';
import { HeaderComponent } from './header/header.component';
import { HeaderTwoComponent } from './header-two/header-two.component';
import { HeaderThreeComponent } from './header-three/header-three.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { CounterComponent } from './counter/counter.component';
import { ProfilSidebarComponent } from './profil-sidebar/profil-sidebar.component';
import { RoomDetailSliderComponent } from '../pages/home/room-detail-slider/room-detail-slider.component';
import { DetailReservationSidbarComponent } from '../pages/reservation/content/detail-reservation-sidbar/detail-reservation-sidbar.component';
import { PriceReservationSidbarComponent } from '../pages/reservation/content/price-reservation-sidbar/price-reservation-sidbar.component';
import { RsSidebarComponent } from './booking-sidebar/rs-sidebar/rs-sidebar.component';
import { CalendarSidebarComponent } from './booking-sidebar/calendar-sidebar/calendar-sidebar.component';
import { BackButtonComponent } from './return-btn/return-btn.component';
import { CustomAlertComponent } from './snackbar/snackbar.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GalleriaModule } from 'primeng/galleria';
import { GalleryComponent } from './galleries/galleries.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RatingModule } from 'primeng/rating';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { MakeCommentComponent } from './make-comment/make-comment.component';
// import {MatSelectModule} from '@angular/material/select';
// import { CascadeSelectModule } from 'primeng/cascadeselect';

// import { DialogModule } from 'primeng/dialog';

// import { MapComponent } from './map/map.component';
// import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    BackToTopComponent,
    BlogSidebarComponent,
    BreadcrumbComponent,
    CanvasComponent,
    FooterComponent,
    FooterTwoComponent,
    HeaderComponent,
    // RoomSidebarComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    BookingFormComponent,
    RoomsSidebarComponent,
    CounterComponent,
    ProfilSidebarComponent,
    RoomDetailSliderComponent,
    DetailReservationSidbarComponent,
    PriceReservationSidbarComponent,
    CalendarSidebarComponent,
    RsSidebarComponent,
    BackButtonComponent,
    CustomAlertComponent,
    GalleryComponent,
    ReviewsComponent,
    MakeCommentComponent,
    // MapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SlickCarouselModule,
    NgbModule,
    BreadcrumbModule,
    FormsModule,
    NiceSelectModule,
    ReactiveFormsModule,
    ButtonModule,
    // DialogModule,
    CalendarModule,
    // DropdownModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    GalleriaModule,
    RatingModule,
    DynamicDialogModule,
    DialogModule,
    // CascadeSelectModule,
  ],
  exports: [
    BlogSidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    FooterTwoComponent,
    HeaderComponent,
    // RoomSidebarComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    BookingFormComponent,
    RoomsSidebarComponent,
    CounterComponent,
    ProfilSidebarComponent,
    RoomDetailSliderComponent,
    DetailReservationSidbarComponent,
    PriceReservationSidbarComponent,
    CalendarSidebarComponent,
    RsSidebarComponent,
    BackButtonComponent,
    CustomAlertComponent,
    GalleryComponent,
    ReviewsComponent,
    MakeCommentComponent,
    // MapComponent,
  ],
})
export class SharedModule {}
