import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { IMarca } from '../../interfaces/marca.interface';
import { Subject, debounceTime } from 'rxjs';
import Decimal from 'decimal.js';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-listado-marcas',
  templateUrl: './listado-marcas.component.html',
  styleUrls: ['./listado-marcas.component.css']
})
export class ListadoMarcasComponent implements OnInit {

  @ViewChild('tabla') tabla!:Table

  title:string = 'Listado de Marcas'  
  isEdit:boolean = false
  
  tituloForm:string = ""
  reg: IMarca={
    codmarca : -1,
    nomb : ''
  }

  selMarca!:IMarca 

  showFilter = false
  isLoading: boolean = false
  error: boolean = false

  inicialRows = 15
  txBus = ''
  debouncer: Subject<string> = new Subject() 

  showForm:boolean = false

 

  get marcas(){    
    return this.marcaService.marcas
  }
  /* , private confirmationService : ConfirmationService, */
  constructor(private marcaService: MarcaService,private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.error = false
    this.isLoading = true    

    this.marcaService.load()
      .subscribe({next:marcas => {    
          this.isLoading = false   
          this.showFilter = false
          this.tabla.breakpoint="765"
        },
        error:err=>{
          this.error = true
          this.isLoading = false          
          //console.info(error.status)
        }
      })

    //Busquedas
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe(valor => {
          console.log('**',valor);          
          this.tabla.filterGlobal(valor, 'contains')}
      )      
  }//fin-ngOnInit()

  customSort(event: SortEvent) {
    event?.data?.sort((data1:any, data2:any) => {      
      const campo:string = event.field ?? ''
      let value1 = data1[campo];
      let value2 = data2[campo];            
      
      let result = null;
      
      //:int;align:left;visible:0
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
    this.error = false
    this.isLoading = true
    this.marcaService.load()
      .subscribe({next:marcas => {          
          this.isLoading = false   
          this.showFilter = false
        },
        error:err=>{
          this.error = true
          this.isLoading = false          
          //console.info(err.status)
        }
      })
  }//fin-buscar()

  limpia(){
    this.reg.codmarca = -1
    this.reg.nomb = ''
  }

  onEdit(marca:IMarca){
    this.reg = {...marca}
    this.isEdit = true
    this.tituloForm = 'Editar Marca'
    this.showForm=true
  }

  onDel(marcas:IMarca){
    this.confirmationService.confirm({
      message: `Desea eliminar marca «${marcas.nomb}»?`,
      header:'Eliminacion',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Si',
      accept: () => {
        this.marcaService.del(marcas.codmarca)
          .subscribe({
            next:rpta => this.messageService.add({severity:'info', summary:'Eliminado', detail:'Linea eliminada correctamente!'}),
            error:err => {
              this.messageService.add({severity:'error', summary:'No se pudo eliminar', detail: err.error.mensaje })
            }
          })
        
      }
    })
  }//fin-onDel()

  clear(table: Table) {
    console.log(this.selMarca)

    table.clear();    
    this.txBus = ''    
  }

  filtro(){    
    this.debouncer.next(this.txBus)    
  }

  onRowSelect(event:any){
    console.log('----',event.data.nomb, '====>',this.selMarca.nomb)
  }

  onAdd(){    
    this.limpia()
    this.isEdit = false
    this.tituloForm = 'Nueva Marca'
    this.showForm=true
  }

}
