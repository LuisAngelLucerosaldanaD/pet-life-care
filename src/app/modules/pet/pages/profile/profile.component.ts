import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../core/services/storage/storage.service";
import {Pet} from "../../../../core/models/pets";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public pet: Pet = {
    age: 0,
    category: '',
    created_at: '',
    id: 0,
    name: '',
    sexo: '',
    type: '',
    updated_at: '',
    user: 0,
    weight: 0,
  };

  constructor(
    private _storageService: StorageService,
  ) {

  }

  async ngOnInit() {
    this.pet = await this._storageService.get('pet');
  }
}
