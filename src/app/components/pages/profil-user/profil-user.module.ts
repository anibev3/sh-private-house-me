import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProfilUserRoutingModule } from './profil-user-routing.module';
import { ProfilUserComponent } from './pages/profil/profil-user.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseProfilComponent } from './pages/base-profil/base-profil.component';

@NgModule({
  declarations: [ProfilUserComponent, ContentComponent, BaseProfilComponent],
  imports: [
    CommonModule,
    ProfilUserRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class ProfilUserModule {}
