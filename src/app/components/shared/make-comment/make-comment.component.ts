import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Galleria } from 'primeng/galleria';
import { ApiService } from '../../services/api/api.service';
import { CryptoService } from '../../services/crypto/crypto.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '../../constants.ts/constants';
import { Endpoint } from '../../constants.ts/enpoint';

@Component({
  selector: 'app-make-comment',
  template: `
    <div class="amertie-cart" style="margin-top: 10px">
      <h5 class="text-center" style="margin-bottom: 15px">Votre avis compte</h5>

      <div>
        <form [formGroup]="commentForm" (ngSubmit)="makeComment()">
          <div class="m10"></div>
          <div style="background-color: white">
            <div>
              <h5><strong>Nous somme à votre disposition</strong></h5>
              <p class="fs14"></p>
              <br />

              <div class="row m10">
                <div class="col-lg-6 m10 d-flex justify-content-between">
                  <h6 class="centeroh">
                    <strong class="fs13">Emplacement</strong>
                  </h6>

                  <input
                    type="number"
                    class="input-formulaire"
                    placeholder="Note pour l'emplacement"
                    formControlName="emplacement_id_1"
                    style="width: 60%"
                    max="5"
                  />
                </div>
                <div class="col-lg-6 m10 d-flex justify-content-between">
                  <h6 class="centeroh">
                    <strong class="fs13">Arrivée</strong>
                  </h6>

                  <input
                    type="number"
                    class="input-formulaire"
                    placeholder="Note pour l'arrivée"
                    formControlName="arrivee_id_2"
                    style="width: 60%"
                  />
                </div>
                <div class="col-lg-6 m10 d-flex justify-content-between">
                  <h6 class="centeroh">
                    <strong class="fs13">Qualité-prix</strong>
                  </h6>

                  <input
                    type="number"
                    class="input-formulaire"
                    placeholder="Note pour la qualité prix"
                    formControlName="qualite_prix_id_3"
                    style="width: 60%"
                  />
                </div>
                <div class="col-lg-6 m10 d-flex justify-content-between">
                  <h6 class="centeroh">
                    <strong class="fs13">Communication</strong>
                  </h6>

                  <input
                    type="number"
                    class="input-formulaire"
                    placeholder="Note pour la communication"
                    formControlName="communication_id_4"
                    style="width: 60%"
                  />
                </div>
                <div class="col-lg-6 m10 d-flex justify-content-between">
                  <h6 class="centeroh">
                    <strong class="fs13">Propreté</strong>
                  </h6>

                  <input
                    type="number"
                    class="input-formulaire"
                    placeholder="Note pour la proprété"
                    formControlName="proprete_id_5"
                    style="width: 60%"
                  />
                </div>
                <br />
                <div class="col-lg-12 m10">
                  <h6 style="margin-bottom: 10px;">
                    <strong class="fs13">Commentaire</strong>
                  </h6>

                  <textarea
                    placeholder="Dite quelques chose sur cette résidence."
                    style="
                        height: 80px;

                        border-radius: 10px;
                        border: 1px solid rgba(0, 0, 0, 0.125);
                      "
                    formControlName="content"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div>
            <!-- Arrivée --
            <div *ngIf="commentForm.get('arrivee_id_2')?.hasError('required')">
              Le champ Arrivée est obligatoire.
            </div>
            <div *ngIf="commentForm.get('arrivee_id_2')?.hasError('min')">
              La valeur du champ Arrivée doit être supérieure ou égale à 0.
            </div>
            <div *ngIf="commentForm.get('arrivee_id_2')?.hasError('max')">
              La valeur du champ Arrivée ne peut pas dépasser 5.
            </div>
            <div *ngIf="commentForm.get('arrivee_id_2')?.hasError('pattern')">
              La valeur du champ Arrivée doit être un chiffre entre 0 et 5.
            </div>

            <!-- Qualité-prix --
            <div
              *ngIf="commentForm.get('qualite_prix_id_3')?.hasError('required')"
            >
              Le champ Qualité-prix est obligatoire.
            </div>
            <div *ngIf="commentForm.get('qualite_prix_id_3')?.hasError('min')">
              La valeur du champ Qualité-prix doit être supérieure ou égale à 0.
            </div>
            <div *ngIf="commentForm.get('qualite_prix_id_3')?.hasError('max')">
              La valeur du champ Qualité-prix ne peut pas dépasser 5.
            </div>
            <div
              *ngIf="commentForm.get('qualite_prix_id_3')?.hasError('pattern')"
            >
              La valeur du champ Qualité-prix doit être un chiffre entre 0 et 5.
            </div>

            <!-- Communication --
            <div
              *ngIf="
                commentForm.get('communication_id_4')?.hasError('required')
              "
            >
              Le champ Communication est obligatoire.
            </div>
            <div *ngIf="commentForm.get('communication_id_4')?.hasError('min')">
              La valeur du champ Communication doit être supérieure ou égale à
              0.
            </div>
            <div *ngIf="commentForm.get('communication_id_4')?.hasError('max')">
              La valeur du champ Communication ne peut pas dépasser 5.
            </div>
            <div
              *ngIf="commentForm.get('communication_id_4')?.hasError('pattern')"
            >
              La valeur du champ Communication doit être un chiffre entre 0 et
              5.
            </div>

            <!-- Propreté --
            <div *ngIf="commentForm.get('proprete_id_5')?.hasError('required')">
              Le champ Propreté est obligatoire.
            </div>
            <div *ngIf="commentForm.get('proprete_id_5')?.hasError('min')">
              La valeur du champ Propreté doit être supérieure ou égale à 0.
            </div>
            <div *ngIf="commentForm.get('proprete_id_5')?.hasError('max')">
              La valeur du champ Propreté ne peut pas dépasser 5.
            </div>
            <div *ngIf="commentForm.get('proprete_id_5')?.hasError('pattern')">
              La valeur du champ Propreté doit être un chiffre entre 0 et 5.
            </div>
          </div>
          <div>
            --!>
            <!-- <div class="mt-3">
                <label>
                  <input type="checkbox" />

                  En continuant, vous acceptez les conditions d'annulation
                </label>
              </div> -->
            <!-- <div *ngIf="showAnnulMsg">
              <em> Veuillez accepter les conditions d'annulation </em>
            </div>
            <div *ngIf="showAnnulMsg_2">
              <em> Donnez la raison de votre annulation </em>
            </div> -->
            <div class="d-flex justify-content-end" style="margin-top: 10px">
              <div class="d-flex justify-content-end">
                <button
                  class="d-flex justify-content-end"
                  type="submit"
                  style="padding: 7px 10px 10px 10px; border-radius: 6px"
                >
                  <div *ngIf="!submittingForm">
                    Soumettre
                    <i class="fas fa-angle-right" style="margin-left: 10px"></i>
                  </div>
                  <div
                    class="d-flex justify-content-center align-items-center h-100"
                    *ngIf="submittingForm"
                  >
                    <span>Soumission en cours</span>
                    <div style="margin-left: 10px">
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div
      class="snackbar-toast bg-green1-dark color-white text-center"
      style="
      margin-bottom: calc(
        100px + (env(safe-area-inset-bottom)) * 1.1
      ) !important;
      background-color: rgb(193, 14, 14) !important;
    "
      *ngIf="isError"
    >
      <i class="fa fa-shopping-cart mr-3"></i> Veuillez verifier les
      informations et réessayer
    </div>
    <!-- ... -->
  `,
  styles: [
    `
      .iniput {
        border: black;
        width: 100%;
        height: 38px;
        background-color: #f8f8f8;
        padding: 0 40px;
      }

      .pousser-icon {
        margin-right: 15px;
      }

      .badge-success {
        width: 100% !important;
        color: #fff !important;
        background-color: RGBA(
          90,
          183,
          123,
          var(--bs-bg-opacity, 1)
        ) !important;
        --bs-badge-padding-x: 0.65em;
        --bs-badge-padding-y: 0.35em;
        --bs-badge-font-size: 0.75em;
        --bs-badge-font-weight: 400;
        --bs-badge-color: #fff;
        --bs-badge-border-radius: 0.135rem;
        display: inline-block;
        padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
        font-size: var(--bs-badge-font-size);
        font-weight: var(--bs-badge-font-weight);
        line-height: 1;
        color: var(--bs-badge-color);
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: var(--bs-badge-border-radius);
      }

      .badge-danger {
        width: 100% !important;
        color: #fff !important;
        background-color: RGBA(
          90,
          183,
          123,
          var(--bs-bg-opacity, 1)
        ) !important;
        --bs-badge-padding-x: 0.65em;
        --bs-badge-padding-y: 0.35em;
        --bs-badge-font-size: 0.75em;
        --bs-badge-font-weight: 400;
        --bs-badge-color: #fff;
        --bs-badge-border-radius: 0.135rem;
        display: inline-block;
        padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
        font-size: var(--bs-badge-font-size);
        font-weight: var(--bs-badge-font-weight);
        line-height: 1;
        color: red;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: var(--bs-badge-border-radius);
      }

      .badge-warning {
        width: 100% !important;
        color: #fff !important;
        background-color: RGBA(
          90,
          183,
          123,
          var(--bs-bg-opacity, 1)
        ) !important;
        --bs-badge-padding-x: 0.65em;
        --bs-badge-padding-y: 0.35em;
        --bs-badge-font-size: 0.75em;
        --bs-badge-font-weight: 400;
        --bs-badge-color: #fff;
        --bs-badge-border-radius: 0.135rem;
        display: inline-block;
        padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
        font-size: var(--bs-badge-font-size);
        font-weight: var(--bs-badge-font-weight);
        line-height: 1;
        color: var(--bs-badge-color);
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: var(--bs-badge-border-radius);
      }

      .iniput {
        border: black;
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;
        padding: 0 40px;
      }

      .amenities-list {
        list-style-type: none;
        padding: 0;
        font-family: 'Old Standard TT', serif;
      }

      .amenity-item {
        display: inline-block;
        width: 50%; /* Affichez deux éléments par ligne */
        box-sizing: border-box;
        padding: 0 15px; /* Espacement entre les éléments */
        font-family: 'Old Standard TT', serif;
      }

      .mon-padding {
        padding: 10px;
        border: solid 1px rgba(0, 0, 0, 0.125);
        border-radius: 10px;
        font-family: 'Old Standard TT', serif;
      }

      .input-formulaire {
        border-radius: 4px;
        width: 100%;
        height: 35px;
        border: 1px solid rgba(0, 0, 0, 0.125);
        font-family: 'Old Standard TT', serif;
      }

      .m10 {
        margin-top: 10px;
        font-family: 'Old Standard TT', serif;
      }

      .petiit {
        background-color: #e7fde9;
        color: #006607;
        padding: 0px 6px 6px 6px;
        margin-right: 4px;
        border-radius: 5px;
        border: 1px solid #97e59c;
        font-family: 'Old Standard TT', serif;
      }

      .petiiit {
        background-color: #e7fde9;
        color: #006607;
        padding: 6px 6px 6px 6px;
        margin-right: 4px;
        border-radius: 5px;
        border: 1px solid #97e59c;
        font-family: 'Old Standard TT', serif;
      }

      .a001 {
        padding-left: 200px;
        padding-right: 200px;
        padding-top: 60px;
        font-family: 'Old Standard TT', serif;
      }

      .fs13 {
        font-size: 13px;
        font-family: 'Old Standard TT', serif;
      }

      .a002 {
        font-size: 13px;
        background-color: dodgerblue;
        border-radius: 4px;
        padding: 2px;
        margin-left: 10px;
        font-family: 'Old Standard TT', serif;
      }

      .a003 {
        width: 5%;
        margin-right: 10px;
        font-family: 'Old Standard TT', serif;
      }

      .a004 {
        border-left: rgba(0, 0, 0, 0.125) 2px solid;
        font-family: 'Old Standard TT', serif;
      }

      .mr10 {
        margin-right: 10px;
        font-family: 'Old Standard TT', serif;
      }

      .mb10 {
        margin-bottom: 10px;
        font-family: 'Old Standard TT', serif;
      }

      .fs14 {
        font-size: 14px;
        font-family: 'Old Standard TT', serif;
      }

      .mt15 {
        margin-top: 15px;
        font-family: 'Old Standard TT', serif;
      }

      input {
        padding-left: 10px;
        padding-right: 10px;
        font-family: 'Old Standard TT', serif;
      }

      textarea {
        padding: 10px;
        font-family: 'Old Standard TT', serif;
      }

      input.simple-radius {
        height: 67px;
        width: 100%;
      }
    `,
  ],
})
export class MakeCommentComponent implements OnInit {
  @Input() currentHome: any;
  @Input() room_id: any;

