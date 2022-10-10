import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output()
  fileEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private dataServeice: DataService) { }

  @HostListener('dragover', ['$event']) onDragOver (evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('Drag Over');
  }

  @HostListener('dragleave', ['$event']) onDragLeave (evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('Drag Leave');
  }

  @HostListener('drop', ['$event']) onDrop (evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileEmitter.emit(evt.dataTransfer.files);
  }

}
