export class Purificadora {
    _id?: number;
    nombre: string;
    email: string;
    purificadoraNombre: string;
    calle: string;
    numero: string;
    estado: string;
    codigoPostal: string;
    longitud: string;
    latitud: string;
    telefono: string;
    estatus: string;
    usuario: string;
    password1: string;

    constructor(nombre: string, telefono: string, longitud: string, email: string, calle: string, purificadoraNombre: string, latitud: string, numero: string, estado: string, codigoPostal: string, estatus: string, usuario: string, password1:string) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.longitud = longitud;
        this.purificadoraNombre = purificadoraNombre;
        this.calle = calle;
        this.latitud = latitud;
        this.codigoPostal = codigoPostal;
        this.estado = estado;
        this.numero = numero;
        this.estatus = estatus;
        this.usuario = usuario;
        this.password1 = password1;
    }
}
