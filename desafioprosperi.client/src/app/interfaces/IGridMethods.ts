import { IRowOS } from "./IRow";
import { GridReadyEvent } from 'ag-grid-community';


export interface IGridMethods {
    onGridReady(params: GridReadyEvent<IRowOS>): void;
    refreshTable(rowData: IRowOS[]): void;
    deleteRow(): void;
}