import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayMenuService {

  public signal =new Subject<any>()

  constructor() { }

  public onClosePanel(data) {
    this.signal.next(data)
  }
}
