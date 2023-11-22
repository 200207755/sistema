import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato> = []
  exbindoFormularioContato = false;
  contato?: Contato;
  contatoIndex?: number;

  constructor() { }

  ngOnInit(): void {
  }

  prepararNovoContato() {
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
    this.exbindoFormularioContato = true;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.duplicarContato(contato);
    this.contatoIndex = index;
    this.exbindoFormularioContato = true;
  }

  confirmarContato(form: NgForm) {
    this.contatos[this.contatoIndex!] = this.duplicarContato(this.contato!);
    this.exbindoFormularioContato = false;
    form.reset();
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  duplicarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  get editando() {
    return this.contato && this.contato?.codigo;
  }

}