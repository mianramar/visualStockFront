import { MaterialProducto } from "./material_producto";

// Definimos unha interface de implementación que nos dará a estructura común dos obxectos de tipo "producto"
export interface Producto {
    id: number;
    nombre: string;
    fecha_alta: string;
    tipo: string;
    cantidad_disponible: number;
    materiales: MaterialProducto[]; //Necesitamos hacerle un import para la "relacion" como si fuese una tabla intermedia
}