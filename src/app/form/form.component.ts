import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface FormValues {
  season: number;
  team: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  form: FormGroup;
  seasons: number[] = [];
  teams: string[] = [];

  @Output() formSubmit: EventEmitter<FormValues> = new EventEmitter<FormValues>(); // Emit typed data

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      season: ['', Validators.required],
      team: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Any initialization logic if needed
    this.fetchTeams();
    this.fetchSeasons();
  }

  fetchTeams() {
    this.http.get<string[]>('https://springbootazure-demo.azurewebsites.net/teams')
      .subscribe(data => {
        this.teams = data;
      });
  }

  fetchSeasons() {
    this.http.get<number[]>('https://springbootazure-demo.azurewebsites.net/seasons')
      .subscribe(data => {
        this.seasons = data;
      });
  }

  onSubmit() {
    if (this.form.valid) {
      // Process the form data (season and team)
      const formValues = this.form.value as FormValues;
      this.formSubmit.emit(formValues);
    } else {
      // Show an error message indicating that both options are required (optional)
      this.form.markAllAsTouched();
    }
  }
}