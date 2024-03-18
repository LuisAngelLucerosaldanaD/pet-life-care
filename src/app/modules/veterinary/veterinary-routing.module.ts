import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";
import {ProductsComponent} from "./pages/products/products.component";
import {VeterinaryComponent} from "./veterinary.component";

const routes: Routes = [
  {
    path: '',
    component: VeterinaryComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class VeterinaryRoutingModule {
}
