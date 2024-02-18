import { JwtHelperService } from "@auth0/angular-jwt";

export class Utils {
  private static _jwtHelper = new JwtHelperService();

  public static isTokenExpired(token: string): boolean {
    return this._jwtHelper.isTokenExpired(token);
  }

  public static getTokenExpirationDate(token: string): Date | null {
    return this._jwtHelper.getTokenExpirationDate(token);
  }

  public static decodeToken(token: string): any {
    return this._jwtHelper.decodeToken(token);
  }
}
