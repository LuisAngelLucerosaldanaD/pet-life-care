import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {PetsComponent} from "./pages/pets/pets.component";
import {IonicModule} from "@ionic/angular";
import {VeterinaryComponent} from "./pages/veterinary/veterinary.component";
import {RouterModule} from "@angular/router";
import {PetsService} from "../../core/services/pets/pets.service";
import {VeterinaryService} from "../../core/services/veterinary/veterinary.service";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [HomeComponent, PetsComponent, VeterinaryComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        IonicModule,
        RouterModule,
        ReactiveFormsModule
    ],
  providers: [PetsService, VeterinaryService]
})
export class HomeModule { }
