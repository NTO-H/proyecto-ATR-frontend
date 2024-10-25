export interface Termino {
  _id: string;
  titulo: string;
  contenido: string;
  version: string;
  estado: string;
  fechaCreacion: string; // Tipo adecuado para fecha
  fechaVigencia: string; // Tipo adecuado para fecha
  historial: any[]; // O especifica un tipo más concreto si es posible
  __v: number; // Normalmente se utiliza para el versionado en MongoDB
}
