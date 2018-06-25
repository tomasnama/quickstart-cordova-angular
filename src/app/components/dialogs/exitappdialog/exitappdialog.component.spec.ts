import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitappdialogComponent } from './exitappdialog.component';

describe('ExitappdialogComponent', () => {
  let component: ExitappdialogComponent;
  let fixture: ComponentFixture<ExitappdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitappdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitappdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
