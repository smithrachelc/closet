import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOutfitsComponent } from './public-outfits.component';

describe('PublicOutfitsComponent', () => {
  let component: PublicOutfitsComponent;
  let fixture: ComponentFixture<PublicOutfitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicOutfitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicOutfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
