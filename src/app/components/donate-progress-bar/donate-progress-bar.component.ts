import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'donate-progress-bar',
  templateUrl: './donate-progress-bar.component.html',
  styleUrls: ['./donate-progress-bar.component.scss']
})
export class DonateProgressBarComponent implements OnChanges {

  @Input()
  public collected!: number;
  @Input()
  public amount!: number;

  public percentOfCollected: string = '0';

  constructor() { }

  ngOnChanges(): void {
    this.percentOfCollected = this._calculatePercentOfCollected();
  }

  private _calculatePercentOfCollected(): string {
    
    return (this.collected / this.amount * 100).toFixed(2);
  }

}
