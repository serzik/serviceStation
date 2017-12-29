import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RequestService } from '../../services/request-service';
import { timeMask, dateMask, Helper } from '../../helpers/helper'

@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit.component.html',
  styleUrls: ['dialog-edit.component.scss']
})

export class DialogEditComponent implements OnInit {
  public form: FormGroup;
  public timeMask = timeMask;
  public dateMask = dateMask;
  public dateTime = {
    start: {seconds: null, error: false},
    end: {seconds: null, error: false},
    error: false
  };

  constructor(public dialogEdit: MatDialogRef<DialogEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private service: RequestService,
              private helper: Helper) {
    this.form = this.fb.group({
      vehicle: [data.vehicle, Validators.required],
      kilometrage: [data.kilometrage, Validators.required],
      service: [data.service, Validators.required],
      startTime: [this.helper.parseTime(this.data.startTime),
        [Validators.required, Validators.pattern(/^[0-9]{2}.[0-9]{2}$/), this.helper.validateTime]],
      startDate: [this.helper.parseDate(this.data.startTime),
        [Validators.required, Validators.pattern(/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/), this.helper.validateDate]],
      endTime: [this.helper.parseTime(this.data.endTime),
        [Validators.required, Validators.pattern(/^[0-9]{2}.[0-9]{2}$/), this.helper.validateTime]],
      endDate: [this.helper.parseDate(this.data.endTime),
        [Validators.required, Validators.pattern(/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/), this.helper.validateDate]],
    });
    this.form.valueChanges.subscribe(() => {
      this.checkDates();
    });
  }

  public checkDates() {
    let controls = this.form.controls;
    if (controls.startTime.errors === null && controls.startDate.errors === null) {
      this.dateTime.start = this.helper.validateDateTime(controls.startDate.value, controls.startTime.value);
      this.checkDatesRelation(controls);
    }
    if (controls.endTime.errors === null && controls.endDate.errors === null) {
      this.dateTime.end = this.helper.validateDateTime(controls.endDate.value, controls.endTime.value);
      this.checkDatesRelation(controls);
    }
  }

  public checkDatesRelation(controls) {
    if (controls.startTime.errors === null
      && controls.startDate.errors === null
      && controls.endTime.errors === null
      && controls.endDate.errors === null
      && !this.dateTime.start.error
      && !this.dateTime.end.error
      && (this.dateTime.start.seconds > this.dateTime.end.seconds)) {
      this.dateTime.error = true;
    } else {
      this.dateTime.error = false;
    }
  }

  public closeModal() {
    this.dialogEdit.close();
  }

  public update(updatedData) {
    let newData = {
      vehicle: updatedData.vehicle,
      kilometrage: updatedData.kilometrage,
      service: updatedData.service,
      startTime: this.dateTime.start.seconds,
      endTime: this.dateTime.end.seconds
    };
    this.service.updateItem(this.data.id, newData).subscribe(
      (result) => {
        this.dialogEdit.close(true);
      }
    )
  }

  public ngOnInit() {
    this.checkDates();
    document.getElementsByTagName('html')[0].setAttribute('style', 'overflow: hidden');
  }
}