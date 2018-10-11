import { Component, OnInit } from '@angular/core';

import { GetDataService } from '../../shared/services/get-data.service';

interface CityCheckbox {
  name: string;
  show: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public rawData: any;
  public cities: CityCheckbox[] = [];

  constructor(private _getDataService: GetDataService) { }

  ngOnInit() {
    this._getDataService.getLineChartData()
      .subscribe((response) => {
        this.rawData = response;
        this.getCharts(this.rawData[0]);
      });
  }

  public showChart(city: string): void {
    console.log(city);
  }

  private getCharts(data: Object): void {
    const cityNames = Object.keys(data).splice(1);
    cityNames.forEach((item) => {
      this.cities.push({name: item, show: true});
    });
    console.log(this.cities);
  }
}
