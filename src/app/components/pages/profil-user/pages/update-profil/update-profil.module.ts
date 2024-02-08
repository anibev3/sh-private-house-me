import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { UpdateProfilRoutingModule } from './update-profil-routing.module';
import { UpdateProfilComponent } from './update-profil.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateProfilComponent, ContentComponent],
  imports: [
    CommonModule,
    UpdateProfilRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class UpdateProfilModule {}
