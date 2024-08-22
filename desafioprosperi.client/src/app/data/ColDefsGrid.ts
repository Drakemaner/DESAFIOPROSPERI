import { ColDef, ValueGetterParams } from 'ag-grid-community';


export var ColDefsGrid: ColDef[] = [
    {
      field: 'numeroOs',
      headerName: 'Número OS'
    },
    {
      field: 'nome',
      headerName: 'Nome OS',
      filter: true,
      floatingFilter: true
    },
    {
      field: 'valor',
      headerName: 'Valor',
      type: ['currency', 'shaded'],
      valueGetter: (p : ValueGetterParams) => "R$ " + p.data.valor
    },
    {
      field: 'nomeCliente',
      headerName: 'Nome Cliente',
      filter: true,
      floatingFilter: true
    },
    {
      field: 'dataExecucao',
      headerName: 'Data da Execução',
      filter: 'agDateColumnFilter',
      floatingFilter: true
    }
  ]
