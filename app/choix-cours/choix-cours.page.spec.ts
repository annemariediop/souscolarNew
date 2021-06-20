import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoixCoursPage } from './choix-cours.page';

describe('ChoixCoursPage', () => {
  let component: ChoixCoursPage;
  let fixture: ComponentFixture<ChoixCoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixCoursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoixCoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
