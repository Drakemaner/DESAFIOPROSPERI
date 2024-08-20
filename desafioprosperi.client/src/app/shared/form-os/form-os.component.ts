import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormGroup } from '../../interfaces/IFormGroup';
import { IOS } from '../../interfaces/OS';
import { HttpService } from '../../services/http/http.service';
import { ICliente } from '../../interfaces/ICliente';
import { IPrestador } from '../../interfaces/IPrestador';

@Component({
  selector: 'app-form-os',
  templateUrl: './form-os.component.html',
  styleUrl: './form-os.component.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class FormOsComponent implements OnInit{

  constructor(private formBuilder : FormBuilder, private http : HttpService){

  }
  
  formulario! : FormGroup

  @Input()
  formData : IFormGroup[] = []

  @Input()
  title : string = ''

  @Input()
  buttonValue : string = ''

  @Output()
  formValue : EventEmitter<IOS | string> = new EventEmitter()

  ngOnInit(): void {
    console.log(this.formData)

    this.initializeForm()
    this.cpnjCpfVerification()

  }

  initializeForm(){
    const formGroup: { [key: string] : FormControl} = {}

    this.formData.forEach(a => {
      formGroup[a.formControlName] = new FormControl({value: a.value ?? '', disabled: !a.editable && a.value != undefined}, a.validators)
    })
    
    this.formulario = this.formBuilder.group(formGroup)
  }

  cpnjCpfVerification(){
    this.formulario.get('cnpjCliente')?.valueChanges.subscribe((value) => {
      if(value.length == 18){
        if(this.formulario.get('cnpjCliente')?.valid){

          this.verifyCnpj(value.replace('/','_'))
        }
      }
    })

    this.formulario.get('cpfPrestador')?.valueChanges.subscribe((value) => {
      if(this.formulario.get('cpfPrestador')?.valid){

        this.verifyCpf(value)
      }
    })
  }

  verifyCnpj(cnpj : string){
    this.http.GetOne<ICliente>('cliente', cnpj).subscribe((data) => {
      if(data != null){
        this.formulario.get('nomeCliente')?.setValue(data.nome)
      }
    })
  }

  verifyCpf(cpf : string){
    this.http.GetOne<IPrestador>('prestador', cpf).subscribe((data) => {
      if(data != null){
        this.formulario.get('nomePrestador')?.setValue(data.nome)
      }
    })
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
      this.formValue.emit("Formulário Inválido: Todos os Valores são Obrigatórios e se atente aos padrões de formatação")
    }
  }

}
