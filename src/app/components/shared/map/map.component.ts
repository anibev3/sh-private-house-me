// import {
//   Component,
//   Input,
//   ViewChild,
//   ElementRef,
//   AfterViewInit,
// } from '@angular/core';
// import { GoogleMapsAPIWrapper } from '@agm/core';

// @Component({
//   selector: 'app-map',
//   template: `<agm-map [latitude]="latitude" [longitude]="longitude">
//     <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
//   </agm-map>`,
// })
// export class MapComponent implements AfterViewInit {
//   @Input() latitude: number | undefined;
//   @Input() longitude: number | undefined;

//   constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

//   ngAfterViewInit() {
//     const lat = this.latitude !== undefined ? this.latitude : 0;
//     const lng = this.longitude !== undefined ? this.longitude : 0;
//     this.gmapsApi.getNativeMap().then((map) => {
//       new google.maps.Marker({
//         position: { lat: lat, lng: lng },
//         map: map,
//         title: 'Residence Location',
//         clickable: true,
//       });
//     });
//   }
// }
