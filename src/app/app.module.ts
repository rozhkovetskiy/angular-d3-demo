import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { GetDataService } from './../shared/services/get-data.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    GetDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
