import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CapacitorHttp, HttpOptions, HttpResponse} from "@capacitor/core";
import {PetBody} from "../../models/pets";
import {ReqVaccine, Vaccine} from "../../models/vaccines";

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private _baseUrl: string = environment.AUTH_API;
  private _urlPets: string = this._baseUrl + '/api/v1/pets';
  private _urlVaccines: string = this._baseUrl + '/api/v1/vaccines';

  constructor() {
  }

  public getPets(id: number): Promise<HttpResponse> {
    return CapacitorHttp.get({
      url: this._urlPets + '/all/' + id,
      headers: {'Content-Type': 'application/json'}
    });
  }

  public createPet(data: PetBody): Promise<HttpResponse> {
    return CapacitorHttp.post({
      url: this._urlPets,
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(data)
    });
  }

  public getAllVaccines(id: number): Promise<HttpResponse> {
    return CapacitorHttp.get({
      url: this._urlVaccines + '/all/' + id,
      headers: {'Content-Type': 'application/json'}
    });
  }

  public createVaccine(data: ReqVaccine): Promise<HttpResponse> {
    return CapacitorHttp.post({
      url: this._urlVaccines,
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(data)
    });
  }
}
