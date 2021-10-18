import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {DropdownDrective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDrective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDrective,
    CommonModule
  ]
})
export class SharedModule {

}
