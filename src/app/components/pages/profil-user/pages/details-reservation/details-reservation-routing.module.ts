import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsReservationComponent } from './details-reservation.component';

const routes: Routes = [{ path: '', component: DetailsReservationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsReservationRoutingModule {}
