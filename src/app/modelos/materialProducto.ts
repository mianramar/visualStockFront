import { Pivot } from "./pivot";
import { PivotProducto } from "./pivotProducto";

// Definimos unha interface de implementación que nos dará a estructura común dos obxectos de tipo "material"
export interface MaterialProducto {
    id: number;
    metal: string;
    dimensiones: string;
    usuario_email: string;
    cantidad_disponible: number;
    pivot: PivotProducto;
    cantidad_consumida:number;
    cantidad: number;
    precio: number;
    seleccionado: boolean //Para saber si se selecciona o no en nueva entrada
}