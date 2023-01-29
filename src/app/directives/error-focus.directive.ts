import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[InvalidFocus]'
})
export class ErrorFocusDirective {

  constructor(private el: ElementRef) { }

  @HostListener('submit')

  onSubmit() {
    this.el.nativeElement.querySelector('.ng-invalid')?.focus()
  }

}
