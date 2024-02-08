import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PaymentComponent, ContentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
  ],
})
export class PaymentModule {}
