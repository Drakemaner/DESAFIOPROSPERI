import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormOsComponent } from '../shared/form-os/form-os.component';
import { IFormGroup } from '../interfaces/IFormGroup';
import { HttpService } from '../services/http/http.service';
import { IOS } from '../interfaces/OS';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, ɵNgNoValidate } from '@angular/forms';

@Component({
  selector: 'app-edit-os',
  templateUrl: './edit-os.component.html',
  styleUrl: './edit-os.component.css',
  standalone: true,
  imports: [FormOsComponent]
})
export class EditOsComponent implements OnInit , OnDestroy{

  constructor(private httpService : HttpService, private router : Router, private activatedRoute : ActivatedRoute){

  }
  ngOnDestroy(): void {
    this.formData.forEach(a => a.value = undefined)
  }

  numOs : number = -1
  formData! : IFormGroup[]

  ngOnInit(): void {
    const numOs = this.activatedRoute.snapshot.paramMap.get('numOs')
    this.activatedRoute.data.subscribe(({formData}) => {
      this.formData = formData
    })

    this.httpService.GetOne<IOS>('OS', parseInt(numOs!)).subscribe((a : IOS) => {
      this.numOs = a.numeroOS

      this.intializeDataForm(a)

    }, () => {
      alert('Erro ao receber informações da OS')
    })
  }

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

  editarOS(os : IOS){
    this.httpService.Update<IOS>("OS", os, this.numOs).subscribe(() => {
      alert("OS Editada com Sucesso")
      this.router.navigate(['/home'])
    }, (e) => {
      alert("Erro ao Editar OS: " + e.error.detail)

      this.router.navigate(['/home'])
    })
  }

}
