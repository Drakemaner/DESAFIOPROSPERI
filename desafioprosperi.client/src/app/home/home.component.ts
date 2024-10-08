import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, ModuleRegistry, ClientSideRowModelModule, GridApi, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { IRowOS } from '../interfaces/IRow';
import { HttpService } from '../services/http/http.service';
import { IOS } from '../interfaces/OS';
import { ActionButtonsComponent } from '../shared/action-buttons/action-buttons.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../shared/modal/modal.component';
import { AlertComponent } from "../shared/alert/alert.component";
import { IAlert } from '../interfaces/IAlert';
import { IGridMethods } from '../interfaces/IGridMethods';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    ModalComponent,
    RouterLink,
    AlertComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy, IGridMethods{ 

  constructor(private activatedRoute: ActivatedRoute, private httpService :  HttpService, private router : Router, private changeDetectorRef: ChangeDetectorRef){

  }

  ngOnDestroy(): void {
    this.colDefs.forEach((a, i, array) => {
      if(a.field == 'Actions'){
        array.splice(i, 1)
      }
    })
  }

  private gridApi!: GridApi<IRowOS>

  selectednumOs : number = 0

  rowData: IRowOS[] = [];

  modal : {numeroOs : number, visible: boolean} = {
    numeroOs : 0,
    visible: false
  }

  alert : IAlert = {
    visible: false,
    warnTitle : 'Erro',
    warnMessage : 'adsdad',
    type: 'error'
  }

  // Column definitions para o grid
  colDefs: ColDef[] = []

  //Recebimento dos dados da API de OS
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ colDefsGrid }) => {
      //recebimento dos dados das colunas
      this.colDefs = colDefsGrid
      this.colDefs.push(
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
      )
      
    })
    this.httpService.GetAll<IOS>("OS").subscribe((data : IOS[]) => {
      //recebimento dos dados das OS
      if(data){
        data.forEach((a : IOS) => {
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
        this.refreshTable(this.rowData)
      }
    })
    console.log(this.colDefs)
  }

  //Função para receber o gridApi para manipulação do grid
  onGridReady(params : GridReadyEvent<IRowOS>,){
    this.gridApi = params.api
  }

  //Função para navegar para a página de edição de OS
  goEdit(numOs : number){
    this.router.navigate([`/editOS/${numOs}`])
  }

  //Função para atualizar a tabela
  refreshTable(rowData : IRowOS[]){
    this.gridApi.setGridOption('rowData', rowData)
  }

  //Função para remover uma OS da tabela
  removeOneFromTheTable(numOs : number){
    this.rowData = this.rowData.filter(a => a.numeroOs != numOs)

    this.refreshTable(this.rowData)
  }
  
//Deletar uma OS
  deleteRow(){
    this.modal.visible = false
    this.httpService.Delete<IOS>("OS", this.modal.numeroOs).subscribe(() => {     
      this.removeOneFromTheTable(this.modal.numeroOs)

      this.alert = {
        visible: true,
        warnTitle: 'Sucesso !',
        warnMessage: 'OS deletada com sucesso',
        type: 'success'
      }

      this.changeDetectorRef.detectChanges();
    }, 
    (e) => {
      
      this.alert = {
        visible: true,
        warnTitle: 'Erro ao deletar OS:',
        warnMessage: e.error.detail,
        type: 'error'
      }

      this.changeDetectorRef.detectChanges();
    })
  }
  
}


