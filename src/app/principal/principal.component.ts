import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

  // Objeto do tipo employee
  employee = new Employee();

  // Variavel para visibilidade dos botões
  btnCadastro:boolean = true;

  // Variavel para visibilidade da tabela
  tabela:boolean = true;

  //JSON de employees
  employees:Employee[] = [];

  // Constructor
  constructor(private servico:EmployeeService){}

  // Metodo de seleção
  selecionar():void{
    this.servico.selecionar()
    .subscribe(retorno => this.employees = retorno);
  }

  // Metodo de cadastro
  cadastrar():void{
    this.servico.cadastrar(this.employee)
    .subscribe(retorno => {
      
      // Cadastrar o employee no vetor
      this.employees.push(retorno); });

      // Limpar formulario
      this.employee = new Employee();

      // Mensagem
      alert('Cliente cadastrado com sucesso!')

  }

  // Metodo para selecionar um employee especifico
  selecionarEmployee(posicao:number):void{

    // Selecionar employee no vetor
    this.employee = this.employees[posicao];

    // Visibilidade dos botões
    this.btnCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;

  }

  // Metodo para editar cliente
  editar():void{

    this.servico.editar(this.employee)
    .subscribe(retorno => {

      // Obter posicao do vetor onde esta o employee
      let posicao = this.employees.findIndex(obj => {
        return obj.id == retorno.id;
      }); 

      // Alterar os dados do employee no vetor
      this.employees[posicao] = retorno;

      // Limpar formulario
      this.employee = new Employee();

      // Visibilidade dos botões 
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Mensagem
      alert('Cliente alterado com sucesso')


    });

  }

  // Metodo para remover cliente
  remover():void{

    this.servico.remover(this.employee.id)
    .subscribe(retorno => {

      // Obter posicao do vetor onde esta o employee
      let posicao = this.employees.findIndex(obj => {
        return obj.id == this.employee.id;
      }); 

      // Remover employee do vetor
      this.employees.splice(posicao, 1);

      // Limpar formulario
      this.employee = new Employee();

      // Visibilidade dos botões 
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Mensagem
      alert('Cliente removido com sucesso');


    });
  }

  // Metodo para cancelar
  cancelar():void{

    // Limpar formulario
    this.employee = new Employee();

    // Visibilidade dos botões 
    this.btnCadastro = true;

    // Visibilidade da tabela
    this.tabela = true;
  }

  // Metodo de inicialização
  ngOnInit(){
    this.selecionar();
  }

}
