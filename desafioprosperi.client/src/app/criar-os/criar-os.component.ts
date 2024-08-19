import { Component, OnInit } from '@angular/core';
import { IFormGroup } from '../interfaces/IFormGroup';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../services/http/http.service';
import { IOS } from '../interfaces/OS';
import { FormOsComponent } from "../shared/form-os/form-os.component";
import { FormData } from '../variables/formData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-os',
  imports: [ReactiveFormsModule, FormOsComponent],
  standalone: true,
  templateUrl: './criar-os.component.html',
  styleUrl: './criar-os.component.css'
})
export class CriarOsComponent {


  constructor(private router : Router, private httpService : HttpService){

  }

  formData : IFormGroup[] = FormData


  criarOS(os : IOS){
    this.httpService.Post<IOS>('OS', os).subscribe(() => {
      alert("OS Criada com Sucesso")

      this.router.navigate(['/home'])

    }, (e) => {
      alert("Erro ao Criar OS: " + e.error.detail)
      console.log(e)
    })
  }
  

}
