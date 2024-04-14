import { Component } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { PublicService } from '../../Service/public.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  chart = new Chart({
    chart: {
      type: 'line',
    },
    title: {
      text: 'Linechart',
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3],
        type: 'line',
      },
    ],
  });
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
  constructor(public service: PublicService) {}
  showSidebar: any;
  ngOnInit(): void {
    this.service.showSidebar$.subscribe((show) => {
      this.showSidebar = show;
    });
  }
}
