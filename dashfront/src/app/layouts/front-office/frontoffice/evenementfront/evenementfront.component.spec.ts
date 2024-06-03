import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementfrontComponent } from './evenementfront.component';

describe('EvenementfrontComponent', () => {
  let component: EvenementfrontComponent;
  let fixture: ComponentFixture<EvenementfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
