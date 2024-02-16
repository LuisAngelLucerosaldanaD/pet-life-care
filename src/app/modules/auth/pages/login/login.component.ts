import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../../../../core/services/auth/auth.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login} from "../../../../core/models/request";
import {HttpErrorResponse} from "@angular/common/http";
import {LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {

  private _subscriptions: Subscription = new Subscription();

  public isLoading: boolean = false;
  public loginForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _toastController: ToastController,
    private _router: Router,
    private _loadingController: LoadingController
  ) {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Ciclo de vida del componente que se ejecuta cuando el componente es destruido o desmontado (Component did unmount)
   * Para este caso de uso, este ciclo de vida destruye todos las conexiones y subscripciones
   */
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /**
   * Método que captura los datos (username-password) del formulario reactivo de angular
   * con el fin de poder iniciar sesión en la aplicación.
   * Los datos que se envian para iniciar sesión corresponden al schema {Login}
   * @return Promise<void> - Retorna una promesa sin datos en la respuesta
   */
  public async login(): Promise<void> {

    if (this.loginForm.invalid) {
      const toast = await this._toastController.create({
        message: 'Complete todos los campos requeridos',
        duration: 3000,
        position: 'top',
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const indicator = await this.loadingIndicator();

    const data: Login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this._subscriptions.add(
      this._authService.login(data).subscribe({
        next: async (res) => {
          await indicator.dismiss();
          if (res.error) {
            const toast = await this._toastController.create({
              message: res.msg,
              duration: 3000,
              position: 'top',
              color: 'danger'
            });
            await toast.present();
            return;
          }

          await this._router.navigateByUrl('/tabs');
          return;
        },
        error: async (err: HttpErrorResponse) => {
          const toast = await this._toastController.create({
            message: 'No se pudo iniciar seción, intente nuevamente!',
            duration: 3000,
            position: 'top',
            color: 'danger'
          });
          await indicator.dismiss();
          await toast.present();
          console.error(err);
          return;
        }
      })
    );

  }

  /**
   * Este método crea y presenta un indicador de carga.
   * Utiliza el LoadingController de Ionic para crear un indicador de carga con un mensaje de 'Cargando...'.
   * Luego, el indicador de carga se presenta al usuario.
   * El método es asíncrono, lo que significa que devuelve una Promesa que se resuelve en el LoadingIndicator creado.
   * Esto permite que el código que llama pueda descartar el indicador de carga cuando la operación de carga está completa.
   *
   * @returns {Promise<HTMLIonLoadingElement>} Una Promesa que se resuelve en el LoadingIndicator creado.
   */
  private async loadingIndicator(): Promise<HTMLIonLoadingElement> {
    const loadingIndicator = await this._loadingController.create({
      message: 'Loading...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }

}
