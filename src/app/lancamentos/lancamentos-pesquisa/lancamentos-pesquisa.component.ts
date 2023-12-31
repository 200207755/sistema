import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();

  totalRegistros: number = 0

  lancamentos: any[] = [];
  @ViewChild('tabela') grid!: Table;

  constructor(
    private auth: AuthService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Listagem de Lançamentos')
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then((resultado: any) => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any): void {
    this.confirmationService.confirm({
      message: 'Confirmar exclusão?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.codigo)
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