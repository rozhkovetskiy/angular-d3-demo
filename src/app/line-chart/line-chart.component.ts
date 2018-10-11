import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';
import { ChartConfig } from './../../shared/models/chart-cofig.model';
import { LineChart } from './line-chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input('rawData') rawData: any;
  @Input('cities') cities: any;

  public chart: any;
  public width = 1000;
  public height = 500;

  private config = new ChartConfig({width: this.width, height: this.height});

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.chart = new LineChart(this._elementRef.nativeElement);
  }

  ngOnChanges() {
    if (this.rawData) {
      this.chart.render(this.rawData, this.config);
      this.chart.showLine();
    }
  }
}
