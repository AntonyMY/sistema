import { Component,  EventEmitter,  Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-linea',
  templateUrl: './form-linea.component.html',
  styles: [
  ]
})
export class FormLineaComponent implements OnInit {
  @Input() show:boolean = false
  @Output() showChange = new EventEmitter<boolean>()
  
  
  constructor() { }

  ngOnInit(): void {
  }

  onHide(){
    console.log('--hide --', this.show)
    this.showChange.emit(this.show)    
  }
}
