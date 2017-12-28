import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogEditComponent } from '../dialogs/edit/dialog-edit.component';
import { RequestService } from '../services/request-service';
import { DialogSendComponent } from '../dialogs/send/dialog-send.component';

export interface Element {
  id: number;
  vehicle: string;
  kilometrage: number;
  service: string;
  startTime: string;
  endTime: string;
  sparePartPrice: number;
  servicePrice: number;
  fee: number;
  discount: number;
  totalPrice: number;
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
  public displayedColumns = ['id', 'vehicle', 'kilometrage', 'service', 'actions'];
  public dataSource: MatTableDataSource<Element>;

  constructor(public dialog: MatDialog, private service: RequestService) {

  }

  public edit(order) {
    let dialogEdit = this.dialog.open(DialogEditComponent, {
      width: '800px',
      data: order
    });
    dialogEdit.afterClosed().subscribe((result) => {
      if (result) {
        this.updateItemsList();
      }
    })
  }

  public send(order) {
    let dialogSend = this.dialog.open(DialogSendComponent, {
      width: '800px',
      data: order
    });
    dialogSend.afterClosed().subscribe((result) => {
      if (result) {
        this.updateItemsList();
      }
    })
  }

  public updateItemsList() {
    this.service.getAllItems().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource<Element>(result);
      })
  }

  public ngOnInit() {
    this.updateItemsList();
  }
}
