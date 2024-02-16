import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Login, Registry} from "../../models/request";
import {Observable} from "rxjs";
import {Response, Session} from "../../models/response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.AUTH_API;
  private _urlLogin: string = this._baseUrl + '/api/v1/auth/login';
  private _urlRegistry: string = this._baseUrl + '/api/v1/auth/register';

  constructor(
    private _http: HttpClient
  ) {
  }

  /**
   * Método que permite consumir obtener una sesión para el usuario.
   * @param data {Login} - Datos para el inicio de sesión (username-password)
   * @return Observable<Response<Session>> - Se obtiene un observable
   */
  public login(data: Login): Observable<Response<Session>> {
    return this._http.post<Response<Session>>(this._urlLogin, data);
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
