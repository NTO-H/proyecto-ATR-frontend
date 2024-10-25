export interface Politica {
  _id: string;
  version: string;
  titulo: string;
  contenido: string;
  fechaCreacion: Date;
  fechaVigencia:string;
  estado: string;
  historial: HistorialEntry[]; 
}

export interface HistorialEntry {
  fechaVigencia: string;
  version: string;
  titulo: string;
  contenido: string;
  fechaCreacion: Date;
  estado: string;
}