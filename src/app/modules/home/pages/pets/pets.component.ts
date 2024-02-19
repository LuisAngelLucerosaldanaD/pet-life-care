import {Component, OnInit, ViewChild} from '@angular/core';
import {PetsService} from "../../../../core/services/pets/pets.service";
import {StorageService} from "../../../../core/services/storage/storage.service";
import {Pet, PetBody} from "../../../../core/models/pets";
import {Response} from "../../../../core/models/response";
import {IonModal, LoadingController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  public pets: Pet[] = [];
  public petForm: FormGroup;


  constructor(
    private _petsService: PetsService,
    private _storageService: StorageService,
    private _loadingController: LoadingController,
    private _toastController: ToastController,
    private _router: Router,
    private _fB: FormBuilder,
  ) {
    this.petForm = this._fB.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      category: ['', [Validators.required]],
      age: [0, [Validators.required]],
      weight: [0, [Validators.required]],
      sex: ['', [Validators.required]],
      type: ['', [Validators.required]],
    })
  }

  public ngOnInit(): void {
    this.getPets();
  }

  public async getPets(): Promise<void> {
    const user = await this._storageService.get('user');
    const indicator = await this.loadingIndicator();
    try {
      const resWs = await this._petsService.getPets(user.id)
      const res = resWs.data as Response<Pet[]>;
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

      this.pets = res.data;

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

  public async selectPet(pet: Pet): Promise<void> {
    this._storageService.set('pet', pet);
    await this._router.navigateByUrl('/pet')
  };

  public async createPet(): Promise<void> {
    const indicator = await this.loadingIndicator();
    try {
      const user = await this._storageService.get('user');
      const pet: PetBody = {
        name: this.petForm.value.name,
        category: this.petForm.value.category,
        age: this.petForm.value.age,
        weight: this.petForm.value.weight,
        sex: this.petForm.value.sex,
        type: this.petForm.value.type,
        user: user.id
      };

      const resWs = await this._petsService.createPet(pet);
      const res = resWs.data as Response<Pet>;
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

      this.pets.push(res.data);
      this.petForm.reset();
      await this.modal.dismiss();
    } catch (err) {
      const toast = await this._toastController.create({
        message: 'No se pudo crear la mascota, intente nuevamente!',
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

}
