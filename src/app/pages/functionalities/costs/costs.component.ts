import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CostsService } from '../../../services/cost.service';
import { CommonModule } from '@angular/common';
import { ExtraCostData } from 'src/app/domain/extra-cost.domain';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-costs',
  standalone: true,
  imports: [
    TablerIconsModule,
    MaterialModule,
    TablerIconsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './costs.component.html',
})
export class AppCostsComponent implements OnInit {
  form: FormGroup;
  costs: ExtraCostData[] = [];
  constructor(private costsService: CostsService) {
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      defaultPrice: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.costsService.getCosts().subscribe((data) => {
      this.costs = data;
    });
  }

  createCost() {
    if (this.form.valid) {
      this.costsService
        .createCost(this.form.value.description, this.form.value.defaultPrice)
        .subscribe((success) => {
          if (success) {
            this.costsService.getCosts().subscribe((data) => {
              this.costs = data;
            });
          }
        });
    }
  }
}
