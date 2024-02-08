import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgbModal,
  NgbModalConfig,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'angular-crumbs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { CryptoService } from './components/services/crypto/crypto.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    NgbModule,
    HttpClientModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAcsRFWnqoDEXZ41hMJjgad8fhfvJu3-YY',
    // }),
    // GoogleMapsModule,
  ],
  declarations: [AppComponent, PreloaderComponent],

  providers: [
    NgbModalConfig,
    NgbModal,
    CryptoService,
    DatePipe,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
