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
      floatingFilter: true,
      type: 'dateString',
      filterParams: {
        comparator: (dataFiltro: Date, dataValor: string) => {
          // Comparação do filtro de data, recebendo um valor string
          const dateParts = dataValor.split('/');
          const dia = Number(dateParts[0]);
          const mes = Number(dateParts[1]) - 1; 
          const ano = Number(dateParts[2]);
          const cellDate = new Date(ano, mes, dia);

          if (cellDate < dataFiltro) {
            return -1;
          } else if (cellDate > dataFiltro) {
            return 1;
          } else {
            return 0;
          }
        },
        browserDatePicker: true
      }
    }
  ]
