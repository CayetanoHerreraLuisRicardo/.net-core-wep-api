import { Directive, ElementRef, HostListener, HostBinding, Renderer2 } from '@angular/core';
@Directive({
    selector: "[buttonClick]",
})
export class ButtonClickDirective {

    @HostBinding('class.card-outline-primary') private ishovering: boolean;

    constructor(private el: ElementRef,
        private renderer: Renderer2) {
        // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
    }

    @HostListener('mouseover') onMouseOver() {
        console.log("mouseover")
    }

    @HostListener('mouseout') onMouseOut() {
        console.log("mouseout")
    }
}