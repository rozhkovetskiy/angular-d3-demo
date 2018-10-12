import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfig } from '../../shared/models/chart-cofig.model';
import { LineChart } from './line-chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input('rawData') rawData: any;
  @Input('chartChanges') chartChanges: Object;

  public chart: any;
  public width = 1000;
  public height = 500;

  private chartInit = false;
  private config = new ChartConfig({width: this.width, height: this.height});

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.chart = new LineChart(this._elementRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {

      if (changes.hasOwnProperty(propName)) {

        // init chart
        if (propName === 'rawData' && typeof changes[propName].currentValue !== 'undefined' && !this.chartInit) {
          this.chartInit = true;
          this.chart.render(this.rawData, this.config);
        }

        // check for changin state of line
        if (propName === 'chartChanges' && changes[propName].currentValue.hasOwnProperty('show')) {
          this.chart.toggleLine(changes[propName].currentValue.id, changes[propName].currentValue.show);
        }
      }
    }
  }

}

