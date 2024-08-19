import { ICliente } from "./ICliente";
import { IPrestador } from "./IPrestador";

export interface IOS {
    numeroOS: number,
    titulo: string,
    valor: number,
    cliente : ICliente,
    prestador: IPrestador,
    dataExecucao: Date | string
}
