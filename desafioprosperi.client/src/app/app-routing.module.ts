import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CriarOsComponent } from './criar-os/criar-os.component';
import { EditOsComponent } from './edit-os/edit-os.component';
import { FormResolver } from './resolver/formResolver';
import { ColDefsGridResolver } from './resolver/gridColResolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      colDefsGrid: ColDefsGridResolver
    }
  },
  {
    path: 'cadastrarOS',
    component: CriarOsComponent,
    resolve: {
      formData: FormResolver
    }
  },
  {
    path: 'editOS/:numOs',
    component: EditOsComponent,
    resolve: {
      formData: FormResolver    
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
