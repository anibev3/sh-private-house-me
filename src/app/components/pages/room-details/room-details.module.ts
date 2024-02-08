import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AgmCoreModule } from '@agm/core';

import { RoomDetailsRoutingModule } from './room-details-routing.module';
import { RoomDetailsComponent } from './room-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CalendarModule } from 'primeng/calendar';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
// import {DynamicDialogModule} from 'primeng-lts/dynamicdialog';

@NgModule({
  declarations: [RoomDetailsComponent, ContentComponent],
  imports: [
    CommonModule,
    RoomDetailsRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    CalendarModule,
    GalleriaModule,
    RatingModule,
    DialogModule,

    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDnd9JwZvXty-1gHZihMoFhJtCXmHfeRQg',
    // }),
  ],
})
export class RoomDetailsModule {}
