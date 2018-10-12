import { Component, OnInit } from '@angular/core';

import { GetDataService } from '../../shared/services/get-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public rawData: any;
  public chartsData = [];
  public chartChanges = {};

  constructor(private _getDataService: GetDataService) { }

  ngOnInit() {
    this._getDataService.getLineChartData()
      .subscribe((response) => {
        this.rawData = response;
        this.getCharts(this.rawData[0]);
      });
  }

  public changes(id: string, show: boolean ): void {
    this.chartChanges = { id, show };
  }

  private getCharts(data: Object): void {
    const cityNames = Object.keys(data).splice(1);
    cityNames.forEach((item) => {
      this.chartsData.push({ id: item.replace(' ', ''), name: item, show: true });
    });
  }
}
