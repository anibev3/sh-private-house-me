import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CryptoService } from '../../services/crypto/crypto.service';
import { Constants } from '../../constants.ts/constants';
import { Endpoint } from '../../constants.ts/enpoint';
import { City } from '../../models/city';
import { Functions } from '../../services/api/function';
import { Subscription } from 'rxjs';
import { Review } from '../../models/review-interface-customer.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  @Input() displayBottom!: boolean;
  @Input() displayTop!: boolean;
  @Input() review!: Review;
  @Input() comment: Comment | null = null;
  @Input() mark!: any;
  val2: number = 3;
  displayMaximizable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private cryptoService: CryptoService,
    private functions: Functions
  ) {}

  ngOnInit() {
    // console.log('REVIEWS', this.review);
    // console.log('COMMENTS', this.comment);
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
}
