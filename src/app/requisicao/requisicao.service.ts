import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Requisicao } from '../core/model';
import { environment } from '../../environments/environment';

export class RequisicaoFiltro {
  pagina: number = 0;
  itensPorPagina: number = 5;
  dataRequisicaoInicio?: Date;
  dataRequisicaoFim?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  requisicaoUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.requisicaoUrl = `${environment.apiUrl}/requisicao`
  }

  uploadHeaders() {
    return new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }

  pesquisar(filtro: RequisicaoFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

      if (filtro.dataRequisicaoInicio) {
        params = params.set('dataRequisicaoDe', this.datePipe.transform(filtro.dataRequisicaoInicio, 'yyyy-MM-dd')!);
      }
  
      if (filtro.dataRequisicaoFim) {
        params = params.set('dataRequisicaoAte', this.datePipe.transform(filtro.dataRequisicaoFim, 'yyyy-MM-dd')!);
      }

    return this.http.get(`${this.requisicaoUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const requisicoes = response['content'];

        const resultado = {
          requisicoes,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete<void>(`${this.requisicaoUrl}/${codigo}`)
      .toPromise();
  }

  adicionar(requisicao: Requisicao): Promise<Requisicao> {
    return this.http.post<Requisicao>(this.requisicaoUrl, requisicao).toPromise();
  }

  private converterStringsParaDatas(requisicoes: Requisicao[]) {
    for (const requisicao of requisicoes) {
      let offset = new Date().getTimezoneOffset() * 60000;
      if (requisicao.dataRequisicao) {
        requisicao.dataRequisicao = new Date(new Date(requisicao.dataRequisicao).getTime() + offset);
      }
      if (requisicao.dataProcessamento) {
        requisicao.dataProcessamento = new Date(new Date(requisicao.dataProcessamento).getTime() + offset);
      }
    }
  }
}