import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTituloComponent } from './tipo-titulo.component';

describe('TipoTituloComponent', () => {
  let component: TipoTituloComponent;
  let fixture: ComponentFixture<TipoTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTituloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
