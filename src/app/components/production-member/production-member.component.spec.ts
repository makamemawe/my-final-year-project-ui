import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMemberComponent } from './production-member.component';

describe('ProductionMemberComponent', () => {
  let component: ProductionMemberComponent;
  let fixture: ComponentFixture<ProductionMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
