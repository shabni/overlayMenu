import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayMenuService } from './overlay-menu.service';
import { OverlayComponent } from './overlay/overlay.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private overlay: Overlay, private overlayMenu: OverlayMenuService) {}

  overlayRef: OverlayRef | null;

  search = new FormControl('');


  ngOnInit(): void {

   this.overlayMenu.signal.subscribe(data=>{

    if (data) this.search.setValue(data)
    this.closeOverlay()
   })

   this.search.valueChanges.subscribe(val=>{

    if (val.length>2 ) {
      if (this.overlayRef) this.closeOverlay();
      this.displayOverlay();
    }
   })
  }

  displayOverlay() {

    const target = document.querySelector("#btn") as HTMLElement;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: "cdk-overlay-transparent-backdrop",
      panelClass: "mat-elevation-z8",
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(target)
        .withPositions([
          {
            originX: "start",
            originY: "bottom",
            overlayX: "start",
            overlayY: "top"
          }
        ])
    });
    const component = new ComponentPortal(OverlayComponent);
    const componentRef = this.overlayRef.attach(component);
    componentRef.instance.searchedItems = ['a','bc','def','ghij','klmnp','pqrstu','vwxyzz','hgdsag','fdgdfsi']
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach()
      this.search.setValue('') });
  }


  closeOverlay() {

    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.overlayRef = null;
  }
}
