import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNicknameComponent } from './dialog-nickname.component';

describe('DialogNicknameComponent', () => {
  let component: DialogNicknameComponent;
  let fixture: ComponentFixture<DialogNicknameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNicknameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
