import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Galleria } from 'primeng/galleria';
import { ProfilHelperService } from '../../services/profil-helper.service';

@Component({
  selector: 'app-history',
  template: `
    <div class="total-box mt-0">
      <div class="wallet-table mt-0">
        <div class="table-responsive">
          <table>
            <tbody>
              <tr>
                <!-- <th>N°</th> -->
                <th>N° Res.</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th #collapse="ngbCollapse" [(ngbCollapse)]="plusBool">
                  Détails
                </th>
                <th>Option</th>
              </tr>
              <ng-container *ngIf="historyList">
                <tr
                  *ngFor="
                    let item of historyList
                      | paginate : { itemsPerPage: 5, currentPage: page }
                  "
                >
                  <!-- <td>1</td> -->
                  <td>
                    <span
                      class="fw-bolder custom-cursor"
                      routerLink="/profil-user/detail-reservation/{{
                        item.booking_id
                      }}"
                      >#{{ item?.booking_number.slice(-6) }}</span
                    >
                  </td>
                  <td>{{ item?.booking_date }}</td>
                  <td>
                    <ng-container
                      *ngIf="
                        item?.booking_currency?.is_prefix_symbol === 1;
                        else suffixSymbol
                      "
                    >
                      <sup>{{ item.booking_currency?.symbol }}</sup
                      >{{ item.booking_amount | number : '1.0-0' }}
                    </ng-container>
                    <ng-template #suffixSymbol>
                      {{ item.booking_amount | number : '1.0-0'
                      }}<sup>{{ item.booking_currency?.symbol }}</sup>
                    </ng-template>
                  </td>
                  <td>
                    <div
                      class=""
                      style="border: 1px solid {{
                        getStatusColor(item?.status)
                      }}; color: {{ getStatusColor(item?.status) }};
    border-radius: 10px"
                    >
                      <span>{{ getStatusFormated(item?.status) }}</span>
                    </div>
                  </td>
                  <td #collapse="ngbCollapse" [(ngbCollapse)]="plusBool">
                    <div>
                      <div class="mb-2">
                        <div style="text-align: left;">
                          <a
                            routerLink="/profil-user/detail-reservation/{{
                              item.booking_id
                            }}"
                            class="d-inline-block text-dark link-hover-primary"
                          >
                            <strong>
                              {{ item?.booking_room?.room_name }}
                            </strong>
                          </a>
                        </div>
                      </div>
                      <div class="d-flex" style="mar">
                        <small class="text-nowrap d-block">
                          <i class="fa fa-calendar pousser-icon"></i>
                          <span
                            >Du
                            <strong>
                              {{ item?.booking_room?.start_date }}
                            </strong>
                            au
                            <strong>{{
                              item?.booking_room?.end_date
                            }}</strong></span
                          >
                        </small>
                        <!-- <small class="text-nowrap d-block">
                          <i class="fa fa-users pousser-icon"></i>
                          <span>{{ item?.number_of_guests }} Adultes</span>
                        </small> -->
                      </div>
                    </div>
                  </td>

                  <td>
                    <div class="d-flex justify-content-around">
                      <i
                        class="fas fa-eye custom-cursor"
                        routerLink="/profil-user/detail-reservation/{{
                          item.booking_id
                        }}"
                      ></i>
                      <ng-container *ngIf="plusBool">
                        <i class="fas fa-print"></i>
                        <i
                          class="fas fa-trash"
                          (click)="showMaximizableDialog()"
                        ></i>
                      </ng-container>
                      <span *ngIf="!plusBool" style="margin-left: 20px;"></span>
                      <h5
                        class="custom-cursor"
                        style="color: gray"
                        (click)="collapse.toggle()"
                        [attr.aria-expanded]="!plusBool"
                        aria-controls="collapseExample"
                      >
                        <i class="fas fa-plus" *ngIf="plusBool"></i>
                        <i class="fas fa-minus" *ngIf="!plusBool"></i>
                        <!-- <strong> {{ plusBool ? 'Plus' : 'Reduire' }} </strong> -->
                      </h5>
                    </div>
                  </td>
                  <p-dialog
                    header="Requête d'annulation"
                    [(visible)]="displayMaximizable"
                    [modal]="true"
                    [maximizable]="true"
                    [baseZIndex]="9999"
                    [draggable]="false"
                    [resizable]="false"
                  >
                    <app-delete-reservation
                      [isModal]="true"
                      [reservationDetail_]="item"
                    ></app-delete-reservation>

                    <ng-template pTemplate="footer">
                      <p-button
                        icon="pi pi-check"
                        (click)="displayMaximizable = false"
                        label="Ok"
                        styleClass="p-button-text"
                      ></p-button>
                    </ng-template>
                  </p-dialog>
                </tr>
              </ng-container>

              <!---->
            </tbody>
          </table>
          <div class="text-center justify-content-center" *ngIf="isPending">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <div>Chargement en cours</div>
          </div>
          <div
            class="text-center align-items-center justify-content-center mx-auto"
            *ngIf="historyList.length === 0"
          >
            <img
              src="https://angular.pixelstrap.net/fastkart-rest/assets/svg/empty-items.svg"
              alt=""
              width="40%"
            />
            <h4>Aucune réservation</h4>
          </div>
        </div>
      </div>
      <ng-container *ngIf="isPagination">
        <div
          class="pagination-wrap text-center justify-content-center"
          style="
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  "
          *ngIf="historyList"
        >
          <pagination-controls
            (pageChange)="page = $event"
            responsive="true"
            previousLabel="<"
            nextLabel=">"
          ></pagination-controls></div
      ></ng-container>
    </div>

    <div
      class="d-flex text-center justify-content-center align-self-center align-items-center"
      *ngIf="!dataIsOk"
      style="height: 50vh"
    >
      <div>
        <!-- <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            fill="currentColor"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </svg>
        <div>Chargement des données</div>
      </div>
    </div>
  `,
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent extends ProfilHelperService {
  @Input() isPagination: boolean = false;

  displayMaximizable: boolean = false;

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  public plusBool = true;
  // ngOnInit(): void {}
}
