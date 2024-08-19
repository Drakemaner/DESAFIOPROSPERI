import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, ModuleRegistry, ClientSideRowModelModule, GridApi, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { IRowOS } from '../interfaces/IRow';
import { HttpService } from '../services/http/http.service';
import { IOS } from '../interfaces/OS';
import { ActionButtonsComponent } from '../shared/action-buttons/action-buttons.component';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../shared/modal/modal.component';

ModuleRegistry.registerModules([ClientSideRowModelModule]);




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    ModalComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit{ 

  constructor(private httpService :  HttpService, private router : Router){

  }

  private gridApi!: GridApi<IRowOS>

  selectednumOs : number = 0

  rowData: IRowOS[] = [];

  modal = {
    numeroOs : 0,
    visible: false
  }

  colDefs: ColDef[] = [
    {
      field: 'numeroOs',
      headerName: 'Número OS',
      valueGetter: (params) => {
        return params.data.numeroOs
      }
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
      headerName: 'Data da Execução'
    },
    {
      field: 'Actions',
      cellRenderer: ActionButtonsComponent,
      cellRendererParams: (params : ValueGetterParams) =>  {
        const value = params.data.numeroOs

        return {
          clicked : (a : string) => {

            if(a == 'edit'){
              this.goEdit(value)
            }
            else{
              this.modal.visible = true
              this.modal.numeroOs = value
            }
          }
        }
      }
    }

  ]

  ngOnInit(): void {
    this.httpService.GetAll<IOS>('OS').subscribe((os) => {
      os.forEach(a => {
        const date = new Date(a.dataExecucao);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

        const formattedDate = date.toLocaleDateString('pt-BR', options);

        this.rowData.push(
          {
            numeroOs: a.numeroOS,
            nome: a.titulo,
            valor: a.valor,
            nomeCliente: a.cliente.nome,
            dataExecucao: formattedDate
          }
        )
      })
      console.log(this.rowData)
      
      this.refreshTable(this.rowData)
    })
  }

  onGridReady(params : GridReadyEvent<IRowOS>,){
    this.gridApi = params.api
  }

  goEdit(numOs : number){
    this.router.navigate([`/editOS/${numOs}`])
  }

  refreshTable(rowData : IRowOS[]){
    this.gridApi.setGridOption('rowData', rowData)
  }

  removeOneFromTheTable(numOs : number){
    this.rowData = this.rowData.filter(a => a.numeroOs != numOs)

    this.gridApi.setGridOption('rowData',this.rowData)
  }

  deleteRow(){
    this.modal.visible = false
    this.httpService.Delete<IOS>("OS", this.modal.numeroOs).subscribe(() => {

      console.log(this.modal.visible)
      
      alert('OS Deletada com Sucesso')

      this.removeOneFromTheTable(this.modal.numeroOs)
    }, 
    (e) => {
      alert('erro ao deletar OS: ' + e.error.detail)
    })
  }
  
}


