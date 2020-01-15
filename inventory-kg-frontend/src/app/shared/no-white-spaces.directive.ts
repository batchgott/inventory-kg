import {Directive, ElementRef, HostListener} from '@angular/core';
import {AbstractControl, Validator} from '@angular/forms';

@Directive({
  selector: '[appNoWhiteSpaces]'
})
export class NoWhiteSpacesDirective {

  private regex: RegExp = /^\S*$/;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
  constructor(private el:ElementRef) { }


  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
