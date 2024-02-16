import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './pages/login/login.component';
import {AuthComponent} from './auth.component';
import {RegistryComponent} from './pages/registry/registry.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from "../../core/services/auth/auth.service";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, AuthComponent, RegistryComponent],
  providers: [AuthService]
})
export class AuthModule {
}
