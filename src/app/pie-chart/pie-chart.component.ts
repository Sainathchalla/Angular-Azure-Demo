import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges {
  @Input() season?: number;
  @Input() team?: string;

  public pieChartData: any[] = [];
  colorScheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['season'] || changes['team']) {
      if (this.season && this.team) {
        this.fetchData(this.season, this.team);
      }
    }
  }

  fetchData(season: number, team: string) {
    const winUrl = `https://springbootazure-demo.azurewebsites.net/season/${season}/team/${team}/winPercentage`;
    const lossUrl = `https://springbootazure-demo.azurewebsites.net/season/${season}/team/${team}/lossPercentage`;
    // const winUrl = `http://localhost:8080/season/${season}/team/${team}/winPercentage`;
    // const lossUrl = `http://localhost:8080/season/${season}/team/${team}/lossPercentage`;

    this.http.get<number>(winUrl).subscribe(winPercentage => {
      this.http.get<number>(lossUrl).subscribe(lossPercentage => {
        this.pieChartData = [
          { name: 'Wins', value: winPercentage },
          { name: 'Losses', value: lossPercentage }
        ];
      });
    });
  }
}
