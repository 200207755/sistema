import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { RequisicaoFiltro, RequisicaoService } from '../requisicao.service';
import { Requisicao } from 'src/app/core/model';

@Component({
  selector: 'app-requisicao-pesquisa',
  templateUrl: './requisicao-pesquisa.component.html',
  styleUrls: ['./requisicao-pesquisa.component.css']
})
export class RequisicaoPesquisaComponent implements OnInit {

  filtro = new RequisicaoFiltro();

  totalRegistros: number = 0

  requisicoes: any[] = [];
  @ViewChild('tabela') grid!: Table;

  constructor(
    private auth: AuthService,
    private requisicaoService: RequisicaoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Listagem de Requisições')
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;

    this.requisicaoService.pesquisar(this.filtro)
      .then((resultado: any) => {
        this.requisicoes = resultado.requisicoes;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  incluir():void{
    this.requisicaoService.adicionar(new Requisicao())
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Requisição de dados realizada com sucesso!' })
      })
  }

  confirmarExclusao(requisicao: any): void {
    this.confirmationService.confirm({
      message: 'Confirmar exclusão?',
      accept: () => {
        this.excluir(requisicao);
      }
    });
  }

  excluir(requisicao: any) {

    this.requisicaoService.excluir(requisicao.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Registro excluído com sucesso!' })
      })
  }

  naoTemPermissao(permissao: string) {
    return !this.auth.temPermissao(permissao);
  }
}