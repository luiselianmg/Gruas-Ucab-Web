import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-order',
  standalone: true,
  imports: [
    GoogleMapsModule,
    FormsModule
  ],
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.css']
})
export class ServiceOrderComponent implements OnInit {
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
}
