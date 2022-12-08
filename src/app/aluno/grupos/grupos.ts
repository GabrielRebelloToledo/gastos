export interface Grupos{
    id?: number,
    usuarioId: string,
    nomeGrupo: string,
    grupoPai: Number,
    grupoFilho: Number,
    ativo:boolean,
    analitico:boolean
}