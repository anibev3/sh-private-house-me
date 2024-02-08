// alert.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<any>();

  showAlert(alertData: any): void {
    this.alertSubject.next(alertData);
  }

  getAlerts(): Subject<any> {
    return this.alertSubject;
  }
}
