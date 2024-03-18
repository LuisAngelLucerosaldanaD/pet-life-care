import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VeterinaryComponent} from "./veterinary.component";
import {IonicModule} from "@ionic/angular";
import {ProductsComponent} from "./pages/products/products.component";
import {VeterinaryRoutingModule} from "./veterinary-routing.module";
import {ProfileComponent} from "./pages/profile/profile.component";


@NgModule({
  declarations: [VeterinaryComponent, ProductsComponent, ProfileComponent],
  imports: [
    CommonModule,
    IonicModule,
    VeterinaryRoutingModule
  ]
})
export class VeterinaryModule {
}
