import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketMatchesComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';

describe('TableComponent', () => {
  let component: CricketMatchesComponent;
  let fixture: ComponentFixture<CricketMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CricketMatchesComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CricketMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
