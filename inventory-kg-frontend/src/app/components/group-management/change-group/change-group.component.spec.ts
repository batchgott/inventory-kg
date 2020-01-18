import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeGroupComponent } from './change-group.component';

describe('ChangeGroupComponent', () => {
  let component: ChangeGroupComponent;
  let fixture: ComponentFixture<ChangeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
