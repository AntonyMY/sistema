import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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


  addLinea(linea:ILinea):Observable<any>{
    const url = `${this.apiUrl}/lineas`

    return this.http.post<any>(url,linea).pipe(
      tap({next:rpta => this._lineas.push(linea),
        error:err => console.log('Error:')
      })
    )
  }//fin-addLinea()


  editLinea(linea:ILinea, idModi:number):Observable<any>{
    const url = `${this.apiUrl}/lineas/${idModi}`

    return this.http.put<any>(url,linea).pipe(
      tap({next:rpta => {
          this._lineas.push(linea)
          this._lineas = this._lineas.map(item => {
            if (item.codlinea !== linea.codlinea) return item
            return {...item, ...linea}
        })
        },
        error:err => console.log('Error:', err)
      })
    )
  }//fin-addLinea()

  /*


  listaLineas():Observable<ILinea[]>{
    const url = `${this.apiUrl}/lineas`

    return this.http.get<ILinea[]>(url)
  }   */

}
