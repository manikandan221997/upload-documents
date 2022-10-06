import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeciderViewComponent } from './decider-view.component';

describe('DeciderViewComponent', () => {
  let component: DeciderViewComponent;
  let fixture: ComponentFixture<DeciderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeciderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeciderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
