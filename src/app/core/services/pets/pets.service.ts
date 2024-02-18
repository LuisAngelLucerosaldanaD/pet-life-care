import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CapacitorHttp, HttpOptions, HttpResponse} from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private _baseUrl: string = environment.AUTH_API;
  private _urlPets: string = this._baseUrl + '/api/v1/pets/all';

  constructor() {
  }

  public getPets(id: number): Promise<HttpResponse> {
    return CapacitorHttp.get({
      url: this._urlPets + '/' + id,
      headers: {'Content-Type': 'application/json'}
    });
  }
}
