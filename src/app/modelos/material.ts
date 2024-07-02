import { Pivot } from "./pivot";

// Definimos unha interface de implementación que nos dará a estructura común dos obxectos de tipo "material"
export interface Material {
    id: number;
    metal: string;
    dimensiones: string;
    usuario_email: string;
    cantidad_disponible: number;
    pivot: Pivot;
    cantidad: number;
    precio: number;
    seleccionado: boolean //Para saber si se selecciona o no en nueva entrada
}