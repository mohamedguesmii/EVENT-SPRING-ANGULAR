import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemplirreservationComponent } from './remplirreservation.component';

describe('RemplirreservationComponent', () => {
  let component: RemplirreservationComponent;
  let fixture: ComponentFixture<RemplirreservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemplirreservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemplirreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
