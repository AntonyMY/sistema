import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Miscela } from 'src/app/shared/utility/Miscela';
import { IMarca } from '../../interfaces/marca.interface';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-form-marcas',
  templateUrl: './form-marcas.component.html',
})
export class FormMarcasComponent implements OnInit {
  @Input() titulo: string = ''
  @Input() reg!: IMarca
  @Input() isEdit: boolean = false
  @Input() show: boolean = false
  @Output() showChange = new EventEmitter<boolean>()

  idOld: number = -1

  constructor(private messageService: MessageService, private marcaServicio: MarcaService) { }

  ngOnInit(): void {
  }

  onShow() {
    if (this.isEdit)
      this.idOld = this.reg.codmarca
  }//fin-onShow()

  grabar() {
    this.reg.nomb = this.reg.nomb.toUpperCase()
    if (this.isEdit) {
      this.marcaServicio.edit(this.reg, this.idOld)
        .subscribe({
          next: rpta => {
            this.show = false            
            this.messageService.add({ severity: 'success', summary: 'Modificada con exito!', detail: `marca «${this.reg.nomb}» modificada!` })
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'No se pudo Modificar!', detail: err.error.mensaje })
          }
        })
    } else {
      this.marcaServicio.add({...this.reg})
        .subscribe({
          next: rpta => {
            this.show = false            
            this.messageService.add({ severity: 'success', summary: 'Grabar con exito!', detail: `marca «${this.reg.nomb}» creada!` })
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
