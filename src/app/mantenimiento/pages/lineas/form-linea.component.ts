import { Component,  EventEmitter,  Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-linea',
  templateUrl: './form-linea.component.html',
  styles: [`
    :host ::ng-deep .p-dialog .p-dialog-header {
      background-color:;
    }
  `]
})
export class FormLineaComponent implements OnInit {
  @Input() show:boolean = false
  @Output() showChange = new EventEmitter<boolean>()

  titulo:string='Nueva Línea'
  
  
  constructor() { }

  ngOnInit(): void {
  }

  onHide(){
    console.log('--hide --', this.show)
    this.showChange.emit(this.show)    
  }
}
