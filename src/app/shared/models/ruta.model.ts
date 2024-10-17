export class Ruta {
    _id?: string; // Identificador único de la ruta
    idPurificadora!: string; // Identificador de la purificación asociada a la ruta
    nombreRuta!: string;
    repartidorId!: string; // Identificador del repartidor asociado a la ruta
    vehiculoId!: string; // Identificador del vehículo asociado a la ruta
    fechaInicio?: Date; // Fecha de inicio de la ruta
    fechaFin?: Date; // Fecha de finalización de la ruta (opcional si la ruta aún está en curso)
    estado!: 'pendiente' | 'en_curso' | 'finalizada'; // Estado actual de la ruta
    puntosDeEntrega!: {
        clienteId: string[]
    }[];
    diasAsignados!: string[];
}

