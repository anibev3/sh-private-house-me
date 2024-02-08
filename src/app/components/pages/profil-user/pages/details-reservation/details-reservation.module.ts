import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { DetailsReservationRoutingModule } from './details-reservation-routing.module';
import { DetailsReservationComponent } from './details-reservation.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [DetailsReservationComponent, ContentComponent],
  imports: [
    CommonModule,
    DetailsReservationRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
  ],
})
export class DetailsReservationModule {}
