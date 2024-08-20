import { Component, OnInit } from '@angular/core';
import { IFormGroup } from '../interfaces/IFormGroup';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../services/http/http.service';
import { IOS } from '../interfaces/OS';
import { FormOsComponent } from "../shared/form-os/form-os.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { IAlert } from '../interfaces/IAlert';

@Component({
  selector: 'app-criar-os',
  imports: [ReactiveFormsModule, FormOsComponent, AlertComponent],
  standalone: true,
  templateUrl: './criar-os.component.html',
  styleUrl: './criar-os.component.css'
})
export class CriarOsComponent implements OnInit{


  constructor(private activatedRoute : ActivatedRoute, private router : Router, private httpService : HttpService){

  }

  formData! : IFormGroup[]

  alert : IAlert = {
    visible: false,
    warnTitle : 'Erro',
    warnMessage : 'adsdad',
    type: 'error'
  }

  //Recebendo os dados do Formulário OS
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({formData}) => {
      this.formData = formData
    })
  }

 //Criando uma nova OS
  criarOS(value : IOS | string){
    if(typeof(value) == 'string'){
      this.alert = {
        visible: true,
        warnTitle: 'Formulário Inválido',
        warnMessage: value,
        type: 'error'
      }
    }
    else {
      this.httpService.Post<IOS>('OS', value).subscribe(() => {
        this.alert = {
          visible: true,
          warnTitle: 'Sucesso !',
          warnMessage: 'OS Criada com Sucesso',
          type: 'success'
        }
  
      }, (e) => {
        this.alert = {
          visible: true,
          warnTitle: 'Erro ao Criar OS',
          warnMessage: e.error.detail,
          type: 'error'
        }
        console.log(e)
      })
    }
  }

  //Fechar o Alert
  closeAlert(){
    this.alert.visible = false; 

    if(this.alert.type == 'success'){
      this.router.navigate(['/home'])
    }
  }
  

}
