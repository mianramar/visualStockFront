import { MaterialProducto } from "./materialProducto";
import { Pivot } from "./pivot";

// Definimos unha interface de implementación que nos dará a estructura común dos obxectos de tipo "producto"
export interface Producto {
    id: number;
    nombre: string;
    fecha_alta?: string;
    tipo: string;
    cantidad_disponible?: number;
    cantidad_producida?: number;
    //Pivot relacionado con salida, que contiene cantidad y precio
    pivot?: Pivot;
    cantidad?: number;
    precio?: number;
    seleccionado?: boolean; //Para saber si se selecciona o no en nueva entrada
    //Es para el post
    materials?: MaterialProducto[];
    //Es porque el get nos devuelve el campo como "materiales"
    materiales?: MaterialProducto[];

    tratamiento?: string;
    garantia?:string;

    //Campo generico llamado adicional para enviar en la peticion PUT
    adicional?:string;
}