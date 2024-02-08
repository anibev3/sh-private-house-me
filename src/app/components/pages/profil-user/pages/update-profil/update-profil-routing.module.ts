import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfilComponent } from './update-profil.component';

const routes: Routes = [{ path: '', component: UpdateProfilComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProfilRoutingModule {}
