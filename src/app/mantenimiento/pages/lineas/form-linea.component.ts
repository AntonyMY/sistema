import { Component,  EventEmitter,  Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ILinea } from '../../interfaces/linea.interface';
import { LineaService } from '../../services/linea.service';

@Component({
  selector: 'app-form-linea',
  templateUrl: './form-linea.component.html',
  styleUrls:['./form-linea.component.css'],
})
export class FormLineaComponent implements OnInit {
  @Input() show:boolean = false
  @Output() showChange = new EventEmitter<boolean>()

  titulo:string='Nueva Línea'

  reg:ILinea ={
    codlinea:-1,
    nomb:''
  }

  constructor(private messageService:MessageService, private lineaService:LineaService) { }

  ngOnInit(): void {
  }

  grabar(){
    this.lineaService.addLinea(this.reg)
      .subscribe({next:rpta=> {
          this.messageService.add({severity:'success', summary:'Exito', detail:`linea «${this.reg.nomb}» creada!`})          
        },error:
          (err)=>console.log('error', err)       
    })
  }

  focusNextElement () {
    //add all elements we want to include in our selection
    var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && (document.activeElement as any).form) {
        var focussable = Array.prototype.filter.call((document.activeElement as any).form.querySelectorAll(focussableElements),
        function (element) {
            //check for visibility while always include the current activeElement
            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
        });
        var index = focussable.indexOf(document.activeElement);
        if(index > -1) {
           var nextElement = focussable[index + 1] || focussable[0];
           nextElement.focus();
        }
    }
  }//fin-focusNextElement()

  next(evt:any){
    evt.preventDefault()
    this.focusNextElement()
  }

  onHide(){
    console.log('--hide --', this.show)
    this.showChange.emit(this.show)
  }
}
