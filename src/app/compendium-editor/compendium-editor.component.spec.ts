import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompendiumEditorComponent } from './compendium-editor.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DigitOnlyDirective } from '../directives/digit-only/digit-only.directive';

describe('CompendiumEditorComponent', () => {
  let component: CompendiumEditorComponent;
  let fixture: ComponentFixture<CompendiumEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompendiumEditorComponent, DigitOnlyDirective ],
      imports: [
        NgxPaginationModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompendiumEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
