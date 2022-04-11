import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public apiUrl:BehaviorSubject<string> = new BehaviorSubject('http://127.0.0.1:8000/api')
  // public apiUrl:BehaviorSubject<string> = 
  //   new BehaviorSubject('https://fast-mountain-03149.herokuapp.com/api')

  constructor() {}
  
}
