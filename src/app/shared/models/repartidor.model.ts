export class Repartidor {
  _id?: string;
  idPurificadora: string;
  nombre: string;
  email: string;
  telefono: string;
  numCasa: string;
  password1: string;
  diasAsignados!: string[];

  constructor(
    idPurificadora: string,
    nombre: string,
    email: string,
    telefono: string,
    numCasa: string,
    password1: string,
    diasAsignados: string[]
  ) {
    this.idPurificadora = idPurificadora;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.numCasa = numCasa;
    this.password1 = password1;
    this.diasAsignados = diasAsignados;
  }
}