  submittingForm: boolean = false;
  facturationForm: any;
  selectedOption: any;
  isCollapseVisible: boolean = false;
  isError: boolean = false;
  showSnackbar: boolean = false;
  displayResponsive: boolean = false;
  user: any;
  commentForm!: FormGroup;

  public userReservationInfo: any;

  // ----------------------- Payment option

  showResponsiveDialog() {
    this.displayResponsive = true;
  }

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    public cryptoService: CryptoService,
    public calendar: NgbCalendar
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
      emplacement_id_1: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(5),
          Validators.pattern(/^[0-5]$/),
        ],
      ],
      arrivee_id_2: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(5),
          Validators.pattern(/^[0-5]$/),
        ],
      ],
      qualite_prix_id_3: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(5),
          Validators.pattern(/^[0-5]$/),
        ],
      ],
      communication_id_4: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(5),
          Validators.pattern(/^[0-5]$/),
        ],
      ],
      proprete_id_5: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(5),
          Validators.pattern(/^[0-5]$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    console.log(this.room_id);

    if (this.cryptoService.getDecryptedItem(Constants.USER)) {
      this.user = this.cryptoService.getDecryptedItem(Constants.USER);
    }
  }
  /*********************************************
   ************ Radio group ********************
   *********************************************/
  selectOption(option: boolean) {
    this.selectedOption = option;
  }

  public makeComment(): void {
    this.submittingForm = true;
    if (this.commentForm.valid) {
      const formData = {
        customer_id: this.user?.id,
        room_id: this.room_id,
        content: this.commentForm?.value?.content,
        reviews: [
          {
            review_id: 1,
            star: this.commentForm?.value?.emplacement_id_1,
          },
          {
            review_id: 2,
            star: this.commentForm?.value?.arrivee_id_2,
          },
          {
            review_id: 3,
            star: this.commentForm?.value?.qualite_prix_id_3,
          },
          {
            review_id: 4,
            star: this.commentForm?.value?.communication_id_4,
          },
          {
            review_id: 5,
            star: this.commentForm?.value?.proprete_id_5,
          },
        ],
      };

      this.apiService.createItem(Endpoint.REVIEW, formData).subscribe(
        (response) => {
          console.log('Soumission avec succes', response);
          this.submittingForm = false;
        },
        (error) => {
          this.submittingForm = false;
          console.log("Une erreur s'est produite");
        }
      );

      console.log(formData);
    } else {
      this.isError = true;

      this.submittingForm = false;
      setTimeout(() => {
        this.isError = false;
      }, 3000);
      console.log("Votre formulaire n'est pas valid");
    }
  }

  toggleCollapse() {
    if (this.selectedOption === true) {
      this.isCollapseVisible = true;
    } else {
      this.isCollapseVisible = false;
    }
  }
  //---------------------- Payment Option

  submitInfoFacturationAndProcessToPaiement() {
    this.submittingForm = true;
    // Vérifiez si le formulaire est valide
    this.facturationForm.value.isEntreprise = this.selectedOption;

    setTimeout(() => {
      this.submittingForm = false;
    }, 300);

    if (this.facturationForm.value.isEntreprise) {
      if (!this.facturationForm.value.villeFacturation) {
        this.showSnackbar = true;
        this.submittingForm = true;
        setTimeout(() => {
          this.showSnackbar = false;
        }, 1000);
        setTimeout(() => {
          this.submittingForm = false;
        }, 300);

        return;
      }
    } else {
      if (!this.facturationForm.value.prenomFacturation) {
        this.showSnackbar = true;
        this.submittingForm = true;
        setTimeout(() => {
          this.showSnackbar = false;
        }, 1000);
        setTimeout(() => {
          this.submittingForm = false;
        }, 300);

        return;
      }
    }
  }

  public initialiseFacturationInfo() {
    // this.commentForm = new FormGroup({
    //   content: new FormControl(''),
    //   emplacement_id_1: new FormControl(0),
    //   arrivee_id_2: new FormControl(0),
    //   qualite_prix_id_3: new FormControl(0),
    //   communication_id_4: new FormControl(0),
    //   proprete_id_5: new FormControl(0),
    // });
  }
}
