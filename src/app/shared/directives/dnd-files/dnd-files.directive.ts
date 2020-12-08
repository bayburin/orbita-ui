import { Directive, HostListener, EventEmitter, Output, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDndFiles]'
})
export class DndFilesDirective {
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }

  @HostBinding('class.fileover') fileOver: boolean;

  @HostListener('dragover') onDragOver(): void {
    this.fileOver = true;
  }

  @HostListener('dragleave') onDragLeave(): void {
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;

    this.fileOver = false;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
