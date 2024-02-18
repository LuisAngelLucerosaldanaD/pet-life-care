import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Registry} from "../../../../core/models/request";

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss'],
})
export class RegistryComponent implements OnDestroy {

  private _subscriptions: Subscription = new Subscription();

  public registerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _toastController: ToastController,
    private _router: Router,
    private _authService: AuthService,
    private _loadingController: LoadingController
  ) {
    this.registerForm = this._fb.group({
      names: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lastnames: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      password: ['', Validators.required],
      age: ['', Validators.required],
      city: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /**
   * Este método es responsable de registrar un nuevo usuario.
   * Primero, verifica si el formulario de registro es válido. Si no es válido, crea y presenta un mensaje de error.
   * Si el formulario es válido, crea y presenta un indicador de carga.
   * Luego, intenta registrar al usuario con los valores del formulario de registro.
   * Si la respuesta del servicio de autenticación contiene un error, se descarta el indicador de carga y se presenta un mensaje de error.
   * Si la respuesta del servicio de autenticación es exitosa, se descarta el indicador de carga y se presenta un mensaje de éxito.
   * Finalmente, si la respuesta del servicio de autenticación es exitosa, se redirige al usuario a la página de inicio.
   * Si ocurre un error durante la llamada al servicio de autenticación, se descarta el indicador de carga, se presenta un mensaje de error y se registra el error.
   *
   * @returns {Promise<void>} Una promesa que se resuelve cuando se completa el método.
   */
  public async registry(): Promise<void> {
    if (this.registerForm.invalid) {
      const toast = await this._toastController.create({
        message: 'Complete todos los campos requeridos del formulario',
        duration: 3000,
        position: 'top',
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const indicator = await this.loadingIndicator();
    const data: Registry = {
      names: this.registerForm.value.names,
      lastnames: this.registerForm.value.lastnames,
      email: this.registerForm.value.email,
      cellphone: this.registerForm.value.cellphone,
      age: this.registerForm.value.age,
      city: this.registerForm.value.city,
      department: this.registerForm.value.department,
      password: this.registerForm.value.password
    };
    this._subscriptions.add(
      this._authService.registry(data).subscribe({
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
          const toast = await this._toastController.create({
            message: 'Cuenta registrada con éxito!',
            duration: 3000,
            position: 'top',
            color: 'success'
          });

          await toast.present();
          await this._router.navigateByUrl('/login');
        },
        error: async (err: HttpErrorResponse) => {
          const toast = await this._toastController.create({
            message: 'No se pudo registrar la cuenta, intente nuevamente!',
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
