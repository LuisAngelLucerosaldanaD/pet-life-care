import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../core/services/storage/storage.service";
import {User} from "../../core/models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public user: User = {
    age: 0,
    cellphone: '',
    city: '',
    created_at: '',
    department: '',
    email: '',
    id: 0,
    lastname: '',
    name: '',
    updated_at: ''
  };

  constructor(
    private _storageService: StorageService,
  ) { }

  async ngOnInit() {
    this.user = await this._storageService.get('user');
  }

}
