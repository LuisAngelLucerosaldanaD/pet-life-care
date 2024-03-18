import {Component, OnInit} from '@angular/core';
import {VeterinaryService} from "../../../../core/services/veterinary/veterinary.service";
import {Veterinary} from "../../../../core/models/veterinary";
import {Response} from "../../../../core/models/response";
import {LoadingController, ToastController} from "@ionic/angular";
import {StorageService} from "../../../../core/services/storage/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-veterinary',
  templateUrl: './veterinary.component.html',
  styleUrls: ['./veterinary.component.scss'],
})
export class VeterinaryComponent implements OnInit {

  public veterinaries: Veterinary[] = [];

  constructor(
    private _veterinaryService: VeterinaryService,
    private _loadingController: LoadingController,
    private _toastController: ToastController,
    private _storageService: StorageService,
    private _router: Router
  ) {
  }
  ngOnInit() {
    this.getVeterinaries();
  }

  public async getVeterinaries(): Promise<void> {

    const indicator = await this.loadingIndicator();
    try {
      const resWs = await this._veterinaryService.getVeterinaries();
      const res = resWs.data as Response<Veterinary[]>;
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

      this.veterinaries = res.data;

    } catch (err) {
      const toast = await this._toastController.create({
        message: 'No se pudo obtener las mascotas, intente nuevamente!',
        duration: 3000,
        position: 'top',
        color: 'danger'
      });
      await indicator.dismiss();
      await toast.present();
      console.error(err);
      return;
    }
  }

  public async selectVeterinary(vet: Veterinary): Promise<void> {
    this._storageService.set('vet', vet);
    await this._router.navigateByUrl('/veterinary')
  };


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
