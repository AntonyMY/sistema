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

  load():Observable<ILinea[]>{
    const url = `${this.apiUrl}/lineas`

    return this.http.get<ILinea[]>(url)
      .pipe(
        tap(items => this._lineas = items)
      )
  }//fin-loadLineas()


  add(linea:ILinea):Observable<any>{
    const url = `${this.apiUrl}/lineas`

    return this.http.post<any>(url,linea).pipe(
      tap({
        next:rpta => {
          linea.codlinea = rpta.id
          this._lineas = [...this._lineas, linea]
        },
        error:err => console.log('Error:')
      })
    )
  }//fin-addLinea()

  del(id:number):Observable<any>{
    const url = `${this.apiUrl}/lineas/${id}`

    return this.http.delete<any>(url).pipe(
      tap({
        next:rpta => {
          this._lineas = this._lineas.reduce((accum, item) => {
            if (item.codlinea !== id) {
                accum = [...accum, item]
            }
            return accum
          }, [] as ILinea[])
        },
        error:err => console.log('Error:')
      })
    )
  }//fin-addLinea()


  edit(linea:ILinea, idModi:number):Observable<any>{
    const url = `${this.apiUrl}/lineas/${idModi}`

    return this.http.put<any>(url,linea).pipe(
      tap({next:rpta => {          
          this._lineas = this._lineas.map(item => {
            if (item.codlinea !== linea.codlinea) return item
            return {...item, ...linea}
        })
        },
        error:err => console.log('Error:', err)
      })
    )
  }//fin-addLinea()

}
