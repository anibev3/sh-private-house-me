import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { HistoriqueRoutingModule } from './historique-routing.module';
import { HistoriqueComponent } from './historique.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HistoriqueComponent, ContentComponent],
  imports: [
    CommonModule,
    HistoriqueRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class HistoriqueModule {}
