import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  lineChartUrl = './assets/data-example.json';

  constructor(private _http: HttpClient) { }

  public getLineChartData(): Observable<any> {
    return this._http.get(this.lineChartUrl);
  }
}
