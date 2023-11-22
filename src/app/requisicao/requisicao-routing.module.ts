import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { RequisicaoPesquisaComponent } from './requisicao-pesquisa/requisicao-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: RequisicaoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_REQUISICAO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RequisicaoRoutingModule { }