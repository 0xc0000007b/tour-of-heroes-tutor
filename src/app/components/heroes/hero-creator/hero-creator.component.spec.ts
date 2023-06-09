import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCreatorComponent } from './hero-creator.component';

describe('HeroCreatorComponent', () => {
  let component: HeroCreatorComponent;
  let fixture: ComponentFixture<HeroCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeroCreatorComponent]
    });
    fixture = TestBed.createComponent(HeroCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
