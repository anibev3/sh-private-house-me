import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { RoomGridRoutingModule } from './room-grid-routing.module';
import { RoomGridComponent } from './room-grid.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [RoomGridComponent, ContentComponent],
  imports: [
    CommonModule,
    RoomGridRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule,
  ],
})
export class RoomGridModule {}
