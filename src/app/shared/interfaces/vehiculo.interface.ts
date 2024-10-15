export interface Vehiculo {
    _id?: string;
    marca: string;
    modelo: string;
    anio: number;
    placas: string;
    color?: string; // Campo opcional para el color del automóvil
    kilometraje?: number; // Campo opcional para el kilometraje del automóvil
    propietario?: string; // Campo opcional para el nombre del propietario del automóvil
    // Puedes agregar más campos según sea necesario
}
