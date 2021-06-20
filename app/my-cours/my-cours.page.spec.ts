import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyCoursPage } from './my-cours.page';

describe('MyCoursPage', () => {
  let component: MyCoursPage;
  let fixture: ComponentFixture<MyCoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCoursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
