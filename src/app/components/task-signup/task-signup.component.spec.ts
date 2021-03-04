import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSignupComponent } from './task-signup.component';

describe('TaskSignupComponent', () => {
  let component: TaskSignupComponent;
  let fixture: ComponentFixture<TaskSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
