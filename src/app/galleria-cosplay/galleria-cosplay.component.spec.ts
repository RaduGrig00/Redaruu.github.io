import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriaCosplayComponent } from './galleria-cosplay.component';

describe('GalleriaCosplayComponent', () => {
  let component: GalleriaCosplayComponent;
  let fixture: ComponentFixture<GalleriaCosplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleriaCosplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleriaCosplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
