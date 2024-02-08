import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/services/middleware/auth.guard';
import { NoAuthGuard } from './components/services/middleware/no-auth.guard';

const routes: Routes = [
  // Home
  {
    path: '',
    loadChildren: () =>
      import('./components/pages/home-v2/home-v2.module').then(
        (m) => m.HomeV2Module
      ),
    data: { breadcrumb: 'Homepage' },
  },

  {
    path: 'room-grid',
    loadChildren: () =>
      import('./components/pages/room-grid/room-grid.module').then(
        (m) => m.RoomGridModule
      ),
    data: { breadcrumb: 'Logement disponible' },
  },
  // -----------------------------------------------------------------------------------------------------------------------------------

  {
    path: 'profil-user',
    loadChildren: () =>
      import('./components/pages/profil-user/profil-user.module').then(
        (m) => m.ProfilUserModule
      ),
    data: { breadcrumb: 'Profil' },
    canActivate: [NoAuthGuard],
  },

  // -----------------------------------------------------------------------------------------------------------------------------------

  {
    path: 'booking-info/:id',
    loadChildren: () =>
      import('./components/pages/booking-info/booking-info.module').then(
        (m) => m.BookingInfoModule
      ),
    data: { breadcrumb: 'Info réservation' },
  },

  {
    path: 'success-reservation',
    loadChildren: () =>
      import('./components/pages/success-page/success-page.module').then(
        (m) => m.SuccessPageModule
      ),
    data: { breadcrumb: 'Succès' },
  },

  {
    path: 'payment/:id',
    loadChildren: () =>
      import('./components/pages/payment/payment.module').then(
        (m) => m.PaymentModule
      ),
    data: { breadcrumb: 'Paiement' },
  },

  {
    path: 'room-list',
    loadChildren: () =>
      import('./components/pages/room-list/room-list.module').then(
        (m) => m.RoomListModule
      ),
    data: { breadcrumb: 'Room List' },
  },
  {
    path: 'reservation/:id',
    loadChildren: () =>
      import('./components/pages/reservation/reservation.module').then(
        (m) => m.ReservationModule
      ),
    data: { breadcrumb: 'Réservation' },
  },

  //

  {
    path: 'room-details/:id',
    loadChildren: () =>
      import('./components/pages/room-details/room-details.module').then(
        (m) => m.RoomDetailsModule
      ),
    data: { breadcrumb: 'Details' },
  },

  // login
  {
    path: 'login',
    loadChildren: () =>
      import('./components/pages/session/login/login.module').then(
        (m) => m.LoginModule
      ),
    data: { breadcrumb: 'Connexion' },
    canActivate: [AuthGuard],
  },

  // register
  {
    path: 'register',
    loadChildren: () =>
      import('./components/pages/session/register/register.module').then(
        (m) => m.RegisterModule
      ),
    data: { breadcrumb: 'Inscription' },
    canActivate: [AuthGuard],
  },

  // {
  //   path: 'blog-details/:id',
  //   loadChildren: () =>
  //     import('./components/pages/blog-details/blog-details.module').then(
  //       (m) => m.BlogDetailsModule
  //     ),
  //   data: { breadcrumb: 'Blog Details' },
  // },
  // Contact
  {
    path: 'contact',
    loadChildren: () =>
      import('./components/pages/contact/contact.module').then(
        (m) => m.ContactModule
      ),
    data: { breadcrumb: 'Nous contacter' },
  },
  // About
  {
    path: 'about',
    loadChildren: () =>
      import('./components/pages/about/about.module').then(
        (m) => m.AboutModule
      ),
    data: { breadcrumb: 'À propos de nous' },
  },
  // Gallery
  {
    path: 'gallery',
    loadChildren: () =>
      import('./components/pages/gallery/gallery.module').then(
        (m) => m.GalleryModule
      ),
    data: { breadcrumb: 'Galleries' },
  },
  // Restaurant
  {
    path: 'restaurant',
    loadChildren: () =>
      import('./components/pages/restaurant/restaurant.module').then(
        (m) => m.RestaurantModule
      ),
    data: { breadcrumb: 'Restaurant' },
  },
  // Places
  // {
  //   path: 'places',
  //   loadChildren: () =>
  //     import('./components/pages/places/places.module').then(
  //       (m) => m.PlacesModule
  //     ),
  //   data: { breadcrumb: 'Homepage' },
  // },
  // {
  //   path: 'places-details/:id',
  //   loadChildren: () =>
  //     import('./components/pages/places-details/places-details.module').then(
  //       (m) => m.PlacesDetailsModule
  //     ),
  //   data: { breadcrumb: 'Places Details' },
  // },
  // offers
  {
    path: 'offers',
    loadChildren: () =>
      import('./components/pages/offers/offers.module').then(
        (m) => m.OffersModule
      ),
    data: { breadcrumb: 'Nos offres' },
  },
  // offers
  {
    path: 'forgot-password',
    loadChildren: () =>
      import(
        './components/pages/session/forgot-password/forgot-password.module'
      ).then((m) => m.ForgotPasswordModule),
    data: { breadcrumb: 'Mot de passe oublié' },
    canActivate: [AuthGuard],
  },
  // Menu
  {
    path: 'menu',
    loadChildren: () =>
      import('./components/pages/menu/menu.module').then((m) => m.MenuModule),
    data: { breadcrumb: 'Menu' },
  },
  {
    path: 'error-page',
    loadChildren: () =>
      import('./components/pages/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
    data: { breadcrumb: 'Erreur 404' },
  },

  // {
  //   path: 'success-reservation',
  //   loadChildren: () =>
  //     import('./components/pages/success-page/success-page.module').then(
  //       (m) => m.SuccessPageModule
  //     ),
  //   data: { breadcrumb: 'Réservation success' },
  // },
  {
    path: '**',
    loadChildren: () =>
      import('./components/pages/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
    data: { breadcrumb: 'Erreur 404' },
  },
  // Logement
  // {
  //   path: 'contact',
  //   loadChildren: () =>
  //     import('./components/pages/contact/contact.module').then(
  //       (m) => m.LogementModule
  //     ),
  //   data: { breadcrumb: 'Logement' },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
