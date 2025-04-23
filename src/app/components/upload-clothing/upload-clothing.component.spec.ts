import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadClothingComponent } from './upload-clothing.component';

describe('UploadClothingComponent', () => {
  let component: UploadClothingComponent;
  let fixture: ComponentFixture<UploadClothingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadClothingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadClothingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
