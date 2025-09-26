import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListItemAddComponent } from './task-list-item-add.component';

describe('TaskListItemAddComponent', () => {
  let component: TaskListItemAddComponent;
  let fixture: ComponentFixture<TaskListItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListItemAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
