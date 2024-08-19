import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ICellRendererParams, ValueGetterParams } from 'ag-grid-community'

interface ButtonParams extends ICellRendererParams {
  clicked: (a : string) => void
}

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css'
})
export class ActionButtonsComponent implements ICellRendererAngularComp{

  clicked!: (a : string) => void;

  constructor(){

  }

  agInit(params: ButtonParams): void {
    this.clicked = params.clicked
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

}
