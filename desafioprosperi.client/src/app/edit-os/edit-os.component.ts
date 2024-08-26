import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormOsComponent } from '../shared/form-os/form-os.component';
import { IFormGroup } from '../interfaces/IFormGroup';
import { HttpService } from '../services/http/http.service';
import { IOS } from '../interfaces/OS';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, ɵNgNoValidate } from '@angular/forms';
import { AlertComponent } from '../shared/alert/alert.component';
import { IAlert } from '../interfaces/IAlert';

@Component({
  selector: 'app-edit-os',
  templateUrl: './edit-os.component.html',
  styleUrl: './edit-os.component.css',
  standalone: true,
  imports: [FormOsComponent, AlertComponent]
})
export class EditOsComponent implements OnInit , OnDestroy{

  constructor(private httpService : HttpService, private router : Router, private activatedRoute : ActivatedRoute){

  }

  alert : IAlert = {
    visible: false,
    warnTitle : 'Erro',
    warnMessage : 'adsdad',
    type: 'error'
  }

  ngOnDestroy(): void {
    this.formData.forEach(a => a.value = undefined)
  }

  numOs : number = 0
  dataLoaded = false
  formData! : IFormGroup[]

  //Recebendo os dados da OS para preencher o formulário
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formData }) => {
      this.formData = formData
     
    })

    this.numOs = parseInt(this.activatedRoute.snapshot.paramMap.get("numOs")!)
    this.httpService.GetOne<IOS>("OS", this.numOs).subscribe((data) => {
      if(data){
        this.intializeDataForm(data)
        
        this.dataLoaded = true
      }
      else {
        this.alert = {
          visible: true,
          warnTitle: 'Erro ao Buscar OS',
          warnMessage: 'OS não encontrada',
          type: 'error'
        }
      }
    }, (e) => {
      this.alert = {
        visible: true,
        warnTitle: 'Erro ao Buscar OS',
        warnMessage: e.error.detail,
        type: 'error'
      }
    })
  }

  //Inicializando o Form de forma dinâmica usando ReactiveForms
  intializeDataForm(os : IOS){
     this.formData.forEach(a => {
      
      switch(a.id){
        case 0 : a.value = os.numeroOS.toString(); break;
        case 1 : a.value = os.titulo; break;
        case 2 : a.value = os.cliente.cnpj; break;
        case 3 : a.value = os.cliente.nome; break;
        case 4 : a.value = os.prestador.cpf; break;
        case 5 : a.value = os.prestador.nome; break;
        case 6 : a.value = os.dataExecucao.toString().slice(0,10); break;
        case 7 : a.value = os.valor.toString(); break;
      }
    })    
    
  }

  //Requisição de Edição de OS
  editarOS(value : IOS | string){
    console.log(this.numOs)
    if(typeof(value) == 'string'){
      this.alert = {
        visible: true,
        warnTitle: 'Formulário Inválido',
        warnMessage: value,
        type: 'error'
      }
    }
    else {
      this.httpService.Update<IOS>("OS", value, this.numOs).subscribe(() => {
        this.alert = {
          visible: true,
          warnTitle: 'Sucesso !',
          warnMessage: 'OS Editada com Sucesso',
          type: 'success'
        }
      }, (e) => {
  
        this.alert = {
          visible: true,
          warnTitle: 'Erro ao Editar OS',
          warnMessage: e.error.detail,
          type: 'error'
        }
      })
    }
  }
 //Fechando o Alert
  closeAlert(){
    this.alert.visible = false; 
    if(this.alert.type == 'success'){
      this.router.navigate(['/home'])
    }
  }
  

}
