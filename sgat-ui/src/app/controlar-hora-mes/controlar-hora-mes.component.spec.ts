import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlarHoraMesComponent } from './controlar-hora-mes.component';

describe('ControlarHoraMesComponent', () => {
  let component: ControlarHoraMesComponent;
  let fixture: ComponentFixture<ControlarHoraMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlarHoraMesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlarHoraMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
