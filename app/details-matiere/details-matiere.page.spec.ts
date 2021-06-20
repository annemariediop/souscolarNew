import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsMatierePage } from './details-matiere.page';

describe('DetailsMatierePage', () => {
  let component: DetailsMatierePage;
  let fixture: ComponentFixture<DetailsMatierePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMatierePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsMatierePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
