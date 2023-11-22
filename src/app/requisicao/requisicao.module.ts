import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';


import { SharedModule } from '../shared/shared.module';
import { RequisicaoPesquisaComponent } from './requisicao-pesquisa/requisicao-pesquisa.component';
import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,

    SharedModule,
    RequisicaoRoutingModule
  ],
  declarations: [
    RequisicaoPesquisaComponent
  ],
  exports: []
})
export class RequisicaoModule { }