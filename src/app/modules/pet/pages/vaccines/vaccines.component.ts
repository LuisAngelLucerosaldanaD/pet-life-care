import {Component, OnInit, ViewChild} from '@angular/core';
import {PetsService} from "../../../../core/services/pets/pets.service";
import {ReqVaccine, Vaccine} from "../../../../core/models/vaccines";
import {Response} from "../../../../core/models/response";
import {IonModal, LoadingController, ToastController} from "@ionic/angular";
import {StorageService} from "../../../../core/services/storage/storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pet, PetBody} from "../../../../core/models/pets";

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss'],
})
export class VaccinesComponent implements OnInit {

  public vaccines: Vaccine[] = [];
  @ViewChild(IonModal) modal!: IonModal;
  public vaccineForm: FormGroup;
  private _pet!: Pet;

  constructor(
    private _petsService: PetsService,
    private _loadingController: LoadingController,
    private _toastController: ToastController,
    private _storageService: StorageService,
    private _fb: FormBuilder,
  ) {
    this.vaccineForm = this._fb.group({
      name: ['', Validators.required],
      veterinary: [0, Validators.required],
      doctor: ['', Validators.required]
    })
  }

 async ngOnInit() {
    this._pet = await this._storageService.get('pet');
    await this._getVaccines();
  }

  private async _getVaccines(): Promise<void> {
    console.log(this._pet)
    const indicator = await this.loadingIndicator();
    try {
      const resWs = await this._petsService.getAllVaccines(this._pet.id)
      const res = resWs.data as Response<Vaccine[]>;
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

      if (!res.data) {
        const toast = await this._toastController.create({
          message: 'No se encontraron vacunas para esta mascota!',
          duration: 3000,
          position: 'top',
          color: 'warning'
        });
        await toast.present();
        return;
      }

      this.vaccines = res.data;

    } catch (err) {
      const toast = await this._toastController.create({
        message: 'No se pudo obtener las vacunas, intente nuevamente!',
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

  public async createVaccine(): Promise<void> {
    const indicator = await this.loadingIndicator();
    try {
      const vaccine: ReqVaccine = {
        name: this.vaccineForm.value.name,
        veterinary: parseInt(this.vaccineForm.value.veterinary, 10),
        doctor: this.vaccineForm.value.doctor,
        pet: this._pet.id
      };

      const resWs = await this._petsService.createVaccine(vaccine);
      const res = resWs.data as Response<Vaccine>;
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

      this.vaccines.push(res.data);
      this.vaccineForm.reset();
      await this.modal.dismiss();
    } catch (err) {
      const toast = await this._toastController.create({
        message: 'No se pudo crear la vacuna, intente nuevamente!',
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

  protected readonly window = window;
}
