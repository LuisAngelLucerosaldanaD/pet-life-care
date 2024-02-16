import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PetComponent} from "./pet.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {VaccinesComponent} from "./pages/vaccines/vaccines.component";
import {StatisticsComponent} from "./pages/statistics/statistics.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";

const routes: Routes = [
  {
    path: '',
    component: PetComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'vaccines',
        component: VaccinesComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
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
export class PetRoutingModule {}
