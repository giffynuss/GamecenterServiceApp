import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Placeservice } from './placeservice';

describe('Placeservice', () => {
  let component: Placeservice;
  let fixture: ComponentFixture<Placeservice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Placeservice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Placeservice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
