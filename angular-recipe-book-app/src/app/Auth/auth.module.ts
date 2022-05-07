import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild([ {
    path: '' , component: AuthComponent
  }]),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})

export class AuthModule {

}
