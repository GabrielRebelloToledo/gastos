export interface ContaBancaria{
    id?: number,
    usuarioId: string,
    nConta: string,
    descricao: string,
    banco: string,
    agencia:string,
    conta:string,
    ativo:boolean,
    saldo:number
}