import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Miscela } from 'src/app/shared/utility/Miscela';
import { ILinea } from '../../interfaces/linea.interface';
import { LineaService } from '../../services/linea.service';

@Component({
  selector: 'app-form-linea',
  templateUrl: './form-linea.component.html',
  styleUrls: ['./form-linea.component.css'],
})
export class FormLineaComponent implements OnInit {
  @Input() titulo: string = ''
  @Input() reg!: ILinea
  @Input() isEdit: boolean = false
  @Input() show: boolean = false
  @Output() showChange = new EventEmitter<boolean>()

  idOld: number = -1

  constructor(private messageService: MessageService, private lineaService: LineaService) { }

  ngOnInit(): void {
  }

  onShow() {
    if (this.isEdit)
      this.idOld = this.reg.codlinea
  }//fin-onShow()

  grabar() {
    this.reg.nomb = this.reg.nomb.toUpperCase()
    if (this.isEdit) {
      this.lineaService.edit(this.reg, this.idOld)
        .subscribe({
          next: rpta => {
            this.show = false            
            this.messageService.add({ severity: 'success', summary: 'Modificada con exito!', detail: `linea «${this.reg.nomb}» modificada!` })
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'No se pudo Modificar!', detail: err.error.mensaje })
          }
        })
    } else {
      this.lineaService.add({...this.reg})
        .subscribe({
          next: rpta => {
            this.show = false            
            this.messageService.add({ severity: 'success', summary: 'Grabar con exito!', detail: `linea «${this.reg.nomb}» creada!` })
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'No se pudo Grabar!', detail: err.error.mensaje })
          }
        })
    }
  }//fin-grabar()

  

  next(evt: any) {
    evt.preventDefault()
    
    Miscela.focusNextElement(document)
  }

  onHide() {
    this.showChange.emit(this.show)
  }
}
