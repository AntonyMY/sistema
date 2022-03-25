import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../interfaces/menu.interface';
import { Observable } from 'rxjs';

@Injectable()
export class MenusService {

  private apiUrl:string = 'http://127.0.0.1:8000/api'

  constructor(private http:HttpClient) { }

  listaMenus():Observable<IMenu[]>{    
    const url = `${this.apiUrl}/menus`   
    
    return this.http.get<IMenu[]>(url)
  }  
}
