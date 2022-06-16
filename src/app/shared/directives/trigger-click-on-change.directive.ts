import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appTriggerClickOnChange]',
})
export class TriggerClickOnChangeDirective {
  @HostListener('change', ['$event']) triggerClick(event: Event) {
    event.cancelBubble = true;
    console.log(event);
    // this.elRef.nativeElement.click();
  }
  @HostListener('document:click', ['$event']) documentClick(event: Event) {}
  constructor(private elRef: ElementRef) {}
}
