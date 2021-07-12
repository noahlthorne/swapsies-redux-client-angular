import { Component, Input, OnInit } from '@angular/core';
import { Swap } from 'src/app/models/Swap.model';

@Component({
  selector: 'app-swap-card',
  templateUrl: './swap-card.component.html',
  styleUrls: ['./swap-card.component.scss'],
})
export class SwapCardComponent implements OnInit {
  @Input() swap: Swap;
  constructor() {}

  ngOnInit(): void {}
}
