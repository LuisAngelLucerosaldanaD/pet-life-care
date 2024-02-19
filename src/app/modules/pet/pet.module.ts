import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetComponent} from "./pet.component";
import {PetRoutingModule} from "./pet-routing.module";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./pages/profile/profile.component";
import {VaccinesComponent} from "./pages/vaccines/vaccines.component";
import {StatisticsComponent} from "./pages/statistics/statistics.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {PetsService} from "../../core/services/pets/pets.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PetComponent,
    ProfileComponent,
    VaccinesComponent,
    StatisticsComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    PetRoutingModule,
    IonicModule,
    RouterModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PetsService]
})
export class PetModule {
}
