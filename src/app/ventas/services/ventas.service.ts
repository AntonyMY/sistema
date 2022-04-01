import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { IVenta } from '../interfaces/venta.interface';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable()
export class VentasService {

  private apiUrl:string = ''
  
  constructor(private http:HttpClient, sharedService:SharedService) {
      this.apiUrl = sharedService.apiUrl.value
  }

  /* get params():HttpParams{
    console.log('***')
    return new HttpParams()
      .set('fechaIni', '').set('fechaFin', '')
  } */
  private params = new HttpParams()


  listaVentas(fechaIni:Date, fechaFin:Date):Observable<IVenta[]>{    
    const url = `${this.apiUrl}/ventas`
    
    const params = this.params.set('fechaIni', fechaIni.toISOString().substring(0,10)).set('fechaFin', fechaFin.toISOString().substring(0,10))
    return this.http.get<IVenta[]>(url, {params})
  }
}
