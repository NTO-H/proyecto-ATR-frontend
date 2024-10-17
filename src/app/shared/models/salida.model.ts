import { Cliente } from "../interfaces/client.interface";
import { Repartidor } from "../interfaces/repartidor.interface";
import { Vehiculo } from "../interfaces/vehiculo.interface";
export interface PuntoDeEntrega {
  clienteId?: Cliente;
  _id: string;
}

export class Salida {
  idPurificadora!:any;
  _id?: string; // Identificador único de la ruta
  nombreRuta!: string;
  repartidorId!: Repartidor;
  // Identificador del repartidor asociado a la ruta
  vehiculoId!: Vehiculo; // Identificador del vehículo asociado a la ruta
  // fechaInicio?: Date; // Fecha de inicio de la ruta
  // fechaFin?: Date; // Fecha de finalización de la ruta (opcional si la ruta aún está en curso)
  estado?: "enviado" | "recivido" | "pendiente" | "en_curso" | "finalizada" | 'confirmado'; // Estado actual de la ruta
  puntosDeEntrega!: PuntoDeEntrega[];
  // diasAsignados!: string[];
  cantidadBotellas?: Number;
  cantidadBotellasEntregadas?: Number;
  fechaSalida?: string;
  esSalida?: boolean;
}
