import { Directive, HostListener } from '@angular/core';
import { allowedKeys } from './allowed-keys';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[DigitOnly]'
})
export class DigitOnlyDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (this.isAllowedOnKeydown(e) === false) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, '');
    document.execCommand('insertText', false, pastedInput);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer
      .getData('text').replace(/\D/g, '');
    document.execCommand('insertText', false, textData);
  }

  private isAllowedOnKeydown(e: KeyboardEvent) {
    return allowedKeys.includes(e.code) ||
      this.isSelectAll(e) ||
      this.isCopy(e) ||
      this.isPaste(e) ||
      this.isCut(e);
  }

  private isSelectAll(e: KeyboardEvent) {
    return e.code === 'KeyA' && (e.metaKey === true || e.ctrlKey === true);
  }

  private isCopy(e: KeyboardEvent) {
    return e.code === 'KeyC' && (e.metaKey === true || e.ctrlKey === true);
  }

  private isPaste(e: KeyboardEvent) {
    return e.code === 'KeyV' && (e.metaKey === true || e.ctrlKey === true);
  }

  private isCut(e: KeyboardEvent) {
    return e.code === 'KeyX' && (e.metaKey === true || e.ctrlKey === true);
  }

}
