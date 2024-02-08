import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/components/services/api/api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  model = new Contact();
  submitted = false;
  error: {} | undefined;
  date2!: Date;

  contactForm: FormGroup;
  public email: any;
  public isSuccess: boolean = false;
  public isError: boolean = false;
  public message: string = '';
  display: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      content: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
  resolved(captchaResponse: string) {}
  zoom: number = 12;
  lat: number = 31.53912;
  lng: number = -89.29163;

  showDialog() {
    this.display = true;
  }
  onSubmit() {
    if (this.contactForm.valid) {
      const formData = {
        email: this.contactForm.value.email,
        name: this.contactForm.value.name,
        phone: this.contactForm.value.phone,
        subject: this.contactForm.value.subject,
        content: this.contactForm.value.content,
        address: this.contactForm.value.address,
      };

      this.apiService.createItem('contacts', formData).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.isSuccess = true;
            this.message = 'Inscription réussie !';
            setTimeout(() => {
              this.isSuccess = false;
            }, 10000);
            this.contactForm = this.fb.group({
              email: [''],
              name: [''],
              phone: [''],
              subject: [''],
              content: [''],
              address: [''],
            });
          } else {
            // console.error("Échec de l'inscription");
            this.isError = true;
            this.message = 'Ce adresse email est déjà utilisé';
            setTimeout(() => {
              this.isError = false;
            }, 10000);
          }
        },
        (error) => {
          // console.error("Erreur lors de l'inscription", error);
          this.isError = true;
          this.message =
            "Une erreur s'est produite, veuillez ressayer plus tard";
          setTimeout(() => {
            this.isError = false;
          }, 1000);
        }
      );
    }
  }
}
