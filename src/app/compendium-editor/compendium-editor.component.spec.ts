import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompendiumEditorComponent } from './compendium-editor.component';

describe('CompendiumEditorComponent', () => {
  let component: CompendiumEditorComponent;
  let fixture: ComponentFixture<CompendiumEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompendiumEditorComponent ]
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
