import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GoogleMapsModule } from '@angular/google-maps';

import { ExtraCostData } from '../../../domain/extra-cost.domain';
import { orderData } from '../../../domain/order.domain';
import { contractAllData } from '../../../domain/contract.domain';
import { userData } from 'src/app/domain/user.domain';

import { ApiOrderService } from '../../../services/order.service';
import { ApiContractService } from '../../../services/contract.service';
import { ApiUserService } from '../../../services/user.service';

interface Status {
  value: string;
  viewValue: string;
}

// TODO: Agregar para agregar tipos de incidentes
interface IncidentType {
  value: string;
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
    MatDialogModule,
    CommonModule,
    MatListModule,
  ],
  templateUrl: './orders.component.html',
})
export class AppOrdersComponent implements OnInit {
  @ViewChild('originInput') originInput!: ElementRef<HTMLInputElement>;
  @ViewChild('destinationInput') destinationInput!: ElementRef<HTMLInputElement>;

  private _origin: string;
  private _destination: string;

  map!: google.maps.Map;
  distanciaAccidente!: string;
  origin: string = '';
  destination: string = '';

  operator: userData[] = [];
  operatorOptions: { value: string; viewValue: string }[] = [];
  selectedOperator: string | null = null;

  contract: contractAllData[] = [];
  contractOptions: { value: string; viewValue: number }[] = [];
  selectedContract: string | null = null;

  extraCostDetails: ExtraCostData[] = [];
  extraCosts: number = 0;

  originMarker!: google.maps.Marker;
  destinationMarker!: google.maps.Marker;

  directionsRenderer!: google.maps.DirectionsRenderer;

  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: 10.4806, lng: -66.9036 },
    zoom: 12,
  };

  constructor(
    public dialog: MatDialog,
    private apiOrderService: ApiOrderService,
    private apiContractService: ApiContractService,
    private apiUserService: ApiUserService,
    private snackBar: MatSnackBar 
    
  ) {}

  ngOnInit() {
    // Get Operators
    this.apiUserService.getUser().subscribe((data: userData[]) => {
      this.operator = data.filter(user => user.role === 'operator');
      this.operatorOptions = this.operator.map(operator => ({
        value: operator.id as string,
        viewValue: `${operator.name}`
      }));
      this.selectedOperator = this.operatorOptions.length > 0 ? this.operatorOptions[0].value : null;
    });

    // Get Contracts
    this.apiContractService.getContracts().subscribe((data: contractAllData[]) => {
      this.contract = data;
      this.contractOptions = data.map(contract => ({
        value: contract.id as string,
        viewValue: contract.numberContract
      }));
      this.selectedContract = this.contractOptions.length > 0 ? this.contractOptions[0].value : null;
    });
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

  // Route Calculation
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
          this.distanciaAccidente = leg.distance?.text || '';

          this.addMarkers(leg.start_location, leg.end_location);
        } else {
          console.error('Error al calcular la ruta:', status);
        }
      }
    );
  }
  // End Route Calculation

  // Markers at the map
  private addMarkers(originLatLng: google.maps.LatLng, destinationLatLng: google.maps.LatLng): { _origin: string, _destination: string } {
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
  
    console.log('Coordenadas de Origen:', originLatLng.toString());
    console.log('Coordenadas de Destino:', destinationLatLng.toString());
  
    return {
      _origin: originLatLng.toString(),
      _destination: destinationLatLng.toString()
    };
  }
  // End Maker at the map

  incidentType: IncidentType[] = [
    { value: 'accidente automovilistico', viewValue: 'Acccidente Automovilistico' },
    { value: 'incendio', viewValue: 'Incendio' },
    { value: 'volcamiento', viewValue: 'Volcamiento' },
    { value: 'vehiculo accidentado', viewValue: 'Vehiculo Accidentado' },
  ];
  selectedIncidentType = this.incidentType[0].value;

//  Create Order
createOrder(): void {
  if (!this.originMarker || !this.destinationMarker) {
    console.error('Markers are not set');
    return;
  }

  const originLatLng = this.originMarker.getPosition();
  const destinationLatLng = this.destinationMarker.getPosition();

  if (!originLatLng || !destinationLatLng) {
    console.error('Marker positions are not set');
    return;
  }

  const markers = this.addMarkers(originLatLng, destinationLatLng);
  const origensito = markers._origin.replace(/[()]/g, '').replace(/\s+/g, '');
  const destinito = markers._destination.replace(/[()]/g, '').replace(/\s+/g, '');

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; 

  // TODO: Arreglar la fecha
  const newOrder: orderData = {
    Date: "2025-03-15",
    IncidentType: this.selectedIncidentType,
    Destination: destinito,
    Location: origensito,
    OrderDispatcherId: this.selectedOperator || '',
    ContractId: this.selectedContract || '',
  };

  this.apiOrderService.createOrder(newOrder).subscribe(
    (response) => {
      console.log('Order created successfully', response);
      this.snackBar.open('Orden creada con éxito.', 'Cerrar', {
        duration: 3000,
      });
      window.location.reload();
    },
    (error) => {
      console.error('Error al crear orden:', error);
      if (error.error && error.error.errors) {
        console.error('Errores de validación:', error.error.errors);
        this.snackBar.open('Error de Validacion: ', error.error.error, {
          duration: 3000,
        });
      }
    }
  );
}
      
  onSubmit() {
    this.createOrder();
    this.mapRoute();
  }

}