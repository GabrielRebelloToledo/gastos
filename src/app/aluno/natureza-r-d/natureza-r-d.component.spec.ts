import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturezaRDComponent } from './natureza-r-d.component';

describe('NaturezaRDComponent', () => {
  let component: NaturezaRDComponent;
  let fixture: ComponentFixture<NaturezaRDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturezaRDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturezaRDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
