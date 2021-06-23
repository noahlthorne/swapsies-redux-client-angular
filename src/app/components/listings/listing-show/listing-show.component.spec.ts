import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingShowComponent } from './listing-show.component';

describe('ListingShowComponent', () => {
  let component: ListingShowComponent;
  let fixture: ComponentFixture<ListingShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
