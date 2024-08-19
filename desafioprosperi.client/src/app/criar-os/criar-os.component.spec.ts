import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarOsComponent } from './criar-os.component';

describe('CriarOsComponent', () => {
  let component: CriarOsComponent;
  let fixture: ComponentFixture<CriarOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarOsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
