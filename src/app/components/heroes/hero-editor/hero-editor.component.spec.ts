import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEditorComponent } from './hero-editor.component';

describe('HeroEditorComponent', () => {
  let component: HeroEditorComponent;
  let fixture: ComponentFixture<HeroEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeroEditorComponent]
    });
    fixture = TestBed.createComponent(HeroEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
