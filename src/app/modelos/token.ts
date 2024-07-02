// Definimos unha interface de implementación que nos dará a estructura común dos obxectos de tipo "token"
export interface Token {
    accessToken: string;
    token_type: string;
    nombre: string;
    email:string;
    rol:string;
}