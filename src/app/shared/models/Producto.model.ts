export interface Producto {
  id?: string; // Opcional, para incluir el _id de MongoDB
  nombre: string;
  imagenPrincipal: string|any; // Sigue siendo una cadena para representar la imagen en base64
  otrasImagenes: string[]; // Sigue siendo un array de cadenas para imágenes adicionales en base64
  categoria: 'Ropa' | 'Accesorios' | 'Calzado' | 'Otro';
  color: string;
  textura?: string;
  tallasDisponibles: Array<{
    talla: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Otro'; // Puede ser una cadena literal
    medida: string; // La medida sigue siendo una cadena
  }>;
  precio: number;
  estado: {
    disponible: boolean;
    tipoVenta: 'Venta' | 'Renta';
    nuevo?: boolean; // Nuevo es opcional
  };
  descripcion?: string; // Descripción opcional
}
