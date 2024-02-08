import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingInfoComponent } from './booking-info.component';

const routes: Routes = [{ path: '', component: BookingInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingInfoRoutingModule {}
