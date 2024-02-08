import { Injectable, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import rooms from '../data/room.json';
import roomcategory from '../data/roomcategory.json';
import authors from '../data/authors.json';
import { ApiService } from './api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class HomehelperService implements AfterContentInit {
  monFormulaire!: FormGroup;
  // pagination
  page: number = 1;
  public rooms = rooms;
  public logements: any;
  public partners: any[] = [];
  public roomdetails = rooms;
  public roomcategory = roomcategory;
  public author = authors;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private roote: ActivatedRoute,
    private router: Router
  ) {}
  // Get Category
  public getCategories(items: string | any[]) {
    var elems = roomcategory.filter((item: { id: string }) => {
      return items.includes(item.id);
    });
    return elems;
  }

  // Get Author
  public getAuthor(items: string | any[]) {
    var elems = authors.filter((item: { id: string }) => {
      return items.includes(item.id);
    });
    return elems;
  }
  // Offers
  public getOffer() {
    var elems = rooms.filter((item: { offer: boolean }) => {
      return item.offer === true;
    });
    return elems;
  }
  // Related Room
  public getRoomByCategory(items: string | any[]) {
    var elems = rooms.filter((room: { id: string; category: any[] }) => {
      return (
        parseInt(room.id) !== parseInt(this.route.snapshot.params.id) &&
        room.category.some((r) => items.includes(r))
      );
    });
    return elems;
  }
  // Single Room
  public setRoom(id: any) {
    this.apiService.getItemById('rooms', id).subscribe((data) => {
      this.roomdetails = data.data;

      // console.log(
      //   'Voici le logements concerné \n' +
      //     JSON.stringify(this.logements, null, 2)
      // );
    });
    // this.roomdetails = rooms.filter((item: { id: any }) => {
    //   return item.id == id;
    // });
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  loadDataBasedOnParams(params: any) {
    if (params && Object.keys(params).length > 0) {
      if (params.city) {
        this.getRoomByCity(params.city);
      } else {
        this.getAllRooms();
      }
    } else {
      this.getAllRooms();
    }
  }
  //
  //
  getRoomByCity(city: string) {
    // Exemple:
    this.apiService.getItems(`/rooms?city=${city}`).subscribe((data) => {
      this.rooms = data;
    });
  }
  //
  //
  getAllRooms() {
    // Exemple:
    this.apiService.getItems('/rooms').subscribe((data) => {
      this.rooms = data;
    });
  }

  getPartners() {
    // Exemple:
    this.apiService.getItems('/partners').subscribe((respopnse) => {
      this.partners = respopnse.date;
    });
  }
  //
  //
  onSubmit(): void {
    if (this.monFormulaire.valid) {
      const formData = this.monFormulaire.value;
      // Appelez votre API ici
      this.envoyerAuBackend(formData);
    } else {
      // Traitez les erreurs de validation si nécessaire
    }
  }
  //
  //
  envoyerAuBackend(formData: any): void {}
  //
  //

  public getTopLogement() {
    this.apiService.getItems('/get-top-rooms').subscribe((response) => {
      this.logements = response.data;

      // console.log(
      //   'Voici la liste des top logements \n' +
      //     JSON.stringify(this.logements, null, 2)
      // );
    });
  }
  //
  //
  //
  //
  //
  //
  ngAfterContentInit(): void {
    this.monFormulaire = this.fb.group({
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      room: ['', Validators.required],
      guest: ['', Validators.required],
    });
    // this.setRoom(this.route.snapshot.params.id);
    this.getTopLogement();
    // this.route.queryParams.subscribe((params) => {
    //   // this.loadDataBasedOnParams(params);
    //   // alert(JSON.stringify(params));
    // });
  }
}
