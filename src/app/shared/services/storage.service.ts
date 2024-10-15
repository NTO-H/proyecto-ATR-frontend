import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private keyToken: string = "token";
  private keyIdSalida: string = "keyIdSalida";
  private cantidadAsignada: string = "cantidadAsignada";

  constructor() {}

  private isLocalStorageAvailable(): boolean {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return false;
      }
      const testKey = "__localStorageTest__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.keyToken, JSON.stringify(token));
    } else {
      console.error("LocalStorage is not available.");
    }
  }
  setIdSalida(keyIdSalida: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.keyIdSalida, keyIdSalida);
    } else {
      console.error("LocalStorage is not available.");
    }
  }
  setCantidadSalida(cantidadAsignada: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.cantidadAsignada, cantidadAsignada);
    } else {
      console.error("LocalStorage is not available.");
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem(this.keyToken);
      return token ? JSON.parse(token) : null;
    } else {
      console.error("LocalStorage is not available.");
      return null;
    }
  }
  
  getCantidad(): number {
    if (this.isLocalStorageAvailable()) {
      const cantidadAsignada = localStorage.getItem(this.cantidadAsignada);
      // Retorna el valor parseado o 0 si es null o no es un número válido
      return cantidadAsignada ? JSON.parse(cantidadAsignada) : 0;
    } else {
      console.error("LocalStorage is not available.");
      return 0;
    }
  }
  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
  getIdSalidaActual(): string | null {
    if (this.isLocalStorageAvailable()) {
      const idSalida = localStorage.getItem(this.keyIdSalida);
      return idSalida;
    } else {
      console.error("LocalStorage is not available.");
      return null;
    }
  }
}
