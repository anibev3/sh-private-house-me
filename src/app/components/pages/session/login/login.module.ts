import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, ContentComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
