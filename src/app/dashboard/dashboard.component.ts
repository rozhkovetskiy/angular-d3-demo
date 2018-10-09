import { Component, OnInit } from '@angular/core';

import { GetDataService } from '../../shared/services/get-data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public rawData: any;
  constructor(private _getDataService: GetDataService) { }

  ngOnInit() {
    this._getDataService.getLineChartData()
      .subscribe((response) => {
        this.rawData = response;
      });
  }

}
