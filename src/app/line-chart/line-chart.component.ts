import { Component, OnInit, ElementRef } from '@angular/core';
import { ChartConfig } from './../../shared/models/chart-cofig.model';
import { LineChart } from './line-chart';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public chart: any;
  public width = 500;
  public height = 500;
  public dataset = [[0, 0.8025205076320414],
                  [1, 0.009860874491264937],
                  [2, 0.7374621070577225],
                  [3, 0.4672894205626499],
                  [4, 0.5771275879798836],
                  [5, 0.9804576475414086],
                  [6, 0.15686324180029243],
                  [7, 0.1755566579246135],
                  [8, 0.018556830221934772],
                  [9, 0.694959293541209],
                  [10, 0.3999998477864566],
                  [11, 0.5487471130924302],
                  [12, 0.4645747780327121],
                  [13, 0.5631998038871862],
                  [14, 0.24626053618466148],
                  [15, 0.553582684084351],
                  [16, 0.07311096652373572],
                  [17, 0.3426058612932823],
                  [18, 0.45680766534822403],
                  [19, 0.09174853299215258],
                  [20, 0.39597633912581975]];

  private config = new ChartConfig({width: this.width, height: this.height});

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    this.chart = new LineChart(this._elementRef.nativeElement);
    this.chart.render(this.dataset, this.config);
  }
}
