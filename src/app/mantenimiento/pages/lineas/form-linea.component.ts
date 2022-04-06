import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
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

  focusNextElement() {
    //add all elements we want to include in our selection
    var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && (document.activeElement as any).form) {
      var focussable = Array.prototype.filter.call((document.activeElement as any).form.querySelectorAll(focussableElements),
        function (element) {
          //check for visibility while always include the current activeElement
          return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
        });
      var index = focussable.indexOf(document.activeElement);
      if (index > -1) {
        var nextElement = focussable[index + 1] || focussable[0];
        nextElement.focus();
      }
    }
  }//fin-focusNextElement()

  next(evt: any) {
    evt.preventDefault()
    this.focusNextElement()
  }

  onHide() {
    this.showChange.emit(this.show)
  }
}
