import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestService } from '../../services/request-service';
import { Helper } from '../../helpers/helper';

@Component({
  selector: 'dialog-send',
  templateUrl: 'dialog-send.component.html',
  styleUrls: ['dialog-send.component.scss']
})

export class DialogSendComponent {
  public chips = [0, 5, 10, 15, 20];
  public selected: number;
  public total: number;
  public agreement: boolean;
  public error: boolean;

  constructor(public dialogEdit: MatDialogRef<DialogSendComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: RequestService,
              public helper: Helper) {
    this.selected = data.discount;
  }

  public select(item) {
    this.selected = item;
  }
  public isSelected(item) {
    this.total = Math.ceil((this.data.servicePrice * (1 - this.selected / 100)) + this.data.fee + this.data.sparePartPrice);
    return this.selected === item;
  }

  public agree() {
    if (this.agreement) {
      this.error = false;
    }
  }

  public send() {
    if (this.agreement) {
      let newData = {
        discount: this.selected,
        totalPrice: this.total
      };
      this.service.updateItem(this.data.id, newData).subscribe(
        (result) => {
          this.dialogEdit.close(true);
        }
      )
    } else {
      this.error = true;
    }
  }

  public closeModal() {
    this.dialogEdit.close();
  }
}