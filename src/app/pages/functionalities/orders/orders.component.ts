import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TablerIconsModule } from 'angular-tabler-icons';

interface Conductor {
  value: number;
  viewValue: string;
}
interface Contract {
  value: number;
}
interface Status {
  value: string;
  viewValue: string;
}
interface IncidentType {
  value: string;
  viewValue: string;
}

interface Operator {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    GoogleMapsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    TablerIconsModule,
  ],
  templateUrl: './orders.component.html',
})
export class AppOrdersComponent implements OnInit {
  @ViewChild('originInput') originInput!: ElementRef<HTMLInputElement>;
  @ViewChild('destinationInput') destinationInput!: ElementRef<HTMLInputElement>;

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

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  // Google Maps
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

          this.addMarkers(leg.start_location, leg.end_location);
        } else {
          console.error('Error al calcular la ruta:', status);
        }
      }
    );
  }

  private addMarkers(originLatLng: google.maps.LatLng, destinationLatLng: google.maps.LatLng) {
    if (this.originMarker) {
      this.originMarker.setMap(null);
    }
    if (this.destinationMarker) {
      this.destinationMarker.setMap(null);
    }

    this.originMarker = new google.maps.Marker({
      position: originLatLng,
      map: this.map,
      title: 'Origen'
    });

    this.destinationMarker = new google.maps.Marker({
      position: destinationLatLng,
      map: this.map,
      title: 'Destino'
    });
  }
  // End Google Maps

  // Conductor
  conductor: Conductor[] = [
    { value: 1, viewValue: 'Alfonso Perez' },
    { value: 2, viewValue: 'Carlos Rodriguez' },
    { value: 3, viewValue: 'Jorge Perez' },
    { value: 4, viewValue: 'Maria Rodriguez' },
    { value: 5, viewValue: 'Pedro Perez' },
    { value: 6, viewValue: 'Rosa Rodriguez' },
    { value: 7, viewValue: 'Sofia Perez' },
    { value: 8, viewValue: 'Tomas Rodriguez' },
    { value: 9, viewValue: 'Vicente Perez' },
  ];
  selectedConductor = this.conductor[0].value;
  // End Conductor

  // Contract
  contract: Contract[] = [
    { value: 5678 },
    { value: 9012 },
    { value: 3456 },
    { value: 7890 },
    { value: 1234 },
    { value: 5678 },
    { value: 9012 },
    { value: 3456 },
    { value: 7890 },
  ];
  selectedContract = this.contract[0].value;
  // End Contract

  // Status
  status: Status[] = [
    { value: 'for_assign', viewValue: 'Por Asignar' },
    { value: 'asigned', viewValue: 'Asignada' },
    { value: 'located', viewValue: 'Localizada' },
    { value: 'in_process', viewValue: 'En Proceso' },
    { value: 'canceled', viewValue: 'Cancelado' },
    { value: 'pending', viewValue: 'Pendiente' },
    { value: 'finished', viewValue: 'Finalizada' },
    { value: 'for_accept', viewValue: 'Por Aceptar' },
  ];

  selectedStatus = this.status[0].value;
  // End Status

  // Incident Type
  incidentType: IncidentType[] = [
    { value: 'accident', viewValue: 'Acccidente' },
    { value: 'mechanical-failure', viewValue: 'Falla Mecanica' },
    { value: 'overturning', viewValue: 'Volcamiento' },
    { value: 'electrical-failure', viewValue: 'Falla Electrica' },
    { value: 'lack-of-fuel', viewValue: 'Falta de Combustible' },
    { value: 'tire-failure', viewValue: 'Falla de Neumaticos' }
  ];

  selectedIncidentType = this.incidentType[0].value;
  // End Incident Type

  // Operator
  operator: Operator[] = [
    { value: 1, viewValue: 'Daniel Mendez' },
    { value: 2, viewValue: 'Jose Perez' },
    { value: 3, viewValue: 'Luis Rodriguez' },
    { value: 4, viewValue: 'Maria Perez' },
    { value: 5, viewValue: 'Pedro Rodriguez' },
    { value: 6, viewValue: 'Rosa Perez' },
    { value: 7, viewValue: 'Sofia Rodriguez' },
    { value: 8, viewValue: 'Tomas Perez' },
    { value: 9, viewValue: 'Vicente Fernandez' }
  ];

  selectedOperator = this.operator[0].value;
  // End Operator

}
