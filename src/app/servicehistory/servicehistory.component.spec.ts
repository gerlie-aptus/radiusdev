import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicehistoryComponent } from './servicehistory.component';

describe('ServicehistoryComponent', () => {
  let component: ServicehistoryComponent;
  let fixture: ComponentFixture<ServicehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
