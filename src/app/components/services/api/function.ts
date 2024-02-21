import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CryptoService } from '../crypto/crypto.service';
import { Constants } from '../../constants.ts/constants';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class Functions {
  formatPrimDateToString(object: any) {
    (date: Date | null): string | null => {
      if (date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1
        const year = String(date.getFullYear());

        return `${year}-${month}-${day}`;
      }

      return null;
    };
  }

  formatDate = (date: Date | null): string | null => {
    if (date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1
      const year = String(date.getFullYear());

      return `${year}-${month}-${day}`;
    }

    return null;
  };

  formatStringToDate(inputDateString: string): Date {
    // Découper la chaîne pour obtenir le jour, le mois et l'année
    const [year, month, day] = inputDateString.split('-').map(Number);

    // Créer une instance de Date en utilisant les composants
    const outputDate = new Date(year, month - 1, day); // Mois - 1 car les mois commencent à 0
    // console.log(outputDate);

    // Utiliser outputDate comme vous le souhaitez
    return outputDate;
  }
}
