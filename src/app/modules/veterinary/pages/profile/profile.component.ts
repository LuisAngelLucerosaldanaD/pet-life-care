import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../core/services/storage/storage.service";
import {Veterinary} from "../../../../core/models/veterinary";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  public veterinary: Veterinary = {
    id: 0,
    name: '',
    description: '',
    email: '',
    address: '',
    cellphone: '',
    user: 0,
    web_page: '',
    logo: '',
    created_at: '',
    updated_at: ''
  };
  constructor(
    private _storageService: StorageService,
  ) {
  }

  async ngOnInit() {
    this.veterinary = await this._storageService.get('vet');
  }

  protected readonly window = window;
}
