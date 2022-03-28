import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { SharedService } from 'src/app/shared/services/shared.service';
import { ILinea } from '../interfaces/linea.interface';

@Injectable()
export class MantenimientoService {
  private apiUrl:string=''
  
  constructor(private http:HttpClient, sharedService:SharedService) {
    this.apiUrl = sharedService.apiUrl.value
   }

  listaLineas():Observable<ILinea[]>{
    const url = `${this.apiUrl}/lineas`
    
    return this.http.get<ILinea[]>(url)
  }
}
