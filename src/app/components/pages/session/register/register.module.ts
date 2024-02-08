import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent, ContentComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class RegisterModule {}
