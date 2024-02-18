import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Login, Registry} from "../../models/request";
import {Observable} from "rxjs";
import {Response, Session} from "../../models/response";
import {CapacitorHttp, HttpOptions, HttpResponse} from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.AUTH_API;
  private _urlLogin: string = this._baseUrl + '/api/v1/user/login';
  private _urlRegistry: string = this._baseUrl + '/api/v1/user';

  private _httpOptions: HttpOptions = {
    headers: {'Content-Type': 'application/json'},
    url: '',
    data: null
  }

  constructor(
    private _http: HttpClient
  ) {
  }

  /**
   * Método que permite consumir obtener una sesión para el usuario.
   * @param data {Login} - Datos para el inicio de sesión (username-password)
   * @return Observable<Response<Session>> - Se obtiene un observable
   */
  public login(data: Login): Promise<HttpResponse> {
    this._httpOptions.url = this._urlLogin;
    this._httpOptions.data = JSON.stringify(data);

    return CapacitorHttp.post(this._httpOptions);
  }

  /**
   * Método que permite consumir el registro de un usuario en la aplicación.
   * @param data {Registry} - Datos para el registro de un usuario
   * @return Observable<Response<string>> - Se obtiene un observable
   */
  public registry(data: Registry): Observable<Response<string>> {
    return this._http.post<Response<string>>(this._urlRegistry, data);
  }
}
