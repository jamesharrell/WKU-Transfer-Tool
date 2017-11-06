import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassViewPageComponent } from './class-view-page.component';

describe('ClassViewPageComponent', () => {
  let component: ClassViewPageComponent;
  let fixture: ComponentFixture<ClassViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
