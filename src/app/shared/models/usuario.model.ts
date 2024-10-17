export class Usuario {
  _id?: number;
  idPurificadora:string;
  nombre: string;
  email: string;
  longitud: string;
  latitud: string;
  telefono: string;
  numCasa: string;
  municipioId: string;
  colonia:string
  constructor(idPurificadora:string,nombre: string, telefono: string, longitud: string, email: string, latitud: string, numCasa: string, colonia: string,municipioId:string) {
    this.idPurificadora=idPurificadora;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.longitud = longitud;
    this.latitud = latitud;
    this.numCasa = numCasa;
    this.municipioId = municipioId;
    this.colonia = colonia;
  }
}
