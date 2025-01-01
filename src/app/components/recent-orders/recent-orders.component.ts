import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';


interface stats {
    id: number;
    time: string;
    color: string;
    title?: string;
    subtext?: string;
    link?: string;
}

@Component({
    selector: 'app-recent-orders',
    standalone: true,
    imports: [NgApexchartsModule, MaterialModule],
    templateUrl: './recent-orders.component.html',
})
export class AppRecentOrdersComponent {
    stats: stats[] = [
        {
            id: 1,
            time: '09.30 am',
            color: 'primary',
            subtext: 'Accidente',
        },
        {
            id: 2,
            time: '10.30 am',
            color: 'accent',
            title: 'Falla Mecánica',
        },
        {
            id: 3,
            time: '12.30 pm',
            color: 'success',
            subtext: 'Volcamiento',
        },
        {
            id: 4,
            time: '12.30 pm',
            color: 'warning',
            title: 'Falla Electrica',
        },
        {
            id: 5,
            time: '12.30 pm',
            color: 'error',
            title: 'Falta de Combustible',
        },
        {
            id: 6,
            time: '12.30 pm',
            color: 'success',
            subtext: 'Falla de Neumáticos',
        },
    ];
}
