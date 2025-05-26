import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoInsertComponent } from './producto-insert.component';

describe('ProductoInsertComponent', () => {
  let component: ProductoInsertComponent;
  let fixture: ComponentFixture<ProductoInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
