import { Repartidor } from "./repartidor.interface";
import { Vehiculo } from "./vehiculo.interface";



export interface PuntoDeEntrega {
  municipio: string;
  colonia: string;
  clienteId: string;
  _id: string;
}



export interface Ruta {
  _id?: string;
  nombreRuta: string;
  repartidorId: Repartidor;
  vehiculoId: Vehiculo;
  fechaInicio?: Date;
  fechaFin?: Date;
  estado?: 'pendiente' | 'en_curso' | 'finalizada';
  puntosDeEntrega: PuntoDeEntrega[];
  diasAsignados?: string[];
}
