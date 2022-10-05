import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { OverlayMenuService } from './overlay-menu.service';
import { OverlayComponent } from './overlay/overlay.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private overlay: Overlay, private overlayMenu: OverlayMenuService) {}

  overlayRef: any


  ngOnInit(): void {

   this.overlayMenu.signal.subscribe(data=>{
    console.log("---", data)

    this.closeOverlay()
   })

   

  }

  displayOverlay(event) {
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
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }


  closeOverlay() {
    this.overlayRef.detach()
  }
}
