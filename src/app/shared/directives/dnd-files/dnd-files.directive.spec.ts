import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DndFilesDirective } from './dnd-files.directive';

@Component({
  template: '<div appDndFiles (fileDropped)="onFileDropped($event)"></div>'
})
class TestComponent {
  onFileDropped(): void {}
}

describe('DndFilesDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: DndFilesDirective;
  let directiveElement: any;
  let event: DragEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        DndFilesDirective
      ],
      providers: [DndFilesDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.css('div')).nativeElement;
    directive = TestBed.inject(DndFilesDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('when user drag over component', () => {
    beforeEach(() => {
      directiveElement.dispatchEvent(new DragEvent('dragover'));
      fixture.detectChanges();
    });

    it('should add "fileover" class', () => {
      expect(directiveElement.getAttribute('class')).toContain('fileover');
    });

    describe('and when user drag leave component', () => {
      it('should remove "fileover class', () => {
        directiveElement.dispatchEvent(new DragEvent('dragleave'));
        fixture.detectChanges();

        expect(directiveElement.getAttribute('class')).not.toContain('fileover');
      });
    });
  });

  describe('Drop event', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      event = new DragEvent('drop');
      spy = spyOn(component, 'onFileDropped');
    });

    it('should emit "fileDropped" event with received files', () => {
      Object.defineProperty(event, 'dataTransfer', { value: { files: [1, 2] } });
      directiveElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith([1, 2]);
    });

    it('should not emit "fileDropped" event if no files received', () => {
      Object.defineProperty(event, 'dataTransfer', { value: { files: [] } });
      directiveElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
