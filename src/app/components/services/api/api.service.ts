import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CryptoService } from '../crypto/crypto.service';
import { Constants } from '../../constants.ts/constants';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://residences.sherylux.com/api';
  // private apiUrl = 'http://localhost:8000/api';
  // private apiUrl = 'http://192.168.1.18:9000/api';
  private paymentBaseUrl = 'https://payment.sherylux.com';
  private authBaseUrl = 'https://myaccount.sherylux.com/api/auth';
  private prod_url = 'https://sherylux-privee.netlify.app';

  constructor(private http: HttpClient, private cryptoService: CryptoService) {}

  createItem(endpoint: String, item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, item);
  }

  patchItemWithHeader(
    endpoint: string,
    type: string,
    token: string,
    formData: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${type} ${token}`,
    });

    // Utilisation de la méthode HTTP patch pour effectuer une mise à jour partielle
    return this.http.patch(`${this.apiUrl}/${endpoint}`, formData, { headers });
  }

  putItemWithHeader(
    endpoint: string,
    type: string,
    token: string,
    formData: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${type} ${token}`,
    });

    // Utilisation de la méthode HTTP patch pour effectuer une mise à jour partielle
    return this.http.put(`${this.apiUrl}/${endpoint}`, formData, { headers });
  }

  sessionFunction(endpoint: String, item: any): Observable<any> {
    return this.http.post(`${this.authBaseUrl}${endpoint}`, item);
  }

  getItems(endpoint: String): Observable<any> {
    return this.http.get(`${this.apiUrl}${endpoint}`);
  }

  getItemsWithBody(endpoint: String, item: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${endpoint}`, item);
  }

  getItemById(endpoint: String, id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}/${id}`);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchRooms(endpoint: String, item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, item);
  }

  makeApiCall(data: any): Observable<any> {
    // Effectuer votre requête API ici
    return this.http.post(`${this.apiUrl}/endpoint`, data);
  }

  getUserInfo(endpoint: string, type: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${type} ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/${endpoint}`, { headers });
  }

  // ---------------------------------------------------------------------------

  getStatusColor(status: string): string {
    switch (status) {
      case 'cancelled':
        return 'red';
      case 'confirmed':
        return 'green';
      case 'pending':
        return '#6a6a26';
      case 'completed':
        return 'blue';
      default:
        return ''; // default color or fallback
    }
  }

  // private authToken = 'votre_token';

  initiatePayment(cart: any[], email: any): Observable<any> {
    let resi_id: any = this.cryptoService.getDecryptedItem(
      Constants.SELECTED_ROOM
    );
    const form_data = {
      customer_email: email,
      success_url: `http://localhost:4200/payment/${resi_id?.id}`,
      // success_url: `${this.prod_url}/payment/${resi_id?.id}`,
      cancel_url: 'http://localhost:4200/failure',
      cart: cart,
    };

    return this.http.post<any>(
      `${this.paymentBaseUrl}/api/sendtopay`,
      form_data
    );
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => {
        console.log('VOICI LES COUNTRY', data);

        return this.transformData(data.data);
      })
    );
  }

  transformData(data: any[]): any[] {
    return data.map((country) => {
      return {
        name: country.name,
        code: `${country.id}`,
        states: country.cities.map(
          (city: { region: any; municipalities: any[] }) => {
            return {
              name: city.region,
              cities: city.municipalities.map(
                (municipality: { name: any; id: any }) => {
                  return {
                    cname: municipality.name,
                    code: `${municipality.id}`,
                  };
                }
              ),
            };
          }
        ),
      };
    });
  }

  convertResidencesToNewFormat(residences: any[]): any[] {
    return residences
      .filter((residence) => !residence.parent) // Filter out child residences
      .map((residence) => {
        const convertedResidence: any = {
          name: residence.name,
          code: `${residence.id}`, // Change this to the actual code you want
          states: residence.children.map(
            (childResidence: { name: any; id: any }) => {
              return {
                name: childResidence.name,
                id: childResidence.id,
              };
            }
          ),
        };
        return convertedResidence;
      });
  }

  // Utilisation
  // const convertedResidences: ConvertedResidence[] = convertResidencesToNewFormat(yourResidenceData);
}
