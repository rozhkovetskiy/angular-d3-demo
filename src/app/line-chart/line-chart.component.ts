import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';
import { ChartConfig } from './../../shared/models/chart-cofig.model';
import { LineChart } from './line-chart';

interface IChartData {
  date: number;
  value: number;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() rawData: any;

  public chart: any;
  public width = 1000;
  public height = 500;

  private newYorkData: IChartData[] = [];
  private sanFranciscoData: IChartData[] = [];
  private austinData: IChartData[] = [];


  private config = new ChartConfig({width: this.width, height: this.height});

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.chart = new LineChart(this._elementRef.nativeElement);
  }

  ngOnChanges() {
    if (this.rawData) {
      this.parseData(this.rawData);

    }
  }

  private parseData(data): void {
    data.forEach((item) => {
      this.newYorkData.push({date: item.date, value: item['New York']});
      this.sanFranciscoData.push({date: item.date, value: item['San Francisco']});
      this.austinData.push({date: item.date, value: item['Austin']});
    });
    this.chart.render(this.newYorkData, this.config);
    this.chart.addLine(this.sanFranciscoData, 'blue');
    this.chart.addLine(this.austinData, 'green');
  }
}
