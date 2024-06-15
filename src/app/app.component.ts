import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CricketMatchesComponent} from './table/table.component';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CricketMatchesComponent, FormComponent, CommonModule]
})
export class AppComponent {

  constructor(private http:HttpClient) {}

  title = 'my-angular-project';
}