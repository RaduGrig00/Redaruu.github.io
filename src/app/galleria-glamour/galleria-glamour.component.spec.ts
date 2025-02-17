import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriaGlamourComponent } from './galleria-glamour.component';

describe('GalleriaGlamourComponent', () => {
  let component: GalleriaGlamourComponent;
  let fixture: ComponentFixture<GalleriaGlamourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleriaGlamourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleriaGlamourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
