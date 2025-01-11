import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

export interface orderData {
  OrderNumber: string;
  Date: string;
  IncidentType: string;
  Destination: string;
  Location: string;
  OrderDispatcherId: string;
  Cost: number;
  ContractId: string;
  drivers: { name: string; distance: string }[];
}

const ORDER_DATA: orderData[] = [
  {
    OrderNumber:"101",
    Date:"2025-02-10",
    IncidentType:"vehiculo accidentado",
    Destination:"40.7128,-74.0060",
    Location:"39.7128,-71.0060",
    OrderDispatcherId:"3867d5e5-c0eb-4008-9820-9236cd18caa6",
    Cost:4763.4,
    ContractId:"f57f0a79-b23b-496b-bcae-f9ef13529232",
    drivers: [
      { name: 'Juan Pérez', distance: '5km' },
      { name: 'María López', distance: '3km' },
      { name: 'Carlos Gómez', distance: '7km' },
    ],
  },
  {
    OrderNumber:"102",
    Date:"2025-02-10",
    IncidentType:"vehiculo accidentado",
    Destination:"40.7128,-74.0060",
    Location:"39.7128,-71.0060",
    OrderDispatcherId:"3867d5e5-c0eb-4008-9820-9236cd18caa6",
    Cost:100,
    ContractId:"f57f0a79-b23b-496b-bcae-f9ef13529232",
    drivers: [
      { name: 'Ana Torres', distance: '2km' },
      { name: 'Luis Fernández', distance: '4km' },
    ],
  },
  {
    OrderNumber:"103",
    Date:"2025-02-10",
    IncidentType:"vehiculo accidentado",
    Destination:"40.7128,-74.0060",
    Location:"39.7128,-71.0060",
    OrderDispatcherId:"3867d5e5-c0eb-4008-9820-9236cd18caa6",
    Cost:200,
    ContractId:"f57f0a79-b23b-496b-bcae-f9ef13529232",
    drivers: [
      { name: 'Pedro García', distance: '6km' },
    ],
  },
];

@Component({
    selector: 'app-recent-orders',
    standalone: true,
    imports: [
      NgApexchartsModule, 
      MaterialModule, 
      GoogleMapsModule, 
      FormsModule,
      MatDialogModule,
      CommonModule
    ],
    templateUrl: './recent-orders.component.html',
})
export class AppRecentOrdersComponent implements OnInit {
    @ViewChild('originInput') originInput!: ElementRef<HTMLInputElement>;
    @ViewChild('destinationInput') destinationInput!: ElementRef<HTMLInputElement>;
  
    displayedColumns: string[] = ['orderNumber', 'date', 'incidentType', 'cost', 'assignee'];
    dataSource = ORDER_DATA;

    map!: google.maps.Map;
    distancia!: string;
    origin: string = '';
    destination: string = '';
  
    originMarker!: google.maps.Marker;
    destinationMarker!: google.maps.Marker;
  
    directionsRenderer!: google.maps.DirectionsRenderer;
  
    options: google.maps.MapOptions = {
      mapId: 'DEMO_MAP_ID',
      center: { lat: 10.4806, lng: -66.9036 },
      zoom: 12,
    };
  
    ngOnInit() {
    }

    constructor(private dialog: MatDialog) {}
  
    ngAfterViewInit() {
      this.initAutocomplete();
    }
  
    onMapReady(map: google.maps.Map) {
      this.map = map;
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
  
      this.initAutocomplete();
    }
  
    private initAutocomplete() {
      const originAutocomplete = new google.maps.places.Autocomplete(
        this.originInput.nativeElement,
        {
          componentRestrictions: { country: 've' }, 
          fields: ['formatted_address', 'geometry', 'name'],
        }
      );
      originAutocomplete.addListener('place_changed', () => {
        const place = originAutocomplete.getPlace();
        if (place && place.formatted_address) {
          this.origin = place.formatted_address;
        }
      });
  
      const destinationAutocomplete = new google.maps.places.Autocomplete(
        this.destinationInput.nativeElement,
        {
          componentRestrictions: { country: 've' }, 
          fields: ['formatted_address', 'geometry', 'name'],
        }
      );
      destinationAutocomplete.addListener('place_changed', () => {
        const place = destinationAutocomplete.getPlace();
        if (place && place.formatted_address) {
          this.destination = place.formatted_address;
        }
      });
    }
  
    mapRoute() {
      const directionService = new google.maps.DirectionsService();
      
      this.directionsRenderer.setDirections({ routes: [] } as unknown as google.maps.DirectionsResult);
  
      directionService.route(
        {
          origin: this.origin,
          destination: this.destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (
            status === google.maps.DirectionsStatus.OK && 
            result && 
            result.routes.length > 0 && 
            result.routes[0].legs.length > 0 && 
            result.routes[0].legs[0].distance
          ) {
            this.directionsRenderer.setDirections(result);
  
            const leg = result.routes[0].legs[0];
            this.distancia = leg.distance?.text || '';
  
          } else {
            console.error('Error al calcular la ruta:', status);
          }
        }
      );
    }
}
