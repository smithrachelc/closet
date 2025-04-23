import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosetDashboardComponent } from './closet-dashboard.component';

describe('ClosetDashboardComponent', () => {
  let component: ClosetDashboardComponent;
  let fixture: ComponentFixture<ClosetDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosetDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
