import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { SharedService } from 'src/app/shared/services/shared.service';
import { IMarca } from '../interfaces/marca.interface';


@Injectable()
export class MarcaService {
  private _marcas:IMarca[]=[]

  private apiUrl:string=''

  get marcas():IMarca[]{
    return this._marcas
    //return [...,this._lineas]
  }

  constructor(private http:HttpClient, sharedService:SharedService) {
    this.apiUrl = sharedService.apiUrl.value
  }

  load():Observable<IMarca[]>{
    const url = `${this.apiUrl}/marcas`

    return this.http.get<IMarca[]>(url)
      .pipe(
        tap(items => this._marcas = items)
      )
  }//fin-loadLineas()


  add(marca:IMarca):Observable<any>{
    const url = `${this.apiUrl}/marcas`

    return this.http.post<any>(url,marca).pipe(
      tap({
        next:rpta => {
          marca.codmarca = rpta.id
          this._marcas = [...this._marcas, marca]
        },
        error:err => console.log('Error:')
      })
    )
  }//fin-addLinea()

  del(id:number):Observable<any>{
    const url = `${this.apiUrl}/marcas/${id}`

    return this.http.delete<any>(url).pipe(
      tap({
        next:rpta => {
          this._marcas = this._marcas.reduce((accum, item) => {
            if (item.codmarca !== id) {
                accum = [...accum, item]
            }
            return accum
          }, [] as IMarca[])
        },
        error:err => console.log('Error:')
      })
    )
  }//fin-addLinea()


  edit(marca:IMarca, idModi:number):Observable<any>{
    const url = `${this.apiUrl}/marcas/${idModi}`

    return this.http.put<any>(url,marca).pipe(
      tap({next:rpta => {          
          this._marcas = this._marcas.map(item => {
            if (item.codmarca !== marca.codmarca) return item
            return {...item, ...marca}
        })
        },
        error:err => console.log('Error:', err)
      })
    )
  }//fin-addLinea()

}
