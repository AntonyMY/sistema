import { Component, OnInit, ViewChild } from '@angular/core';
import Decimal from 'decimal.js';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { IHeader, ITipo, IVenta } from '../../interfaces/venta.interface';
import { VentasService } from '../../services/ventas.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-venta-lista',
  templateUrl: './venta-lista.component.html',
  styleUrls: ['./venta-lista.component.css']
})
export class VentaListaComponent implements OnInit {
  @ViewChild('dt1') tabla!:Table

  ventas: IVenta[] = []
  ventaSel!:IVenta

  fechaIni: Date = new Date()
  fechaFin: Date = new Date()

  isLoading: boolean = false
  error: boolean = false

  inicialRows = 15
  txBus = ''
  debouncer: Subject<string> = new Subject()
  

  headers:IHeader[]=[
    {
      header:'Todos',
      field:'*',
      tipo:ITipo.string,
    },
    {
      header:'Tipo Documento',
      field:'tipodoc',
      tipo:ITipo.string,
    },
    {
      header:'Serie/Número',
      field:'serdoc',
      tipo:ITipo.string,
    },
    {
      header:'Fecha Emisión',
      field:'serdoc',
      tipo:ITipo.string,
    }
  ]

  getSerDoc(vta: IVenta): string {
    return vta.nser + ' - ' + vta['ndoc'];
  }

  constructor(private ventasService: VentasService) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe(valor => {
          console.log('**',valor);          
          this.tabla.filterGlobal(valor, 'contains')}
      )
  }

  customSort(event: SortEvent) {
    event?.data?.sort((data1:any, data2:any) => {      
      const campo:string = event.field ?? ''
      let value1 = data1[campo];
      let value2 = data2[campo];      

      if(campo==='serdoc'){
        value1 = this.getSerDoc(data1)
        value2 = this.getSerDoc(data2)        
      }
      
      let result = null;

      const camposStrNum=['total', 'exo','subtotal', 'igv']      

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (camposStrNum.includes(campo)){
        const dec1 = new Decimal(value1)
        const dec2 = new Decimal(value2)
        //console.log(dec1.toString(), dec2.toString(), dec1.cmp(dec2))
        result = dec1.comparedTo(dec2)
      }else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);      
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;        
       
      return ((event.order===undefined?1:event.order) * result);
    });
  }

  buscar() {
    if (!this.fechaIni || !this.fechaFin){
      alert('ingrese fechas validas!')
      return
    }
    this.error = false
    this.isLoading = true
    this.ventasService.listaVentas(this.fechaIni, this.fechaFin)
      .subscribe({next:vtas => {
          this.ventas = vtas
          this.isLoading = false          
        },
        error:err=>{
          this.error = true
          this.isLoading = false          
          //console.info(error.status)
        }
      })
  }//fin-buscar()

  clear(table: Table) {
    table.clear();    
    this.txBus = ''
  }

  filtro(){    
    this.debouncer.next(this.txBus)    
  }
}
