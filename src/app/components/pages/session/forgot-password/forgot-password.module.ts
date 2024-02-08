import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgotPasswordComponent, ContentComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class ForgotPasswordModule {}
