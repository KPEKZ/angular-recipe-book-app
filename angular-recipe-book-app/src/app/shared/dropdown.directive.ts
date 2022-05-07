import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDrective {

    constructor(private elementRef: ElementRef) { }

    @HostBinding('class.show') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}