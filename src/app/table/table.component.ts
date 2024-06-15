import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

interface FormValues { // Define the interface here
  season: number;
  team: string;
}

interface Match {
  season: number;
  city: string;
  date: string;
  match_type: string;
  player_of_match: string;
  venue: string
  team1: string
  team2: string
  toss_winner: string
  toss_decision: string
  winner: string
  result: string
  result_margin: number
  target_runs: number
  target_overs: number
  super_over: string
  method: string
  umpire1: string
  umpire2: string
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormComponent, PieChartComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})


@Injectable({
  providedIn : 'root'
})

export class CricketMatchesComponent implements OnInit {

  constructor(private http: HttpClient) {}

  matches: Match[] = [];
  selectedSeason?: number;
  selectedTeam?: string;
  displayedColumns: string[] = [
    'season',
    'city',
    'date',
    'match_type',
    'player_of_match',
    'venue',
    'team1',
    'team2',
    'toss_winner',
    'toss_decision',
    'winner',
    'result',
    'result_margin',
    'target_runs',
    'target_overs',
    'super_over',
    'method',
    'umpire1',
    'umpire2'
  ];

  ngOnInit() {
    //this.fetchData();
  }

  onFormSubmit(formValues: FormValues) { // Use the correct data type
    const { season, team } = formValues;
    this.selectedSeason = season;
    this.selectedTeam = team;
    this.fetchData(season, team);
  }

  fetchData(season: number, team: string) {
    const url = `https://springbootazure-demo.azurewebsites.net/season/${season}/team/${team}`;
    // const url = `http://localhost:8080/season/${season}/team/${team}`;
    this.http.get<Match[]>(url).subscribe(data => this.matches = data);
  }
}