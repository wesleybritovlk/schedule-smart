import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomePage } from './public-home.page';

describe('PublicHomePage', () => {
  let component: PublicHomePage;
  let fixture: ComponentFixture<PublicHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicHomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
