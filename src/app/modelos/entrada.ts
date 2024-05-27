// Definimos unha interface de implementación que nos dará a estructura común das entradas
export interface Entrada {
    numero: number;
    empresa: string;
    fecha: string;
    total: number;
    isEliminado: boolean; //para indicar si está eliminado
}