import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  public steepsOptions: any;
  public foodOptions: any;
  constructor() {
    this.steepsOptions = {
      series: [70],
      chart: {
        height: 160,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70"
          }
        }
      },
      labels: ["Pasos"]
    };

    this.foodOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 200,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }
      ]
    };
  }

    protected readonly window = window;
}
