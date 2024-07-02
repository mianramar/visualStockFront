import { Material } from "./material";

// Definimos unha interface de implementación que nos dará a estructura común das entradas
export interface Entrada {
    id: number;
    empresa_id: string;
    numero: string;
    tipo: string;
    fecha: string;
    empresa_nome: string;
    materials: Material[];
}