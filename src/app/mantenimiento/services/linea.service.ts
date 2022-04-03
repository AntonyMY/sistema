import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { SharedService } from 'src/app/shared/services/shared.service';
import { ILinea } from '../interfaces/linea.interface';
import { IRptaFetch } from 'src/app/shared/interfaces/opciones.interface';
import { Miscela } from 'src/app/shared/utility/Miscela';

@Injectable()
export class LineaService {
  private _lineas:ILinea[]=[]

  private apiUrl:string=''

  get lineas():ILinea[]{
    return this._lineas
    //return [...,this._lineas]
  }

  constructor(private http:HttpClient, sharedService:SharedService) {
    this.apiUrl = sharedService.apiUrl.value
  }

  loadLineas():Observable<ILinea[]>{
    const url = `${this.apiUrl}/lineas`

    return this.http.get<ILinea[]>(url)
      .pipe(
        tap(items => this._lineas = items)
      )
  }//fin-loadLineas()


  addLinea(linea:ILinea):Observable<ILinea>{
    const url = `${this.apiUrl}/lineas`        
    return this.http.post<ILinea>(url,linea).pipe(
      tap(rpta => console.log(rpta))
    )
  }//fin-addLinea()

  /*
   

  listaLineas():Observable<ILinea[]>{
    const url = `${this.apiUrl}/lineas`

    return this.http.get<ILinea[]>(url)
  }   */

}
