import {  AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    console.log(this.el)
    this.el.nativeElement.focus()
  }

}
