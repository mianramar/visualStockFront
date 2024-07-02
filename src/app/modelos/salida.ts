import { Producto } from "./producto";

// Definimos unha interface de implementación que nos dará a estructura común das salidas
export interface Salida {
    id: number;
    numero: string;
    empresa_id: string;
    fecha: string;
    empresa_nome: string;
    productos: Producto[];
    tipo: string;

}