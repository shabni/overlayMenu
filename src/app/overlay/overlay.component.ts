import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { OverlayMenuService } from '../overlay-menu.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  searchKeyDown$: Observable<any> = fromEvent(document, 'keydown');
  subscription: Subscription;
  @ViewChild('item') item: ElementRef;

  itemNumber = -1;

  constructor(private overlayMenu: OverlayMenuService) { }
  


  searchedItems: any[] = [];

  ngOnInit(): void {

    console.log("-------------->>>")
    this.searchedItems = ['a','b','c','d','e','f','g','h']
    this.subscribeEvents();

  }


  subscribeEvents()
    {
        this.subscription = this.searchKeyDown$.subscribe((ev) =>
        {
            this.mouseDownEvents(ev);
        });
    }


    mouseDownEvents(ev)
    {
        if (ev.code == 'ArrowDown' && this.searchedItems.length > 0)
        {

            if (this.itemNumber >= this.item.nativeElement.children.length - 1) return;
            if (this.itemNumber > -1) this.selectRow(ev.code, true);
            else this.selectRow(ev.code, false);
        }

        else if (ev.code == 'ArrowUp')
        {
            if (this.itemNumber < 1) return;
            if (this.itemNumber < this.item.nativeElement.children.length) this.selectRow(ev.code, true);
            else this.selectRow(ev.code, false);
        }

        else if (ev.code == 'Enter')
        {
            // this.onClose(this.searchedItems[this.itemNumber]);
            this.onCloseMenuPanel(this.searchedItems[this.itemNumber])
        }
        else if (ev.code === 'Escape')
        {
            this.onClose();
        }
    }

    selectRow(arrowDirection = 'ArrowDown', makeTransparent = true)
    {
        if (makeTransparent) {this.item.nativeElement.children[this.itemNumber].style.backgroundColor = 'transparent';}

        if (arrowDirection == 'ArrowUp') {this.itemNumber = this.itemNumber - 1;}
        else if (arrowDirection == 'ArrowDown') {this.itemNumber = this.itemNumber + 1;}

        this.item.nativeElement.children[this.itemNumber].style.backgroundColor = '#474747';
    }

    onRowClick(index)
    {

        if (this.itemNumber > -1) this.item.nativeElement.children[this.itemNumber].style.backgroundColor = 'transparent';
        this.itemNumber = index;
        this.item.nativeElement.children[this.itemNumber].style.backgroundColor = '#474747';
        this.onCloseMenuPanel(this.searchedItems[index])
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCloseMenuPanel(data){

    this.overlayMenu.onClosePanel(data);
    this.onClose();
  }


  onClose(data = null)
  {
      this.subscription.unsubscribe();
      // this.dialogRef.close(data);
  }

}
