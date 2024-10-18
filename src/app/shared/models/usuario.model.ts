export class Usuario {
  _id?: number;
  // idPurificadora:string;
  nombre: string;
  email: string;
  // longitud: string;
  // latitud: string;
  telefono: string;
  password?: string;
  // numCasa: string;
  // municipioId: string;
  // colonia:string
  constructor(nombre: string, telefono: string, email: string, password:string) {
    // this.idPurificadora=idPurificadora;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.password = password;
    // this.longitud = longitud;
    // this.latitud = latitud;
    // this.numCasa = numCasa;
    // this.municipioId = municipioId;
    // this.colonia = colonia;
  }
}
