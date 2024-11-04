import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from "./storage.service";
import { Iuser } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private helper = new JwtHelperService();

  get token(): string | null {
    return this.storageService.getToken();
  }

  constructor(private storageService: StorageService) {}

  getUserData(): Iuser | undefined {
    const { token } = this;
    if (token) {
      const decodedData = this.helper.decodeToken(token);
      return decodedData;
    }
    return undefined;
  }

  getRol(): string {
    const userData = this.getUserData();
    return userData ? userData.rol : "invitado";
  }

  getId(): string | null {
    const userData = this.getUserData();
    return userData ? userData._id : null;
  }

  isAutenticated(): boolean {
    return !!this.token && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    const token = this.token;
    return token ? this.helper.isTokenExpired(token) : true;
  }

  removeToken(): void {
    this.storageService.removeItem('token');
  }

  // Guardar el ID de salida en sessionStorage


  // Obtener el ID de salida desde storageService
  getIdSalida(): string | null {
    return this.storageService.getIdSalidaActual();
  }
  getCantidadSalida(): number | null {
    return this.storageService.getCantidad();
  }

  // Eliminar el ID de salida de storageService
  // removeIdSalida(): void {
  //   this.storageService.removeItem(this.salidaKey);
  // }

  // // Limpiar toda la sesión si es necesario
  // clearSession(): void {
  //   this.storageService.clear();
  // }
}
