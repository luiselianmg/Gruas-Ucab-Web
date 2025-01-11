import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CostsService } from '../../../services/cost.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-costs',
  standalone: true,
  imports: [
    TablerIconsModule,
    MaterialModule, 
    TablerIconsModule,
    CommonModule
  ],
  templateUrl: './costs.component.html',
})
export class AppCostsComponent implements OnInit {
  costs: any[] = [];

  constructor(private costsService: CostsService) { }

  ngOnInit(): void {
    this.costsService.getCosts().subscribe(data => {
      this.costs = data;
    });
  }
}
