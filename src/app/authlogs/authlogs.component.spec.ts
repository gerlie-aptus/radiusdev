import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthlogsComponent } from './authlogs.component';

describe('AuthlogsComponent', () => {
  let component: AuthlogsComponent;
  let fixture: ComponentFixture<AuthlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
