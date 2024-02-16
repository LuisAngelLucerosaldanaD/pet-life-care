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
    NgApexchartsModule
  ]
})
export class PetModule {
}
