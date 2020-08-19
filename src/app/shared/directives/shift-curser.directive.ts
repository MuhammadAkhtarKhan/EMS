import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[shiftCurser]'
})
export class ShiftCurserDirective {

  private el: ElementRef;
    @Input() shiftCurser: string;
    constructor(private _el: ElementRef) {
        this.el = this._el;
    }
    @HostListener('keydown', ['$event']) onKeyDown(e) {
      console.log(e)
      console.log(this.el)
      if ((e.which == 13 || e.keyCode == 13 || e.keyCode == 9)) {
          e.preventDefault();
          if (e.srcElement.nextElementSibling) {
              e.srcElement.nextElementSibling.focus();
          }
          else{
              console.log('close keyboard');
          }
          return;
      }

  }

}
