import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsContainerComponent } from './listings-container.component';

describe('ListingsContainerComponent', () => {
  let component: ListingsContainerComponent;
  let fixture: ComponentFixture<ListingsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
