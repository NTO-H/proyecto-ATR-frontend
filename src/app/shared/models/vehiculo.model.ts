export class Vehiculo {
  _id?: string;
  idPurificadora: string;

  marca: string;
  modelo: string;
  diasAsignados!: string[];
  placas: string;
  color?: string;
  kilometraje?: number;
  propietario?: string;

  constructor(
    idPurificadora: string,
    marca: string,
    modelo: string,
    diasAsignados: string[],
    placas: string,
    color?: string,
    kilometraje?: number,
    propietario?: string
  ) {
    this.idPurificadora = idPurificadora;
    this.marca = marca;
    this.modelo = modelo;
    this.diasAsignados = diasAsignados;
    this.placas = placas;
    this.color = color;
    this.kilometraje = kilometraje;
    this.propietario = propietario;
  }
}
