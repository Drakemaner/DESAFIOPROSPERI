import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOsComponent } from './form-os.component';

describe('FormOsComponent', () => {
  let component: FormOsComponent;
  let fixture: ComponentFixture<FormOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormOsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
