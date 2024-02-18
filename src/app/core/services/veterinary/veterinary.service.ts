import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CapacitorHttp, HttpResponse} from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {
  private _baseUrl: string = environment.AUTH_API;
  private _urlVeterinaries: string = this._baseUrl + '/api/v1/veterinary/all';
  constructor() { }

  public getVeterinaries(): Promise<HttpResponse> {
    return CapacitorHttp.get({
      url: this._urlVeterinaries,
      headers: {'Content-Type': 'application/json'}
    });
  }
}
