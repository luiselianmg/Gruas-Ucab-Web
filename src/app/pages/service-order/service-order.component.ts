import { Component, ViewChild } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
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
export class ServiceOrderComponent {

  map!: google.maps.Map;
  distancia!: string;
  origin: string = '';
  destination: string = '';

  originMarker!: google.maps.Marker;
  destinationMarker!: google.maps.Marker;

  // Configuración general de Google Maps
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: 10.4806, lng: -66.9036 },
    zoom: 12,
  };

  onMapReady(map: google.maps.Map) {
    this.map = map;
  }

  mapRoute() {
    const directionService = new google.maps.DirectionsService();
    const directionRender = new google.maps.DirectionsRenderer();
    
    directionRender.setMap(this.map);

    directionService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (
        status === google.maps.DirectionsStatus.OK && 
        result && 
        result.routes.length > 0 && 
        result.routes[0].legs.length > 0 && 
        result.routes[0].legs[0].distance
      ) {
        const leg = result.routes[0].legs[0];
        this.distancia = leg.distance?.text || '';

        this.addMarkers(leg.start_location, leg.end_location);

      } else {
        console.error('Error al calcular la ruta:', status);
      }
    });
  }

  private addMarkers(
    originLatLng: google.maps.LatLng, 
    destinationLatLng: google.maps.LatLng
  ) {
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
