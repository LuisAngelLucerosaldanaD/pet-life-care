import {Component} from '@angular/core';
import {StorageService} from "./core/services/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private _storageService: StorageService
  ) {
    _storageService.init();
  }
}
