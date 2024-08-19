import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormGroup } from '../../interfaces/IFormGroup';
import { IOS } from '../../interfaces/OS';

@Component({
  selector: 'app-form-os',
  templateUrl: './form-os.component.html',
  styleUrl: './form-os.component.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class FormOsComponent implements OnInit{

  constructor(private formBuilder : FormBuilder){

  }
  
  formulario! : FormGroup

  @Input()
  formData : IFormGroup[] = []

  @Input()
  title : string = ''

  @Input()
  buttonValue : string = ''

  @Output()
  formValue : EventEmitter<IOS> = new EventEmitter()

  ngOnInit(): void {
    console.log(this.formData)

    this.initializeForm()

  }

  initializeForm(){
    const formGroup: { [key: string] : FormControl} = {}

    this.formData.forEach(a => {
      formGroup[a.formControlName] = new FormControl({value: a.value ?? '', disabled: !a.editable && a.value != undefined}, a.validators)
    })
    
    this.formulario = this.formBuilder.group(formGroup)
  }

  emitForm(){
    if(this.formulario.valid){
      var os : IOS = {
        numeroOS: parseInt(this.formulario.get('numeroOS')?.value),
        titulo: this.formulario.get('titulo')?.value,
        cliente: {
          nome: this.formulario.get('nomeCliente')?.value,
          cnpj: this.formulario.get('cnpjCliente')?.value
        },
        prestador: {
          nome: this.formulario.get('nomePrestador')?.value,

          cpf: this.formulario.get('cpfPrestador')?.value
        },
        dataExecucao: this.formulario.get('dataExecucao')?.value,
        valor: parseFloat(this.formulario.get('valor')?.value.replace(',', '.')),
      } 
      this.formValue.emit(os)
    }
    else {
      alert("Formulário Inválido: Todos os Valores são Obrigatórios e se atente aos padrões de formatação")
    }
  }

}
