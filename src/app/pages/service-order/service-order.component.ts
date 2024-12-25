import { Component } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-service-order',
  standalone: true,
  imports: [
    GoogleMapsModule,
    FormsModule
  ],
  templateUrl: './service-order.component.html',
  styleUrl: './service-order.component.css'
})
export class ServiceOrderComponent {

  map!: google.maps.Map;
  distancia!: string;
  origin: string = '';
  destination: string = '';

  // Google maps general configuration
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: 10.4806, lng: -66.9036 },
    zoom: 12,
  };
  //


  // Distance Calculation
  mapRoute() {
    const directionService = new google.maps.DirectionsService();
    const directionRender = new google.maps.DirectionsRenderer();
    
    directionRender.setMap(this.map);

    directionService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result && result.routes.length > 0 && result.routes[0].legs.length > 0 && result.routes[0].legs[0].distance) {
        this.distancia = result.routes[0].legs[0].distance.text;
      } else {
        console.error('Error al calcular la ruta:', status);
      }
    });
  }

}


