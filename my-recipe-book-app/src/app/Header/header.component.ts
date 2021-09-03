import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    onClassToggle(element: HTMLElement) {
        element.classList.toggle('show');
    }
}