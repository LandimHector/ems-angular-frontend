import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //API URL
  private url:string = 'http://localhost:8080/api/employees';


  // Contructor
  constructor(private http:HttpClient) { }

  // Metodo para selecionar todos os employees
  selecionar():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.url);
  }

  // Metodo para cadastrar employees
  cadastrar(obj:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.url, obj);
  }

  // Metodo para editar employees
  editar(obj:Employee):Observable<Employee>{
    const urlCompleta = this.url + '/' + obj.id;
    return this.http.put<Employee>(urlCompleta, obj);
  }

  // Metodo para excluir employees
  remover(id:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + id);
  }

}
