import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AgmCoreModule } from '@agm/core';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [ReservationComponent, ContentComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDnd9JwZvXty-1gHZihMoFhJtCXmHfeRQg',
    // }),
  ],
})
export class ReservationModule {}
// declare module '@angular/core' {
//   interface ModuleWithProviders<T = any> {
//     ngModule: Type<T>;
//     providers?: Provider[];
//   }
// }
