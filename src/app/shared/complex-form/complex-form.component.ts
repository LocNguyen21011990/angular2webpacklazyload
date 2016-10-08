import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

interface IFormRow {
  type: string;
  unit: number;
  value: number;
}

@Component({
  selector: 'conplex-form',
  providers: [  ],
  styleUrls: ['./conplex-form.component.scss'],
  templateUrl: './conplex-form.component.jade',
})
export class ComplexForm {
  private form: FormArray
  private types = [
    'Type A',
    'Type B',
    'Type C',
  ];

  constructor() {}

  ngOnInit() {
    let controls = this.types.map(t => new FormGroup({
      type: new FormControl(t, Validators.required),
      unit: new FormControl('$', Validators.required),
      value: new FormControl(0, Validators.required),
    }));
    this.form = new FormArray(controls)
  }

  ngOnDestroy() {
  }
}
