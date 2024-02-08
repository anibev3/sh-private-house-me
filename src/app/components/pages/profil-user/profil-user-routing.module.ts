import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilUserComponent } from './pages/profil/profil-user.component';
import { BaseProfilComponent } from './pages/base-profil/base-profil.component';

const routes: Routes = [
  {
    path: '',
    component: BaseProfilComponent,
    children: [
      {
        path: '',
        component: ProfilUserComponent,
      },
      {
        path: 'historique',
        loadChildren: () =>
          import('./pages/historique/historique.module').then(
            (m) => m.HistoriqueModule
          ),
        // data: { breadcrumb: 'Historique' },
      },

      {
        path: 'detail-reservation/:id',
        loadChildren: () =>
          import('./pages/details-reservation/details-reservation.module').then(
            (m) => m.DetailsReservationModule
          ),
        // data: { breadcrumb: 'Historique' },
      },

      {
        path: 'update-profil',
        loadChildren: () =>
          import('./pages/update-profil/update-profil.module').then(
            (m) => m.UpdateProfilModule
          ),
        // data: { breadcrumb: 'Modifier votre profil' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilUserRoutingModule {}
