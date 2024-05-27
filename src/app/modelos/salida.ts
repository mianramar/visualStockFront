// Definimos unha interface de implementación que nos dará a estructura común das salidas
export interface Salida {
    numero: number;
    empresa: string;
    fecha: string;
    total: number;
    isEliminado: boolean; //para indicar si está eliminado
}