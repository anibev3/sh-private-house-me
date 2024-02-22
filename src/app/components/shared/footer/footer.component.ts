import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() isCopyRight: boolean = true;
  newsletterForm: FormGroup;
  public email: any;
  public isSuccess: boolean = false;
  public isError: boolean = false;
  public message: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      this.email = this.newsletterForm.value.email;
      const formData = {
        email: this.email,
      };

      this.apiService.createItem('subscribe-newsletter', formData).subscribe(
        (response) => {
          // console.log(response);

          if (response.status === 'success') {
            this.isSuccess = true;
            this.message = 'Inscription réussie !';
          } else {
            this.isError = true;
            this.message = 'Ce adresse email est déjà utilisé';
          }
        },
        (error) => {
          this.isError = true;
          this.message =
            "Une erreur s'est produite, veuillez ressayer plus tard";
        }
      );
    }
  }

  ngOnInit(): void {}
}
