import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PetsComponent} from "./pages/pets/pets.component";
import {HomeComponent} from "./home.component";
import {VeterinaryComponent} from "./pages/veterinary/veterinary.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'pets',
        component: PetsComponent
      },
      {
        path: 'veterinary',
        component: VeterinaryComponent
      },
      {
        path: '',
        redirectTo: 'pets',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
