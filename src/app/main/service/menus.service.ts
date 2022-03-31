import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../interfaces/menu.interface';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable()
export class MenusService {

  private apiUrl:string = ''

  constructor(private http:HttpClient, sharedService:SharedService) { 
    this.apiUrl = sharedService.apiUrl.value
  }

  listaMenus():Observable<IMenu[]>{    
    const url = `${this.apiUrl}/menus`   
    
    return this.http.get<IMenu[]>(url)
  }  
}
