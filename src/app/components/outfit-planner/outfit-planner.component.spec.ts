import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitPlannerComponent } from './outfit-planner.component';

describe('OutfitPlannerComponent', () => {
  let component: OutfitPlannerComponent;
  let fixture: ComponentFixture<OutfitPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitPlannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
