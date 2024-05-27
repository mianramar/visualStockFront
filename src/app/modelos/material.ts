// Definimos unha interface de implementación que nos dará a estructura común dos obxectos de tipo "material"
export interface Material {
    id: number;
    metal: string;
    fecha_entrada: string;
    dimensiones: string;
    cantidad_disponible: number;
}