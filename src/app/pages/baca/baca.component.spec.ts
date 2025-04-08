import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacaComponent } from './baca.component';

describe('BacaComponent', () => {
  let component: BacaComponent;
  let fixture: ComponentFixture<BacaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
