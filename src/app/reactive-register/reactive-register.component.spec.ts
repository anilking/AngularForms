import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveRegisterComponent } from './reactive-register.component';

describe('ReactiveRegisterComponent', () => {
  let component: ReactiveRegisterComponent;
  let fixture: ComponentFixture<ReactiveRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactiveRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
