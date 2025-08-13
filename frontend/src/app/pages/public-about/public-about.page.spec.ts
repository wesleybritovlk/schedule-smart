import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAboutPage } from './public-about.page';

describe('PublicAboutPage', () => {
  let component: PublicAboutPage;
  let fixture: ComponentFixture<PublicAboutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicAboutPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
