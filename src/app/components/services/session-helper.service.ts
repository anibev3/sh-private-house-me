import { Injectable, AfterContentInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptoService } from './crypto/crypto.service';
import { Constants } from '../constants.ts/constants';
import { Endpoint } from '../constants.ts/enpoint';
import { AccessTokenResponse } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionHelperService implements AfterContentInit, OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  public showErrorSnackbar: boolean = false;
  confirmationVisible: boolean = false;
  public showSucessSnackbar: boolean = false;
  public showErrorFormSnackbar: boolean = false;
  public submittingForm: boolean = false;
  public showNowRegisterMsg: boolean = false;
  passwordVisible: boolean = false;
  public nowRegisterMsg: string = '';
  public nowRegisterEmail: string = '';
  public responseIcon: string = '';
  public responseMsg: string = '';
  public responseColor: string = '';
  public isNowRegister: any | undefined | null;
  userInfo: User | any;
  loginResponse: AccessTokenResponse | undefined | null | any;
  private previousUrl: string;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private cryptoService: CryptoService
  ) {
    const previousNavigation =
      this.router.getCurrentNavigation()?.previousNavigation;
    this.previousUrl =
      previousNavigation && previousNavigation.finalUrl
        ? previousNavigation.finalUrl.toString()
        : '';
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      this.submittingForm = true;
      const formData = this.loginForm.value;
      this.apiService.createItem(Endpoint.LOGIN, formData).subscribe(
        (response) => {
          this.responseIcon = 'fa-check-circle';
          this.responseMsg = 'Connexion réussie';

          this.showSucessSnackbar = true;
          this.loginResponse = response;
          this.cryptoService.setEncryptedItem(
            Constants.TOKEN,
            this.loginResponse
          );

          if (
            this.cryptoService.getDecryptedItem(
              Constants.SUCCESS_SIGN_UP_NOTIFY
            )
          ) {
            localStorage.removeItem(Constants.SUCCESS_SIGN_UP_NOTIFY);
          }

          return this.getUserInfo();
        },
        (error) => {
          this.showErrorSnackbar = true;
          this.responseIcon = 'fa-exclamation-circle';
          this.responseMsg = 'Email ou mot de passe incorect';
          // console.log(JSON.stringify(error.error));

          setTimeout(() => {
            this.showErrorSnackbar = false;
            this.submittingForm = false;
          }, 1500);
        }
      );
    } else {
      this.showErrorFormSnackbar = true;
      this.responseIcon = 'fa-exclamation-circle';
      this.responseMsg = 'Veuillez remplir correctement les champs';
      setTimeout(() => {
        this.showErrorFormSnackbar = false;
      }, 1500);
    }
  }

  getUserInfo(): void {
    this.apiService
      .getUserInfo(
        Endpoint.USER_INFO,
        this.loginResponse?.token_type,
        this.loginResponse?.accessToken
      )
      .subscribe(
        (response) => {
          this.userInfo = response;
          this.cryptoService.setEncryptedItem(Constants.USER, this.userInfo);

          setTimeout(() => {
            this.showSucessSnackbar = false;
          }, 1300);
          if (this.previousUrl) {
            return this.router.navigateByUrl(this.previousUrl);
          } else {
            // Rediriger vers une page par défaut si la page précédente n'est pas disponible
            return this.router.navigate(['/']);
          }
        },
        (error) => {
          this.showErrorSnackbar = true;
          this.responseIcon = 'fa-exclamation-circle';
          this.responseMsg = JSON.stringify(error.error);
          setTimeout(() => {
            this.showErrorSnackbar = false;
            this.submittingForm = false;
          }, 1500);
        }
      );
  }

  submitRegister(): void {
    if (this.registerForm.valid) {
      this.submittingForm = true;
      const newsletterValue = this.checkboxValue(
        this.registerForm.value.newsletter
      );
      this.registerForm.value.newsletter = newsletterValue.toString();
      const formData = this.registerForm.value;
      if (typeof formData.mobile_phone === 'number') {
        formData.mobile_phone = formData.mobile_phone.toString();
      }
      this.apiService.createItem(Endpoint.REGISTER, formData).subscribe(
        (response) => {
          this.responseIcon = 'fa-check-circle';
          this.responseMsg = 'Inscription reussi';
          this.showSucessSnackbar = true;

          const successSignUp = {
            email: this.registerForm.value.email,
            name: this.registerForm.value.last_name,
            message: Constants.REGISTER_SUCCESS,
          };

          this.cryptoService.setEncryptedItem(
            Constants.SUCCESS_SIGN_UP_NOTIFY,
            successSignUp
          );

          setTimeout(() => {
            this.showSucessSnackbar = false;
          }, 1300);
          return this.router.navigate(['/login']);
        },
        (error) => {
          this.showErrorSnackbar = true;
          this.responseIcon = 'fa-exclamation-circle';
          this.responseMsg = error.message;
          setTimeout(() => {
            this.showErrorSnackbar = false;
            this.submittingForm = false;
          }, 5500);
        }
      );
    } else {
      this.showErrorFormSnackbar = true;
      this.responseIcon = 'fa-exclamation-circle';
      this.responseMsg = 'Veuillez remplir tout les champs';
      setTimeout(() => {
        this.showErrorFormSnackbar = false;
      }, 1500);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group(
      {
        last_name: ['', Validators.required],
        first_name: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
        country: ['', Validators.required],
        newsletter: [false],

        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        c_password: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    this.isNowRegister = this.cryptoService.getDecryptedItem(
      Constants.SUCCESS_SIGN_UP_NOTIFY
    );

    if (this.isNowRegister) {
      this.showNowRegisterMsg = true;
    }
  }
  passwordMatchValidator(g: FormGroup) {
    const passwordControl = g.get('password');
    const cPasswordControl = g.get('c_password');

    if (!passwordControl || !cPasswordControl) {
      // Handle the case where controls are null (optional)
      return { mismatch: true };
    }

    const password = passwordControl.value;
    const cPassword = cPasswordControl.value;

    return password === cPassword ? null : { mismatch: true };
  }

  checkboxValue(checked: boolean): number {
    return checked ? 1 : 0;
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmationVisibility() {
    this.confirmationVisible = !this.confirmationVisible;
  }
  ngAfterContentInit(): void {}
}
