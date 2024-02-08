import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-two',
  templateUrl: './counter-two.component.html',
  styleUrls: ['./counter-two.component.css'],
})
export class CounterTwoComponent implements OnInit {
  constructor() {}
  countPost = [
    {
      icon: 'flaticon-user-1',
      value: 8000,
      prefix: '',
      title: 'Clients satisfait',
    },
    {
      icon: 'flaticon-like',
      value: 10,
      prefix: 'M',
      title: 'Commentaires et appréciations',
    },
    {
      icon: 'flaticon-suitcase',
      value: 100,
      prefix: '',
      title: 'Paténaire',
    },
  ];

  ngOnInit(): void {}
}
